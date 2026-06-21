const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const GA_DEBUG_ENDPOINT = 'https://www.google-analytics.com/debug/mp/collect';

// Get via https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
const MEASUREMENT_ID = process.env.CEB_MEASUREMENT_ID;
const API_SECRET = process.env.CEB_API_SECRET;
// Fallback engagement time for contexts without a document (e.g. the background
// service worker firing install/update). Page contexts send measured time instead.
const DEFAULT_ENGAGEMENT_TIME_MSEC = 100;
// Once a session accumulates this much foreground time, GA4 should treat it as an
// engaged session. gtag sets `session_engaged=1` at 10s; we mirror that for MP.
const SESSION_ENGAGED_THRESHOLD_MSEC = 10_000;

// Duration of inactivity after which a new session is created
const SESSION_EXPIRATION_IN_MIN = 30;

// type SessionData = { session_id: string; timestamp: string };

class AnalyticsCore {
  private debug: boolean;

  // Engagement tracking (page contexts only — popup / options).
  // GA4's engagement metrics (engaged sessions, engagement rate, engagement
  // duration) are driven by `engagement_time_msec`. The Measurement Protocol does
  // not measure this for us, so we accumulate real foreground time here instead of
  // sending a hardcoded placeholder (which left every session at 0s / not engaged).
  private engVisibleSince: number | null = null;
  private engAccumulatedMsec = 0; // total foreground time this page context
  private engUnsentMsec = 0; // foreground time not yet attached to an event
  private engTrackingStarted = false;

  constructor(debug = false) {
    this.debug = debug;
  }

  // Begin measuring foreground engagement time. Call once when a UI page mounts.
  // No-op in non-document contexts (background service worker) and idempotent.
  public startEngagementTracking() {
    if (this.engTrackingStarted || typeof document === 'undefined') {
      return;
    }
    this.engTrackingStarted = true;
    this.engVisibleSince = document.visibilityState === 'visible' ? Date.now() : null;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.engVisibleSince = Date.now();
      } else {
        this.captureVisibleTime();
        // The page is about to be torn down (popup closing). Flush remaining
        // engagement time so short open-then-close sessions still register.
        if (this.engUnsentMsec > 0) {
          void this.fireEvent('extension_engagement');
        }
      }
    });
  }

  // Fold the currently-visible interval into the accumulators and reset the clock.
  private captureVisibleTime() {
    if (this.engVisibleSince != null) {
      const now = Date.now();
      const delta = now - this.engVisibleSince;
      this.engAccumulatedMsec += delta;
      this.engUnsentMsec += delta;
      this.engVisibleSince = now;
    }
  }

  // Engagement params to attach to the next outgoing event.
  private consumeEngagementParams(): Record<string, unknown> {
    if (!this.engTrackingStarted) {
      return { engagement_time_msec: DEFAULT_ENGAGEMENT_TIME_MSEC };
    }
    this.captureVisibleTime();
    const params: Record<string, unknown> = {
      engagement_time_msec: Math.max(1, Math.round(this.engUnsentMsec)),
    };
    this.engUnsentMsec = 0;
    if (this.engAccumulatedMsec >= SESSION_ENGAGED_THRESHOLD_MSEC) {
      params.session_engaged = '1';
    }
    return params;
  }

  // Returns the client id, or creates a new one if one doesn't exist.
  // Stores client id in local storage to keep the same client id as long as
  // the extension is installed.
  async getOrCreateClientId() {
    let { clientId } = await chrome.storage.local.get('clientId');
    if (!clientId) {
      // Generate a unique client ID, the actual value is not relevant
      clientId = self.crypto.randomUUID();
      await chrome.storage.local.set({ clientId });
    }
    return clientId;
  }

  // Returns the current session id, or creates a new one if one doesn't exist or
  // the previous one has expired.
  async getOrCreateSessionId() {
    // Use storage.session because it is only in memory and cleared when the browser is closed
    let { sessionData } = await chrome.storage.session.get('sessionData');
    const currentTimeInMs = Date.now();
    // Check if session exists and is still valid
    if (sessionData && sessionData.timestamp) {
      // Calculate how long ago the session was last updated
      const durationInMin = (currentTimeInMs - sessionData.timestamp) / 60000;
      // Check if last update lays past the session expiration threshold
      if (durationInMin > SESSION_EXPIRATION_IN_MIN) {
        // Clear old session id to start a new session
        sessionData = null;
      } else {
        // Update timestamp to keep session alive
        sessionData.timestamp = currentTimeInMs;
        await chrome.storage.session.set({ sessionData });
      }
    }
    if (!sessionData) {
      // Create and store a new session
      sessionData = {
        session_id: currentTimeInMs.toString(),
        timestamp: currentTimeInMs,
      };
      await chrome.storage.session.set({ sessionData });
    }
    return sessionData.session_id;
  }

  // Fires an event with optional params. Event names must only include letters and underscores.
  public async fireEvent(name: string, params: Record<string, unknown> = {}) {
    // Configure session id and engagement time if not present, for more details see:
    // https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
    if (!params.session_id) {
      params.session_id = await this.getOrCreateSessionId();
    }
    if (!params.engagement_time_msec) {
      const eng = this.consumeEngagementParams();
      params.engagement_time_msec = eng.engagement_time_msec;
      if (eng.session_engaged && !params.session_engaged) {
        params.session_engaged = eng.session_engaged;
      }
    }

    try {
      const response = await fetch(
        `${this.debug ? GA_DEBUG_ENDPOINT : GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
        {
          method: 'POST',
          // keepalive lets the on-close engagement flush complete after the popup closes.
          keepalive: true,
          body: JSON.stringify({
            client_id: await this.getOrCreateClientId(),
            events: [
              {
                name,
                params,
              },
            ],
          }),
        },
      );
      if (!this.debug) {
        return;
      }
      console.log(await response.text());
    } catch (e) {
      console.error('Google Analytics request failed with an exception', e);
    }
  }

  // Fire a page view event.
  public async firePageViewEvent(pageTitle: string, pageLocation: string, additionalParams = {}) {
    return this.fireEvent('page_view', {
      page_title: pageTitle,
      page_location: pageLocation,
      ...additionalParams,
    });
  }

  // Fire an error event.
  public async fireErrorEvent(error: unknown, additionalParams = {}) {
    // Note: 'error' is a reserved event name and cannot be used
    // see https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#reserved_names
    return this.fireEvent('extension_error', {
      ...(typeof error === 'object' ? (error as object) : {}),
      ...additionalParams,
    });
  }
}

// build a factory function that’s also a singleton with static methods
type AnalyticsFactory = ((debug?: boolean) => AnalyticsCore) &
  Pick<AnalyticsCore, 'fireEvent' | 'firePageViewEvent' | 'fireErrorEvent' | 'startEngagementTracking'>;

const defaultInstance = new AnalyticsCore();
const Analytics = ((debug = false) => new AnalyticsCore(debug)) as AnalyticsFactory;

// assign static methods bound to the default instance
Analytics.fireEvent = defaultInstance.fireEvent.bind(defaultInstance);
Analytics.firePageViewEvent = defaultInstance.firePageViewEvent.bind(defaultInstance);
Analytics.fireErrorEvent = defaultInstance.fireErrorEvent.bind(defaultInstance);
Analytics.startEngagementTracking = defaultInstance.startEngagementTracking.bind(defaultInstance);

export { Analytics };
