# HubSpot Integration Guide

This guide covers setting up and managing the HubSpot integration for the Hawaii Business Growth Calculator.

## Table of Contents

1. [Overview](#overview)
2. [HubSpot Setup](#hubspot-setup)
3. [Creating a Private App](#creating-a-private-app)
4. [API Configuration](#api-configuration)
5. [Contact Properties](#contact-properties)
6. [Testing Integration](#testing-integration)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

## Overview

The calculator integrates with HubSpot to:
- Create/update contacts automatically
- Track lead source and calculator results
- Enable marketing automation
- Provide sales team with qualified leads

### Integration Flow

1. User completes calculator
2. Results are calculated
3. Contact is created/updated in HubSpot
4. Calculator results stored in contact properties
5. Contact enrolled in appropriate workflows

## HubSpot Setup

### Prerequisites

- HubSpot account (Professional or Enterprise recommended)
- Admin access to create private apps
- Understanding of HubSpot contact properties

### Account Preparation

1. **Log in to HubSpot**
   - Go to https://app.hubspot.com
   - Use admin credentials

2. **Navigate to Settings**
   - Click gear icon in top navigation
   - Select "Settings"

3. **Access Integrations**
   - In left sidebar: Integrations → Private Apps

## Creating a Private App

### Step 1: Create New App

1. Click "Create a private app"
2. Enter app details:
   - **Name**: Hawaii Growth Calculator
   - **Description**: Integration for lead generation calculator
   - **Logo**: Upload if desired

### Step 2: Set Scopes

Navigate to "Scopes" tab and enable:

**CRM Scopes:**
- `crm.objects.contacts.read`
- `crm.objects.contacts.write`
- `crm.objects.companies.read`
- `crm.objects.companies.write`
- `crm.objects.deals.read` (optional)
- `crm.objects.deals.write` (optional)

**Other Scopes:**
- `forms` (if using form submission)
- `timeline` (for activity tracking)

### Step 3: Generate Access Token

1. Click "Create app"
2. Review permissions
3. Click "Continue creating"
4. Copy the access token

**⚠️ Important**: Store this token securely - you cannot view it again!

### Step 4: Get Portal ID

1. In HubSpot, click your account name (top right)
2. Select "Account & Billing"
3. Find your Hub ID (Portal ID)
4. Copy this number

## API Configuration

### Environment Variables

Add to your `.env.local` and Vercel environment variables:

```bash
# Required for API integration
HUBSPOT_ACCESS_TOKEN=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
HUBSPOT_PORTAL_ID=12345678

# Optional - for form submission fallback
HUBSPOT_FORM_GUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Configuration Options

The integration supports two methods:

1. **API Method** (Recommended)
   - Direct API calls using private app
   - More flexible and reliable
   - Requires access token

2. **Form Submission** (Fallback)
   - Uses HubSpot forms API
   - No authentication required
   - Limited to form fields

## Contact Properties

### Standard Properties Used

| Property | API Name | Type | Description |
|----------|----------|------|-------------|
| Email | `email` | Email | Contact email (required) |
| First Name | `firstname` | Text | Contact first name |
| Last Name | `lastname` | Text | Contact last name |
| Phone | `phone` | Phone number | Contact phone |
| Company | `company` | Text | Company name |
| Website | `website` | Text | Company website |
| Industry | `industry` | Dropdown | Business industry |
| Number of Employees | `numemployees` | Dropdown | Employee count range |

### Custom Properties to Create

Create these in HubSpot (Settings → Properties → Contact Properties):

| Property Label | Internal Name | Field Type | Description |
|----------------|---------------|------------|-------------|
| Monthly Tech Spend | `monthly_tech_spend` | Number | Current monthly spending |
| Business Type | `business_type` | Dropdown | B2B, B2C, or Both |
| Growth Goal | `growth_goal` | Dropdown | Primary business goal |
| Target Growth Percentage | `target_growth_percentage` | Number | Desired growth % |
| Implementation Timeline | `implementation_timeline` | Dropdown | Desired timeline |
| Tech Comfort Level | `tech_comfort_level` | Dropdown | Technical expertise |
| DIY Interest | `diy_interest` | Checkbox | Interested in DIY |
| Professional Interest | `professional_interest` | Checkbox | Wants professional help |
| Calculator Results | `calculator_results` | Multi-line text | Full results JSON |
| Recommended Solution | `recommended_solution` | Text | Suggested package |
| Estimated ROI | `estimated_roi` | Number | 3-year ROI percentage |
| Lead Source Detail | `lead_source_detail` | Text | "Hawaii Growth Calculator" |

### Creating Custom Properties

1. **Navigate to Properties**
   - Settings → Properties → Contact properties
   - Click "Create property"

2. **Configure Each Property**
   - Enter label and internal name
   - Select field type
   - Add description
   - Set field options (for dropdowns)

3. **Dropdown Options**

   **Business Type:**
   - B2B
   - B2C
   - Both

   **Growth Goal:**
   - increase_revenue
   - reduce_costs
   - improve_efficiency
   - expand_market
   - digital_transformation

   **Tech Comfort Level:**
   - beginner
   - intermediate
   - advanced

## Testing Integration

### Test Endpoints

The application includes test endpoints:

1. **Test HubSpot Connection**
   ```bash
   curl https://hawaii-growth-calculator.vercel.app/api/test-hubspot
   ```

2. **Test Contact Creation**
   ```javascript
   // test-hubspot.js
   const testData = {
     companyInfo: {
       companyName: "Test Company",
       industry: "Restaurant",
       businessType: "B2C",
       currentMonthlySpend: 5000
     },
     contactInfo: {
       name: "Test User",
       email: "test@example.com",
       phone: "808-555-1234"
     }
   };

   fetch('https://hawaii-growth-calculator.vercel.app/api/calculate', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(testData)
   });
   ```

### Verification Steps

1. **Check API Connection**
   - Run test endpoint
   - Verify no authentication errors
   - Check response status

2. **Submit Test Lead**
   - Use calculator with test data
   - Note the email used

3. **Verify in HubSpot**
   - Go to Contacts
   - Search for test email
   - Verify all properties populated

4. **Check Timeline**
   - Open contact record
   - Review timeline events
   - Confirm calculator submission logged

## Monitoring & Maintenance

### Regular Checks

1. **Weekly**
   - Review new contacts created
   - Check for sync errors
   - Verify property mappings

2. **Monthly**
   - Audit contact data quality
   - Review API usage limits
   - Update property options if needed

### API Limits

HubSpot API limits:
- **Daily**: 500,000 requests
- **10-second**: 100 requests
- **Per second**: 10 requests

The calculator implements rate limiting to stay within limits.

### Error Monitoring

Monitor these locations:

1. **Vercel Logs**
   - Function logs for API errors
   - Failed contact creations

2. **HubSpot Activity**
   - Private app dashboard
   - API call history

3. **Application Logs**
   - Browser console errors
   - Network tab failures

## Troubleshooting

### Common Issues

#### 1. Authentication Errors

**Error**: "401 Unauthorized"

**Solutions**:
- Verify access token is correct
- Check token hasn't expired
- Ensure scopes are properly set
- Regenerate token if needed

#### 2. Contact Not Created

**Error**: Contact missing in HubSpot

**Solutions**:
- Check email validation
- Verify API response in logs
- Test with different email
- Check for duplicate contacts

#### 3. Properties Not Updating

**Error**: Custom properties empty

**Solutions**:
- Verify property internal names match
- Check property types are correct
- Ensure properties exist in HubSpot
- Review property permissions

#### 4. Rate Limiting

**Error**: "429 Too Many Requests"

**Solutions**:
- Implement exponential backoff
- Cache frequently accessed data
- Batch operations when possible
- Monitor usage in HubSpot

### Debug Mode

Enable debug logging:

1. **Set environment variable**
   ```bash
   NEXT_PUBLIC_DEBUG_MODE=true
   ```

2. **Check console logs**
   - Open browser DevTools
   - Monitor network requests
   - Review console output

3. **Test API directly**
   ```bash
   curl -X POST https://api.hubapi.com/crm/v3/objects/contacts \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"properties": {"email": "test@example.com"}}'
   ```

### Getting Help

1. **HubSpot Support**
   - Developer documentation: https://developers.hubspot.com
   - API reference: https://developers.hubspot.com/docs/api
   - Community: https://community.hubspot.com

2. **Application Support**
   - Check error logs in Vercel
   - Review this documentation
   - Contact development team

## Best Practices

1. **Data Quality**
   - Validate emails before sending
   - Standardize phone formats
   - Use consistent naming

2. **Security**
   - Never expose access token
   - Use environment variables
   - Implement proper error handling

3. **Performance**
   - Cache HubSpot responses
   - Batch operations when possible
   - Handle failures gracefully

4. **Compliance**
   - Obtain consent for marketing
   - Include privacy policy
   - Allow data deletion requests

## Integration Code Reference

### Creating/Updating Contacts

```typescript
// lib/hubspot.ts
export async function createOrUpdateHubSpotContact(
  data: CalculatorData,
  results: CalculatorResults,
  trackingId: string
) {
  const properties = {
    email: data.contactInfo.email,
    firstname: data.contactInfo.name.split(' ')[0],
    lastname: data.contactInfo.name.split(' ').slice(1).join(' '),
    phone: data.contactInfo.phone,
    company: data.companyInfo.companyName,
    industry: data.companyInfo.industry,
    monthly_tech_spend: data.companyInfo.currentMonthlySpend,
    calculator_results: JSON.stringify(results),
    lead_source_detail: 'Hawaii Growth Calculator',
    // ... additional properties
  };

  // API call implementation
}
```

### Form Submission Fallback

```typescript
// lib/hubspot.ts
export async function submitToHubSpotForm(
  data: CalculatorData,
  trackingId: string
) {
  const formData = {
    portalId: process.env.HUBSPOT_PORTAL_ID,
    formGuid: process.env.HUBSPOT_FORM_GUID,
    fields: [
      { name: 'email', value: data.contactInfo.email },
      // ... additional fields
    ],
    context: {
      pageUri: process.env.NEXT_PUBLIC_SITE_URL,
      pageName: 'Hawaii Growth Calculator Results'
    }
  };

  // Form submission implementation
}
```