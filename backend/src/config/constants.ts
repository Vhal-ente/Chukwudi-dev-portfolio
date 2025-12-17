// src/config/constants.ts
export const Constants = {
    APP_NAME: 'Portfolio Contact API',
    VERSION: '1.0.0',
    CONTACT: {
      MAX_MESSAGE_LENGTH: 5000,
      MAX_SUBJECT_LENGTH: 200,
      MAX_NAME_LENGTH: 100,
    },
    SECURITY: {
      PASSWORD_MIN_LENGTH: 8,
      SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
    },
    EMAIL: {
      TEMPLATES: {
        ADMIN_NOTIFICATION: 'admin_notification',
        USER_CONFIRMATION: 'user_confirmation',
      },
    },
  } as const;