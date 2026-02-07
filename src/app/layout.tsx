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
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
