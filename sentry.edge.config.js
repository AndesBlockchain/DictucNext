import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://1a40104facdf645df0f3fbb1e30c1677@o4504873002139648.ingest.us.sentry.io/4511327985205248",

  tracesSampleRate: 0.1,

  enableLogs: false,

  sendDefaultPii: false,
});
