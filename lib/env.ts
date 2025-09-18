// Environment variables configuration
export const env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.doniyortest.uz',
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || '/api/v1',
  LOGIN_ENDPOINT: process.env.NEXT_PUBLIC_LOGIN_ENDPOINT || '/user/auth/Login/',
  REGISTER_ENDPOINT: process.env.NEXT_PUBLIC_REGISTER_ENDPOINT || '/user/auth/Register/',
  REFRESH_ENDPOINT: process.env.NEXT_PUBLIC_REFRESH_ENDPOINT || '/user/auth/refresh/',
  PROFILE_ENDPOINT: process.env.NEXT_PUBLIC_PROFILE_ENDPOINT || '/user/profile/',
  CONFIRM_PHONE_ENDPOINT: process.env.NEXT_PUBLIC_CONFIRM_PHONE_ENDPOINT || '/user/auth/ConfirmPhone/',
  CSRF_TOKEN: process.env.NEXT_PUBLIC_CSRF_TOKEN || 'gpL2EIRcpn0pb75ICBof30SI7P4ZmeP5jNWT1AB16MutJurk9eKzW4HEPgijGVh1',
  PAYMENT_LINK: process.env.NEXT_PUBLIC_PAYMENT_LINK || 'https://your-payment-link.com',
} as const;

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${env.API_BASE_URL}${env.API_VERSION}${endpoint}`;
};
