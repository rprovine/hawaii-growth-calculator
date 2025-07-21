import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('Test endpoint received data:', JSON.stringify(data, null, 2));
    
    // Check if all required fields are present
    const requiredFields = ['companyInfo', 'techAssessment', 'growthGoals', 'preferences', 'contactInfo'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        missingFields,
        receivedFields: Object.keys(data)
      }, { status: 400 });
    }
    
    // Return a simple success response
    return NextResponse.json({
      success: true,
      message: 'Test endpoint working',
      dataReceived: {
        companyInfo: !!data.companyInfo,
        techAssessment: !!data.techAssessment,
        growthGoals: !!data.growthGoals,
        preferences: !!data.preferences,
        contactInfo: !!data.contactInfo
      },
      results: {
        recommendedSolution: {
          title: "Custom Digital Transformation Solution",
          description: "Test solution description"
        },
        financials: {
          threeYearROI: 250,
          paybackPeriod: 8,
          totalSavings: 150000,
          implementationCost: 45000
        },
        techRecommendations: [],
        improvements: []
      }
    });
    
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test endpoint error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Test endpoint is working',
    timestamp: new Date().toISOString()
  });
}