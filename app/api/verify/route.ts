import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    project: 'hawaii-growth-calculator',
    message: 'This is the Hawaii Business Growth Calculator',
    timestamp: new Date().toISOString(),
    env: {
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      nodeEnv: process.env.NODE_ENV,
      hasHubSpot: !!process.env.HUBSPOT_ACCESS_TOKEN,
      hasPortalId: !!process.env.HUBSPOT_PORTAL_ID,
    }
  });
}