"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import AmplitudeLoader from "@/components/AmplitudeLoader";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_GATED_PATHS,
  readConsentCookie,
} from "@/lib/cookie-consent";

// Carga los scripts de Google Analytics y Amplitude.
// En rutas listadas en COOKIE_CONSENT_GATED_PATHS, la carga espera a que el
// usuario acepte el modal de cookies. En el resto del sitio el comportamiento
// no cambia: los scripts se cargan igual que antes.
export default function TrackingGate() {
  const pathname = usePathname();
  const gated = COOKIE_CONSENT_GATED_PATHS.includes(pathname);
  const [consent, setConsent] = useState(gated ? null : "accepted");

  useEffect(() => {
    if (!gated) return;

    setConsent(readConsentCookie());

    const handleConsentChange = (event) => setConsent(event.detail);
    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
  }, [gated, pathname]);

  if (gated && consent !== "accepted") return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-45G6DMGKCB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-45G6DMGKCB');
        `}
      </Script>
      <AmplitudeLoader />
    </>
  );
}
