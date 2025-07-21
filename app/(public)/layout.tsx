import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hawaii Business Growth Calculator | LeniLani Consulting',
  description: 'Get a personalized technology roadmap and ROI analysis for your Hawaii business. Discover how to save 20-45% on technology costs while accelerating growth.',
  keywords: 'Hawaii business consulting, AI consulting Hawaii, technology ROI calculator, business growth Hawaii, digital transformation Hawaii',
  openGraph: {
    title: 'Hawaii Business Growth Calculator',
    description: 'Free technology assessment and ROI analysis for Hawaii businesses',
    url: 'https://hawaii.lenilani.com',
    siteName: 'LeniLani Consulting',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hawaii Business Growth Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hawaii Business Growth Calculator',
    description: 'Free technology assessment and ROI analysis for Hawaii businesses',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}