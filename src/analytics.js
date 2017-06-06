import Analytics from '@segment/analytics.js-core/lib/analytics';
import GA from '@segment/analytics.js-integration-google-analytics';
import Intercom from '@segment/analytics.js-integration-intercom';

const analytics = new Analytics();

analytics.use(GA);
analytics.use(Intercom);

analytics.initialize({
  'Google Analytics': {
    trackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
  },
  Intercom: {
    appId: process.env.REACT_APP_INTERCOM_APP_ID,
  }
});

analytics.page();

export default analytics;
