import { NextRequest, NextResponse } from 'next/server';
import { calculateResults } from '@/lib/calculations/calculator-engine';
import { createOrUpdateHubSpotContact, submitToHubSpotForm } from '@/lib/hubspot';
import { sendResultsEmail } from '@/lib/email';
import type { CalculatorData } from '@/types/calculator';

export async function POST(request: NextRequest) {
  try {
    const data: CalculatorData = await request.json();
    
    console.log('API received request with keys:', Object.keys(data));
    console.log('CompanyInfo:', data.companyInfo);
    console.log('TechAssessment:', data.techAssessment);
    console.log('GrowthGoals:', data.growthGoals);
    console.log('Preferences:', data.preferences);
    console.log('ContactInfo:', data.contactInfo);
    
    // Validate required fields
    if (!data.companyInfo || !data.techAssessment || !data.growthGoals || !data.preferences || !data.contactInfo) {
      console.error('Missing required fields:', {
        hasCompanyInfo: !!data.companyInfo,
        hasTechAssessment: !!data.techAssessment,
        hasGrowthGoals: !!data.growthGoals,
        hasPreferences: !!data.preferences,
        hasContactInfo: !!data.contactInfo,
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Calculate results
    const results = calculateResults(data);
    const trackingId = `calc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Send to HubSpot
    console.log('HubSpot environment check:', {
      hasAccessToken: !!process.env.HUBSPOT_ACCESS_TOKEN,
      hasPortalId: !!process.env.HUBSPOT_PORTAL_ID,
      hasFormGuid: !!process.env.HUBSPOT_FORM_GUID,
    });
    
    try {
      // Try API method first
      if (process.env.HUBSPOT_ACCESS_TOKEN) {
        console.log('Attempting HubSpot API integration...');
        const hubspotResult = await createOrUpdateHubSpotContact(data, results, trackingId);
        if (hubspotResult.success) {
          console.log('Successfully sent to HubSpot via API:', hubspotResult.contactId);
        } else {
          console.error('HubSpot API error:', hubspotResult.error);
          // Try form submission as fallback
          if (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_GUID) {
            const formResult = await submitToHubSpotForm(data, results, trackingId);
            if (!formResult.success) {
              console.error('HubSpot form submission error:', formResult.error);
            }
          }
        }
      } else if (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_GUID) {
        // Use form submission if no API token
        console.log('Attempting HubSpot form submission...');
        const formResult = await submitToHubSpotForm(data, results, trackingId);
        if (formResult.success) {
          console.log('Successfully submitted to HubSpot form');
        } else {
          console.error('HubSpot form submission error:', formResult.error);
        }
      } else {
        console.warn('No HubSpot configuration found. Lead not sent to CRM.');
      }
    } catch (hubspotError) {
      console.error('HubSpot integration error:', hubspotError);
      // Continue even if HubSpot fails - don't break the user experience
    }
    
    // Send email with results
    try {
      await sendResultsEmail(data, results, trackingId);
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Continue even if email fails
    }
    
    // Optional: Still save to database as backup
    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma');
        await prisma.lead.create({
          data: {
            firstName: data.contactInfo.firstName,
            lastName: data.contactInfo.lastName,
            email: data.contactInfo.email,
            phone: data.contactInfo.phone || null,
            title: data.contactInfo.title || null,
            marketingConsent: data.contactInfo.marketingConsent || false,
            
            companyName: data.companyInfo.companyName,
            industry: data.companyInfo.industry,
            companySize: data.companyInfo.companySize,
            location: data.companyInfo.location || 'Not specified',
            revenueRange: data.companyInfo.revenueRange || 'Not specified',
            growthStage: data.companyInfo.growthStage || 'Not specified',
            
            // Lead scoring based on results
            leadScore: Math.round(results.financials.threeYearROI / 10),
            leadSource: 'calculator',
          },
        });
        console.log('Lead saved to database as backup');
      } catch (dbError) {
        console.error('Database backup error:', dbError);
      }
    }
    
    return NextResponse.json({
      success: true,
      results,
      trackingId,
    });
    
  } catch (error) {
    console.error('Calculation error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}