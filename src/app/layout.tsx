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
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
      >
        {/* Inline Loading Screen - Shows before React hydration */}
        <div
          id="initial-loader"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#f2f0f4',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.5s ease-out',
          }}
        >
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Logo */}
            <div style={{
              position: 'relative',
              zIndex: 20,
              width: '120px',
              height: '120px',
              animation: 'fadeIn 1s ease-out'
            }}>
              <img
                src="/logo.webp"
                alt="Loading..."
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 15px rgba(0,0,0,0.08))'
                }}
              />
            </div>

            {/* Animated Ring */}
            <div style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '50%',
              animation: 'spin 3s linear infinite'
            }}></div>

            {/* Pulsing Ring */}
            <div style={{
              position: 'absolute',
              width: '160px',
              height: '160px',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '50%',
              animation: 'pulse 2s ease-in-out infinite'
            }}></div>
          </div>

          {/* Inline CSS for animations */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0.1; }
              50% { transform: scale(1.05); opacity: 0.2; }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
            }
            
            /* Auto-hide when React loads */
            body:has(#__next) #initial-loader,
            body:not(:empty) #initial-loader {
              pointer-events: none;
            }
          `}} />
        </div>

        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>

        {/* Script to hide loader after React hydration */}
        <script dangerouslySetInnerHTML={{
          __html: `
          window.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
              var loader = document.getElementById('initial-loader');
              if (loader) {
                loader.style.opacity = '0';
                setTimeout(function() {
                  loader.style.display = 'none';
                }, 500);
              }
            }, 800);
          });
        `}} />
      </body>
    </html>
  );
}
