import { NextResponse } from 'next/server';

export async function GET() {
  // Only show this in development or with a secret key
  const debugKey = process.env.DEBUG_KEY || 'debug-hawaii-2024';
  
  return NextResponse.json({
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      hasHubspotToken: !!process.env.HUBSPOT_ACCESS_TOKEN,
      hasHubspotPortal: !!process.env.HUBSPOT_PORTAL_ID,
      hasHubspotForm: !!process.env.HUBSPOT_FORM_GUID,
      hubspotPortalId: process.env.HUBSPOT_PORTAL_ID || 'not-set',
      // Only show first/last 4 chars of token for security
      hubspotTokenPreview: process.env.HUBSPOT_ACCESS_TOKEN 
        ? `${process.env.HUBSPOT_ACCESS_TOKEN.slice(0, 4)}...${process.env.HUBSPOT_ACCESS_TOKEN.slice(-4)}`
        : 'not-set',
    },
    publicEnv: {
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      phone: process.env.NEXT_PUBLIC_PHONE,
      email: process.env.NEXT_PUBLIC_EMAIL,
    },
    timestamp: new Date().toISOString(),
  });
}