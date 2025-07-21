import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Log everything we receive
    console.log('=== DEBUG CALCULATE API ===');
    console.log('Full request data:', JSON.stringify(data, null, 2));
    console.log('Data type:', typeof data);
    console.log('Data keys:', Object.keys(data));
    
    // Check each required field
    const checks = {
      hasData: !!data,
      dataIsObject: typeof data === 'object' && data !== null,
      hasCompanyInfo: !!data.companyInfo,
      companyInfoKeys: data.companyInfo ? Object.keys(data.companyInfo) : [],
      hasTechAssessment: !!data.techAssessment,
      techAssessmentKeys: data.techAssessment ? Object.keys(data.techAssessment) : [],
      hasGrowthGoals: !!data.growthGoals,
      growthGoalsKeys: data.growthGoals ? Object.keys(data.growthGoals) : [],
      hasPreferences: !!data.preferences,
      preferencesKeys: data.preferences ? Object.keys(data.preferences) : [],
      hasContactInfo: !!data.contactInfo,
      contactInfoKeys: data.contactInfo ? Object.keys(data.contactInfo) : [],
    };
    
    console.log('Field checks:', checks);
    
    // Check if any required fields are empty objects
    if (data.companyInfo && Object.keys(data.companyInfo).length === 0) {
      console.warn('companyInfo is an empty object');
    }
    if (data.techAssessment && Object.keys(data.techAssessment).length === 0) {
      console.warn('techAssessment is an empty object');
    }
    if (data.growthGoals && Object.keys(data.growthGoals).length === 0) {
      console.warn('growthGoals is an empty object');
    }
    if (data.preferences && Object.keys(data.preferences).length === 0) {
      console.warn('preferences is an empty object');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Debug info logged to console',
      checks,
      receivedData: data
    });
    
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { 
        error: 'Debug API error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}