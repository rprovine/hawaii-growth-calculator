import { NextResponse } from 'next/server';
import { createOrUpdateHubSpotContact } from '@/lib/hubspot';

export async function GET() {
  try {
    // Test data
    const testData = {
      companyInfo: {
        companyName: 'Test Company',
        industry: 'Technology',
        companySize: '11-50',
        location: 'Hawaii',
        revenueRange: '$1M-$5M',
        growthStage: 'growth'
      },
      contactInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: `test-${Date.now()}@example.com`,
        phone: '808-555-0123',
        title: 'CEO',
        marketingConsent: true
      },
      techAssessment: {
        currentTools: {},
        totalMonthlyCost: 1000,
        satisfactionScores: {}
      },
      growthGoals: {
        businessObjectives: ['increase_revenue'],
        techBarriers: ['limited_budget'],
        priorityAreas: ['sales']
      },
      preferences: {
        budgetRange: '5k-15k',
        timeline: '3-months',
        implementationType: 'guided',
        decisionMakers: ['owner']
      }
    };

    const testResults = {
      financials: {
        threeYearROI: 250,
        totalSavings: 50000
      },
      recommendedSolution: {
        title: 'Test Solution'
      }
    };

    console.log('Testing HubSpot connection...');
    const result = await createOrUpdateHubSpotContact(
      testData as any,
      testResults as any,
      `test-${Date.now()}`
    );

    return NextResponse.json({
      success: true,
      message: 'HubSpot test completed',
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('HubSpot test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}