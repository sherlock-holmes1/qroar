import * as Sentry from '@sentry/browser';

const SENTRY_DSN = process.env.CEB_SENTRY_DSN;

export function initSentry() {
  if (!SENTRY_DSN) {
    // Sentry DSN not provided, skip initialization
    return;
  }
  Sentry.init({
    dsn: SENTRY_DSN,
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

export { Sentry };
