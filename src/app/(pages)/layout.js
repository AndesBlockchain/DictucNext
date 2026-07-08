import "./globals.css";
import { Montserrat } from "next/font/google";
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
        <AmplitudeLoader />
        <EditorModeProvider>
          {children}
          <EditorPanel />
        </EditorModeProvider>
      </body>
    </html>
  );
}
