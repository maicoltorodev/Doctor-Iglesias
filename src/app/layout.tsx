import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL("https://driglesias.co"),
  title: "Dr. Jorge Iglesias Márquez | Dermatología & Medicina Estética",
  description: "Excelencia y prestigio en dermatología clínica y medicina estética de alta gama. Medicina de vanguardia con el Dr. Jorge Iglesias Márquez.",
  keywords: ["Dermatología", "Medicina Estética", "Bogotá", "Alta Gama", "Cuidado de la piel"],
  authors: [{ name: "Dr. Jorge Iglesias Márquez" }],
  creator: "Dr. Jorge Iglesias Márquez",
  publisher: "Dr. Jorge Iglesias Márquez",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Dr. Jorge Iglesias Márquez | Dermatología & Medicina Estética",
    description: "Excelencia y prestigio en dermatología clínica y medicina estética de alta gama. Medicina de vanguardia con el Dr. Jorge Iglesias Márquez.",
    url: "https://driglesias.co",
    siteName: "Dr. Jorge Iglesias Márquez",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://driglesias.co/imagen-metadata.png",
        width: 1200,
        height: 630,
        alt: "Dr. Jorge Iglesias Márquez | Dermatología & Medicina Estética",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Jorge Iglesias Márquez | Dermatología & Medicina Estética",
    description: "Excelencia y prestigio en dermatología clínica y medicina estética de alta gama.",
    images: ["https://driglesias.co/imagen-metadata.png"],
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>

        <div id="initial-loader">
          {/* Textura de ruido compartida con los componentes de carga de React */}
          <div className="loader-texture"></div>

          <div className="loader-content">
            {/* Versión Desktop (Sincronizada con DesktopLoading.tsx) */}
            <div className="desktop-loader-only">
              <div className="ring-wrapper">
                <svg className="ring-ext" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="1" strokeDasharray="120 200" strokeLinecap="round" /></svg>
                <svg className="ring-mid" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="1.2" strokeDasharray="80 250" strokeLinecap="round" /></svg>
                <svg className="ring-int" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="0.8" strokeDasharray="180 100" strokeLinecap="round" /></svg>
              </div>
              <div className="loader-logo">
                <img src="/logo.webp" alt="Dr. Jorge Iglesias" width={130} height={130} />
              </div>
            </div>

            {/* Versión Mobile (Sincronizada con MobileLoading.tsx) */}
            <div className="mobile-loader-only">
              <div className="ring-wrapper">
                <svg className="ring-mobile" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="2" strokeDasharray="140 160" strokeLinecap="round" /></svg>
              </div>
              <div className="loader-logo">
                <img src="/logo.webp" alt="Dr. Jorge Iglesias" width={80} height={80} />
              </div>
            </div>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
      #initial-loader {
        position: fixed;
        inset: 0;
        background: #f2f0f4;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .loader-texture {
        position: absolute;
        inset: 0;
        opacity: 0.3;
        background-image: url('/noise.png');
        mix-blend-mode: overlay;
        pointer-events: none;
      }

      .loader-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ring-wrapper {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Desktop Rings */
      .ring-wrapper svg { position: absolute; }
      
      .ring-ext { width: 240px; height: 240px; opacity: 0.4; animation: spin 1.5s linear infinite; }
      .ring-mid { width: 190px; height: 190px; opacity: 0.2; animation: spin 2.5s linear infinite reverse; }
      .ring-int { width: 150px; height: 150px; opacity: 0.1; animation: spin 4s linear infinite; }

      /* Mobile Ring */
      .ring-mobile { 
        width: 130px; height: 130px; opacity: 0.3; 
        animation: spin 1.5s linear infinite; 
      }

      .loader-logo {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: logoEnter 0.8s ease-out forwards;
      }

      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes logoEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

      /* Responsividad del Loader (Sin JS para evitar saltos) */
      @media (max-width: 1023px) {
        .desktop-loader-only { display: none; }
        .mobile-loader-only { display: block; }
      }
      @media (min-width: 1024px) {
        .desktop-loader-only { display: block; }
        .mobile-loader-only { display: none; }
      }

      /* EVITAR DOBLE ANIMACIÓN: Ocultar el contenido de Next.js (y su loading.tsx) mientras el splash está activo */
      #main-content {
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
      }
      
      body.loaded #main-content {
        opacity: 1;
      }

      body:not(.loaded) { overflow: hidden; }
      body.loaded #initial-loader { opacity: 0; pointer-events: none; }
    `}} />
        </div>

        <div id="main-content">
          {children}
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              window.addEventListener('load', function() {
                setTimeout(function() {
                  document.body.classList.add('loaded');
                }, 400);
              });
            })();
          `}} />

      </body>
    </html>
  );
}
