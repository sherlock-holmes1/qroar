import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with the project token from the environment variable
const MIXPANEL_TOKEN = process.env.CEB_MIXPANEL_TOKEN;

if (!MIXPANEL_TOKEN) {
  // Optionally, you can throw or log a warning if the token is missing
  console.warn('Mixpanel token (CEB_MIXPANEL_TOKEN) is not set. Mixpanel will not be initialized.');
} else {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env['CLI_CEB_DEV'] === 'true', // logs to console—remove in production
    ignore_dnt: true,
  });
}

export { mixpanel };
export default mixpanel;
