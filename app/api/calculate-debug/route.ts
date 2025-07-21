import { NextRequest, NextResponse } from 'next/server';
import { calculateResults } from '@/lib/calculations/calculator-engine';
import type { CalculatorData } from '@/types/calculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create a minimal valid data structure for testing
    const testData: CalculatorData = {
      companyInfo: {
        companyName: body.companyInfo?.companyName || 'Test Company',
        industry: body.companyInfo?.industry || 'Technology',
        companySize: body.companyInfo?.companySize || '11-50',
        location: body.companyInfo?.location || 'Oahu - Honolulu',
        revenueRange: body.companyInfo?.revenueRange || '1m-5m',
        growthStage: body.companyInfo?.growthStage || 'growth',
        currentPainPoints: body.companyInfo?.currentPainPoints || ['High software costs'],
      },
      techAssessment: {
        currentTools: body.techAssessment?.currentTools || {},
        totalMonthlyCost: body.techAssessment?.totalMonthlyCost || 5000,
        satisfactionScores: body.techAssessment?.satisfactionScores || {},
      },
      growthGoals: {
        businessObjectives: body.growthGoals?.businessObjectives || ['Increase revenue'],
        techBarriers: body.growthGoals?.techBarriers || ['Budget constraints'],
        priorityAreas: body.growthGoals?.priorityAreas || ['Sales & Marketing'],
      },
      preferences: {
        budgetRange: body.preferences?.budgetRange || '5k-15k',
        timeline: body.preferences?.timeline || '3-months',
        implementationType: body.preferences?.implementationType || 'guided',
        decisionMakers: body.preferences?.decisionMakers || ['CEO/Owner'],
      },
      contactInfo: {
        firstName: body.contactInfo?.firstName || 'John',
        lastName: body.contactInfo?.lastName || 'Doe',
        email: body.contactInfo?.email || 'test@example.com',
        phone: body.contactInfo?.phone || '',
        title: body.contactInfo?.title || 'CEO',
        marketingConsent: body.contactInfo?.marketingConsent || false,
      },
    };
    
    // Calculate results with the test data
    const results = calculateResults(testData);
    
    return NextResponse.json({
      success: true,
      results,
      trackingId: `calc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      debug: {
        receivedData: body,
        usedData: testData,
      }
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