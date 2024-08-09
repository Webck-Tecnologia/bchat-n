export default {
  computed: {
    hostURL() {
      return window.bchatConfig.hostURL;
    },
    vapidPublicKey() {
      return window.bchatConfig.vapidPublicKey;
    },
    enabledLanguages() {
      return window.bchatConfig.enabledLanguages;
    },
    isEnterprise() {
      return window.bchatConfig.isEnterprise === 'true';
    },
    enterprisePlanName() {
      // returns "community" or "enterprise"
      return window.bchatConfig?.enterprisePlanName;
    },
  },
};
