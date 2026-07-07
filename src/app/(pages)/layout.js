import "./globals.css";
import AmplitudeLoader from "@/components/AmplitudeLoader";
import EditorModeProvider from "@/components/editor/EditorModeProvider";
import EditorPanel from "@/components/editor/EditorPanel";

export const metadata = {
  title: {
    default: "Dictuc - Servicios de Ingeniería",
    template: "Dictuc | %s"
  },
  description: "Dictuc - Servicios de Ingeniería",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
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
