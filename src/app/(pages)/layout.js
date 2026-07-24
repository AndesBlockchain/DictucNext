import "./globals.css";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import AmplitudeLoader from "@/components/AmplitudeLoader";
import EditorModeProvider from "@/components/editor/EditorModeProvider";
import EditorPanel from "@/components/editor/EditorPanel";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Dictuc - Servicios de Ingeniería",
    template: "Dictuc | %s"
  },
  description: "Dictuc - Servicios de Ingeniería",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        <link rel="preconnect" href="https://backend-dictuc.andesblockchain.com" />
        <link rel="dns-prefetch" href="https://backend-dictuc.andesblockchain.com" />
      </head>
      <body className="antialiased w-full">
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
        <EditorModeProvider>
          {children}
          <EditorPanel />
        </EditorModeProvider>
      </body>
    </html>
  );
}
