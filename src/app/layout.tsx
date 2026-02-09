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

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>

        <div id="initial-loader">
          <div className="loader-content">
            <div className="ring-wrapper">
              {/* Añadimos 3 anillos para un efecto más sofisticado */}
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>

            <div className="loader-logo">
              <img
                src="/logo.webp"
                alt="Dr. Jorge Iglesias"
                width={100}
                height={100}
                style={{ display: 'block', objectFit: 'contain' }}
              />
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
        transition: opacity 0.6s ease-in-out;
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

      .ring {
        position: absolute;
        border-radius: 50%;
        border: 2px solid transparent; /* El "hueco" */
        will-change: transform;
      }

      /* Anillo Exterior */
      .ring-1 { 
        width: 180px; 
        height: 180px; 
        border-top-color: #000000; /* Color del trazo */
        animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      }

      /* Anillo Medio */
      .ring-2 { 
        width: 150px; 
        height: 150px; 
        border-right-color: rgba(0,0,0,0.4); 
        animation: spin 2s linear infinite reverse; /* Gira al revés */
      }

      /* Anillo Interior */
      .ring-3 { 
        width: 120px; 
        height: 120px; 
        border-bottom-color: rgba(0,0,0,0.2); 
        animation: spin 1.5s ease-in-out infinite;
      }

      .loader-logo {
        position: relative;
        z-index: 10;
        animation: logoFade 1s ease-out forwards;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes logoFade {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }

      body:not(.loaded) { overflow: hidden; }
      body.loaded #initial-loader { opacity: 0; pointer-events: none; }
    `}} />
        </div>

        {children}

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
