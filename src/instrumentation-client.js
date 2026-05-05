// This file configures the initialization of Sentry on the client.
// Optimizado para reducir el bundle size.

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://1a40104facdf645df0f3fbb1e30c1677@o4504873002139648.ingest.us.sentry.io/4511327985205248",

  // Sin Replay (ahorra ~200KB de bundle)
  integrations: [],

  // Reducir tracing al 10% en producción
  tracesSampleRate: 0.1,

  // Desactivar logs para reducir overhead
  enableLogs: false,

  // Solo capturar errores, sin PII
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
