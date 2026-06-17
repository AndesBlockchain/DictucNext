import "./globals.css";
import { Amplitude } from "@/amplitude";

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
        <Amplitude />
        {children}
      </body>
    </html>
  );
}
