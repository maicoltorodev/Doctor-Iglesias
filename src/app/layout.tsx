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
          <div className="loader-texture"></div>

          <div className="loader-center">
            {/* Anillos unificados */}
            <svg className="ring ring-d ring-1" width="240" height="240" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="1" strokeDasharray="120 200" strokeLinecap="round" /></svg>
            <svg className="ring ring-d ring-2" width="190" height="190" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="1.2" strokeDasharray="80 250" strokeLinecap="round" /></svg>
            <svg className="ring ring-d ring-3" width="150" height="150" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="0.8" strokeDasharray="180 100" strokeLinecap="round" /></svg>
            <svg className="ring ring-m" width="130" height="130" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="2" strokeDasharray="140 160" strokeLinecap="round" /></svg>

            {/* Logo centrado */}
            <div className="center-logo">
              <img src="/logo.webp" alt="Dr. Jorge Iglesias" className="logo-img" />
            </div>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
      #initial-loader {
        position: fixed;
        inset: 0;
        background: #f2f0f4;
        z-index: 9999;
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

      .loader-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ring {
        position: absolute;
        transform-origin: center;
        will-change: transform;
      }

      .ring-1 { width: 240px; height: 240px; opacity: 0.4; animation: spin 1.5s linear infinite; }
      .ring-2 { width: 190px; height: 190px; opacity: 0.2; animation: spin 2.5s linear infinite reverse; }
      .ring-3 { width: 150px; height: 150px; opacity: 0.1; animation: spin 4s linear infinite; }
      .ring-m { width: 130px; height: 130px; opacity: 0.3; animation: spin 1.5s linear infinite; }

      .center-logo {
        position: relative;
        z-index: 10;
        animation: logoEnter 0.8s ease-out forwards;
      }

      .logo-img { display: block; object-fit: contain; }

      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes logoEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

      @media (max-width: 1023px) {
        .ring-d { display: none; }
        .ring-m { display: block; }
        .logo-img { width: 80px; height: 80px; }
      }
      @media (min-width: 1024px) {
        .ring-d { display: block; }
        .ring-m { display: none; }
        .logo-img { width: 130px; height: 130px; }
      }

      #main-content { opacity: 0; transition: opacity 0.8s ease-in-out; }
      body.loaded #main-content { opacity: 1; }
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
