import { Client } from '@hubspot/api-client';
import type { CalculatorData, CalculationResults } from '@/types/calculator';

// Initialize HubSpot client
const hubspotClient = new Client({ 
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN 
});

// HubSpot contact property types
interface HubSpotContactData {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
  jobtitle?: string;
  website?: string;
  lifecyclestage?: string;
  hs_lead_status?: string;
}

export async function createOrUpdateHubSpotContact(
  data: CalculatorData,
  results: CalculationResults,
  trackingId: string
): Promise<{ success: boolean; contactId?: string; error?: string }> {
  try {
    // Validate HubSpot token
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      console.warn('No HubSpot access token configured');
      return { success: false, error: 'HubSpot not configured' };
    }

    // Calculate average satisfaction score
    const satisfactionScores = Object.values(data.techAssessment.satisfactionScores || {});
    const avgSatisfaction = satisfactionScores.length > 0
      ? satisfactionScores.reduce((a, b) => a + b, 0) / satisfactionScores.length
      : 0;

    // Map timeline to HubSpot's expected values
    const timelineMapping: Record<string, string> = {
      'immediate': 'I need help immediately (ASAP)',
      '3-months': 'Within the next 3 months',
      '6-months': 'Just exploring options',
      '12-months': 'Not sure yet'
    };

    // Create detailed notes with all the custom data
    const notes = `
Hawaii Business Growth Calculator Submission
==========================================
Source: Hawaii Growth Calculator
Tracking ID: ${trackingId}
Date: ${new Date().toISOString()}

Company Information:
- Industry: ${data.companyInfo.industry}
- Size: ${data.companyInfo.companySize}
- Location: ${data.companyInfo.location || 'Hawaii'}
- Revenue Range: ${data.companyInfo.revenueRange || 'Not specified'}
- Growth Stage: ${data.companyInfo.growthStage || 'Not specified'}

Current Technology:
- Monthly Tech Spend: $${data.techAssessment.totalMonthlyCost}
- Tech Satisfaction Score: ${Math.round(avgSatisfaction)}/5
- Pain Points: ${data.companyInfo.currentPainPoints?.join(', ') || 'None specified'}

Growth Goals:
- Business Objectives: ${data.growthGoals.businessObjectives?.join(', ') || 'Not specified'}
- Tech Barriers: ${data.growthGoals.techBarriers?.join(', ') || 'Not specified'}
- Priority Areas: ${data.growthGoals.priorityAreas?.join(', ') || 'Not specified'}

Recommended Solution: ${results.recommendedSolution.title}

Financial Analysis:
- Estimated Monthly Savings: $${results.financials.estimatedMonthlySavings}
- Estimated Annual Savings: $${results.financials.estimatedAnnualSavings}
- 3-Year ROI: ${results.financials.threeYearROI}%
- Payback Period: ${results.financials.paybackPeriodMonths} months
- Total 3-Year Value: $${results.financials.totalValue}

Preferences:
- Budget Range: ${data.preferences.budgetRange}
- Timeline: ${data.preferences.timeline}
- Implementation Type: ${data.preferences.implementationType}
- Decision Makers: ${data.preferences.decisionMakers?.join(', ') || 'Not specified'}
`;

    // Prepare contact data with only standard HubSpot properties
    const contactData: HubSpotContactData = {
      email: data.contactInfo.email,
      firstname: data.contactInfo.firstName,
      lastname: data.contactInfo.lastName,
      phone: data.contactInfo.phone,
      company: data.companyInfo.companyName,
      jobtitle: data.contactInfo.title,
      
      // Standard HubSpot properties
      hs_lead_status: 'NEW',
      website: `https://hawaii-growth-calculator.vercel.app`,
      lifecyclestage: 'lead',
    };

    // Check if contact exists
    let contactId: string;
    
    try {
      // Search for existing contact by email
      const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ' as any,
            value: data.contactInfo.email,
          }],
        }],
        properties: ['email', 'firstname', 'lastname'],
        limit: 1,
      });

      if (searchResponse.results && searchResponse.results.length > 0) {
        // Update existing contact
        contactId = searchResponse.results[0].id;
        await hubspotClient.crm.contacts.basicApi.update(contactId, {
          properties: contactData as any,
        });
        console.log('Updated existing HubSpot contact:', contactId);
      } else {
        // Create new contact
        const createResponse = await hubspotClient.crm.contacts.basicApi.create({
          properties: contactData as any,
        });
        contactId = createResponse.id;
        console.log('Created new HubSpot contact:', contactId);
      }
    } catch {
      // If search fails, try to create new contact
      const createResponse = await hubspotClient.crm.contacts.basicApi.create({
        properties: contactData as any,
      });
      contactId = createResponse.id;
      console.log('Created new HubSpot contact after search error:', contactId);
    }

    // Create engagement note with calculation details
    await createCalculationNote(contactId, notes);

    // Optional: Add to marketing list
    await addToMarketingList(contactId);

    return { success: true, contactId };
  } catch (error) {
    console.error('HubSpot integration error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

async function createCalculationNote(
  contactId: string,
  noteContent: string
): Promise<void> {
  try {
    await hubspotClient.crm.objects.notes.basicApi.create({
      properties: {
        hs_note_body: noteContent,
        hs_timestamp: Date.now().toString(),
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED' as any,
              associationTypeId: 202, // Note to Contact association
            },
          ],
        },
      ],
    });
    console.log('Created HubSpot note for contact:', contactId);
  } catch (error) {
    console.error('Error creating HubSpot note:', error);
  }
}

async function addToMarketingList(contactId: string): Promise<void> {
  // This would add the contact to a specific marketing list
  // You'll need to create a list in HubSpot and get its ID
  const marketingListId = process.env.HUBSPOT_MARKETING_LIST_ID;
  
  if (!marketingListId) {
    console.log('No marketing list ID configured, skipping list addition');
    return;
  }

  try {
    // Add contact to list logic would go here
    console.log('Would add contact to marketing list:', marketingListId);
  } catch (error) {
    console.error('Error adding contact to marketing list:', error);
  }
}

// Utility function to submit form data (alternative method)
export async function submitToHubSpotForm(
  data: CalculatorData,
  _results: CalculationResults,
  _trackingId: string
): Promise<{ success: boolean; error?: string }> {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;
  
  if (!portalId || !formGuid) {
    return { success: false, error: 'HubSpot form not configured' };
  }

  try {
    const formData = {
      fields: [
        { name: 'email', value: data.contactInfo.email },
        { name: 'firstname', value: data.contactInfo.firstName },
        { name: 'lastname', value: data.contactInfo.lastName },
        { name: 'phone', value: data.contactInfo.phone || '' },
        { name: 'company', value: data.companyInfo.companyName },
        { name: 'jobtitle', value: data.contactInfo.title || '' },
      ],
      context: {
        pageUri: 'https://hawaii-growth-calculator.vercel.app',
        pageName: 'Hawaii Business Growth Calculator Results',
      },
    };

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}