# HubSpot Integration Setup Guide

This guide will help you integrate the Hawaii Business Growth Calculator with HubSpot CRM.

## Overview

The calculator can send leads to HubSpot in two ways:
1. **API Integration** (Recommended) - More features, requires private app
2. **Form Submission** - Easier setup, limited features

## Method 1: API Integration (Recommended)

### Step 1: Create a Private App in HubSpot

1. Go to **Settings** → **Integrations** → **Private Apps**
2. Click **Create a private app**
3. Name it "Hawaii Growth Calculator"
4. In the **Scopes** tab, select:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.objects.notes.write`
   - `crm.lists.read` (optional)
   - `crm.lists.write` (optional)
5. Click **Create app**
6. Copy the **Access Token**

### Step 2: Create Custom Properties

In HubSpot, create these custom contact properties:

1. Go to **Settings** → **Properties** → **Contact Properties**
2. Create the following properties:

| Property Name | Internal Name | Field Type | Description |
|--------------|---------------|------------|-------------|
| Hawaii Business Industry | `hawaii_business_industry` | Dropdown | Tourism, Real Estate, etc. |
| Current Monthly Tech Spend | `current_monthly_tech_spend` | Number | Monthly technology costs |
| Estimated Monthly Savings | `estimated_monthly_savings` | Number | Calculated savings |
| Estimated Annual Savings | `estimated_annual_savings` | Number | Yearly savings |
| Three Year ROI | `three_year_roi` | Number | ROI percentage |
| Payback Period (Months) | `payback_period_months` | Number | Months to payback |
| Calculator Submission Date | `calculator_submission_date` | Date | When submitted |
| Pain Points | `pain_points` | Multi-line text | Business challenges |
| Tech Satisfaction Score | `tech_satisfaction_score` | Number | 1-5 rating |
| Recommended Solution | `recommended_solution` | Single-line text | Solution name |
| Budget Range | `budget_range` | Dropdown | under-5k, 5k-15k, etc. |
| Implementation Timeline | `implementation_timeline` | Dropdown | immediate, 3-months, etc. |
| Calculator Tracking ID | `calculator_tracking_id` | Single-line text | Unique ID |

### Step 3: Configure Environment Variables

Add to your `.env.local`:
```
HUBSPOT_ACCESS_TOKEN="pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## Method 2: Form Submission (Easier Setup)

### Step 1: Create a HubSpot Form

1. Go to **Marketing** → **Forms**
2. Click **Create form** → **Embedded form**
3. Add these fields:
   - Email (required)
   - First Name
   - Last Name
   - Phone Number
   - Company Name
   - Job Title
4. Save and publish the form
5. Copy the **Form ID** and **Portal ID** from the embed code

### Step 2: Configure Environment Variables

Add to your `.env.local`:
```
HUBSPOT_PORTAL_ID="12345678"
HUBSPOT_FORM_GUID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## Creating a Marketing List (Optional)

1. Go to **Contacts** → **Lists**
2. Create a static list called "Hawaii Calculator - Marketing Consent"
3. Copy the list ID from the URL
4. Add to `.env.local`:
   ```
   HUBSPOT_MARKETING_LIST_ID="123"
   ```

## Testing the Integration

1. Submit a test form through the calculator
2. Check HubSpot Contacts for the new/updated contact
3. Verify custom properties are populated
4. Check for the calculation note attached to the contact

## Workflow Suggestions

Create these workflows in HubSpot:

### 1. New Calculator Lead
- **Trigger**: Contact property "Calculator Submission Date" is known
- **Actions**:
  - Send internal notification
  - Add to "New Calculator Leads" list
  - Assign to sales rep based on industry

### 2. High-Value Lead Alert
- **Trigger**: "Three Year ROI" is greater than 100%
- **Actions**:
  - Send high-priority alert to sales
  - Create task for immediate follow-up
  - Add "Hot Lead" tag

### 3. Nurture Campaign
- **Trigger**: "Payback Period" is greater than 12 months
- **Actions**:
  - Enroll in educational email sequence
  - Send case studies for their industry
  - Schedule follow-up in 30 days

## Troubleshooting

### Contact not appearing in HubSpot
- Check console logs for errors
- Verify API token has correct permissions
- Ensure custom properties exist with exact names

### Form submission failing
- Verify Portal ID and Form GUID are correct
- Check that form is published
- Ensure all required fields are mapped

### Custom properties not updating
- Property names must match exactly (case-sensitive)
- Number fields must receive numeric values
- Date fields must be in ISO format

## Support

For HubSpot API documentation: https://developers.hubspot.com/docs/api/crm/contacts

For calculator issues: Contact info@lenilani.com