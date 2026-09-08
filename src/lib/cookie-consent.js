export const COOKIE_CONSENT_NAME = "dictuc_cookie_consent";
export const COOKIE_CONSENT_MAX_AGE_DAYS = 90; // ~3 meses
export const COOKIE_CONSENT_EVENT = "dictuc-cookie-consent";

// Rutas donde el trackeo (GA / Amplitude) queda condicionado a la aceptación
// de este modal. Cualquier otra ruta conserva el comportamiento actual del sitio.
export const COOKIE_CONSENT_GATED_PATHS = ["/demo-cookies"];

export function readConsentCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_CONSENT_NAME}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function writeConsentCookie(value) {
  if (typeof document === "undefined") return;
  const maxAgeSeconds = COOKIE_CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}
