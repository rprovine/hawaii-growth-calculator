import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hawaii Business Growth Calculator | LeniLani Consulting",
  description: "Get a personalized technology roadmap and ROI analysis for your Hawaii business in 5 minutes. See how local companies save 20-45% on technology costs.",
  keywords: "Hawaii business technology, ROI calculator, digital transformation Hawaii, business growth calculator, technology consulting Hawaii",
  authors: [{ name: "LeniLani Consulting" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/images/lenilani-logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: "Hawaii Business Growth Calculator",
    description: "Discover your business growth potential with AI-powered insights tailored for Hawaii companies",
    url: "https://hawaii.lenilani.com",
    siteName: "LeniLani Hawaii Business Growth Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hawaii Business Growth Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hawaii Business Growth Calculator",
    description: "Get your personalized technology roadmap and ROI analysis in 5 minutes",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://hawaii.lenilani.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
