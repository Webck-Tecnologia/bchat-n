import AnalyticsHelper from './AnalyticsHelper';
import DashboardAudioNotificationHelper from './AudioAlerts/DashboardAudioNotificationHelper';
import { emitter } from 'shared/helpers/mitt';

export const CHATWOOT_SET_USER = 'CHATWOOT_SET_USER';
export const CHATWOOT_RESET = 'CHATWOOT_RESET';

export const ANALYTICS_IDENTITY = 'ANALYTICS_IDENTITY';
export const ANALYTICS_RESET = 'ANALYTICS_RESET';

export const initializeAnalyticsEvents = () => {
  emitter.on(ANALYTICS_IDENTITY, ({ user }) => {
    AnalyticsHelper.identify(user);
  });
};

const initializeAudioAlerts = user => {
  const { ui_settings: uiSettings } = user || {};
  const {
    always_play_audio_alert: alwaysPlayAudioAlert,
    enable_audio_alerts: audioAlertType,
    alert_if_unread_assigned_conversation_exist: alertIfUnreadConversationExist,
    notification_tone: audioAlertTone,
    // UI Settings can be undefined initally as we don't send the
    // entire payload for the user during the signup process.
  } = uiSettings || {};

  DashboardAudioNotificationHelper.setInstanceValues({
    currentUserId: user.id,
    audioAlertType: audioAlertType || 'none',
    audioAlertTone: audioAlertTone || 'ding',
    alwaysPlayAudioAlert: alwaysPlayAudioAlert || false,
    alertIfUnreadConversationExist: alertIfUnreadConversationExist || false,
  });
};

export const initializeBchatEvents = () => {
  emitter.on(CHATWOOT_RESET, () => {
    if (window.$bchat) {
      window.$bchat.reset();
    }
  });
  emitter.on(CHATWOOT_SET_USER, ({ user }) => {
    if (window.$bchat) {
      window.$bchat.setUser(user.email, {
        avatar_url: user.avatar_url,
        email: user.email,
        identifier_hash: user.hmac_identifier,
        name: user.name,
      });
      window.$bchat.setCustomAttributes({
        signedUpAt: user.created_at,
        cloudCustomer: 'true',
        account_id: user.account_id,
      });
    }

    initializeAudioAlerts(user);
  });
};
