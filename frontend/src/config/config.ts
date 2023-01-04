export const ENV = `${'4000'|| "production"}`;
export const IS_PROD = ENV === "production";

export const HOST_URL =
  process.env.HOST_URL ??
  (IS_PROD
    ? `${process.env.REACT_APP_PRODUCTION_URL}`
    : `${process.env.REACT_APP_LOCAL_URL}` || "");
export const FACEBOOK_ID = `${process.env.REACT_APP_FACEBOOK_APP_ID}`;
export const SENTRY_ENV = `${process.env.REACT_APP_SENTRY_ENV || "production"}`;
export const SENTRY_DSN = `${process.env.REACT_APP_SENTRY_DSN}`;
export const SENTRY_LOG_LEVEL = SENTRY_ENV === "production" ? 1 : 2;
export const SENTRY_IS_RELEASED =
  SENTRY_ENV === "production" || SENTRY_ENV === "preview";

export const AGENTS_PER_PAGE = 10;
