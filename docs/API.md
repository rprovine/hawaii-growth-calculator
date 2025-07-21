# API Documentation

## Overview

The Hawaii Business Growth Calculator API provides endpoints for calculating ROI and submitting leads to HubSpot. All API routes are built using Next.js API Routes and follow RESTful conventions.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

Currently, the API endpoints are public but include built-in rate limiting and validation. For production use, consider implementing API keys or JWT authentication.

## Endpoints

### Calculate ROI and Submit Lead

Calculates ROI based on provided business data and submits the lead to HubSpot.

**Endpoint:** `POST /api/calculate`

**Content-Type:** `application/json`

#### Request Body

```typescript
{
  // Company Information (Step 1)
  companyInfo: {
    name: string;              // Company name
    industry: string;          // Industry selection
    employeeCount: string;     // Employee range
    currentMonthlyTechSpend: number; // Current monthly technology spend
  };
  
  // Technology Assessment (Step 2)
  techAssessment: {
    currentSystems: {
      hasPointOfSale: boolean;
      hasInventoryManagement: boolean;
      hasCustomerRelationshipManagement: boolean;
      hasMarketingAutomation: boolean;
      hasHRManagement: boolean;
      hasAccountingSoftware: boolean;
      hasProjectManagement: boolean;
      hasBusinessIntelligence: boolean;
    };
    mainPainPoints: string[];   // Array of pain point strings
    techSatisfactionScore: number; // 1-5 scale
    biggestChallenge?: string;  // Optional free text
  };
  
  // Growth Goals (Step 3)
  growthGoals: {
    primaryGoals: string[];     // Array of goal strings
    expectedGrowthRate: string; // Growth rate range
    budgetRange: string;        // Budget range
    timeline: string;           // Implementation timeline
  };
  
  // Preferences (Step 4)
  preferences: {
    cloudPreference: string;    // "cloud_only", "on_premise", "hybrid", "no_preference"
    supportLevel: string;       // "self_service", "standard", "premium", "white_glove"
    trainingNeeds: string;      // "minimal", "moderate", "extensive"
    integrationNeeds: string;   // "none", "some", "extensive"
  };
  
  // Contact Information (Step 5)
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;             // Optional
    jobTitle?: string;          // Optional
    marketingConsent: boolean;  // GDPR consent
    bestTimeToContact?: string; // Optional
  };
}
```

#### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "trackingId": "calc_1234567890_abcdef",
  "results": {
    "monthlyInvestment": 5000,
    "implementationCost": 10000,
    "monthlySavings": 7500,
    "annualSavings": 90000,
    "threeYearROI": 285.5,
    "paybackPeriodMonths": 8,
    "confidenceScore": 85,
    "recommendedSolution": "Comprehensive AI & Cloud"
  },
  "message": "Calculation completed and lead submitted successfully"
}
```

#### Error Responses

**Status:** `400 Bad Request`

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "companyInfo.currentMonthlyTechSpend",
      "message": "Must be a positive number"
    }
  ]
}
```

**Status:** `500 Internal Server Error`

```json
{
  "error": "Failed to process calculation",
  "message": "An unexpected error occurred. Please try again."
}
```

#### Example Request

```bash
curl -X POST https://your-domain.com/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "companyInfo": {
      "name": "Paradise Tours Hawaii",
      "industry": "tourism",
      "employeeCount": "11-50",
      "currentMonthlyTechSpend": 3500
    },
    "techAssessment": {
      "currentSystems": {
        "hasPointOfSale": true,
        "hasInventoryManagement": false,
        "hasCustomerRelationshipManagement": true,
        "hasMarketingAutomation": false,
        "hasHRManagement": true,
        "hasAccountingSoftware": true,
        "hasProjectManagement": false,
        "hasBusinessIntelligence": false
      },
      "mainPainPoints": ["manual_processes", "lack_of_integration"],
      "techSatisfactionScore": 3,
      "biggestChallenge": "Systems don'\''t talk to each other"
    },
    "growthGoals": {
      "primaryGoals": ["increase_efficiency", "improve_customer_experience"],
      "expectedGrowthRate": "10-25",
      "budgetRange": "5k-15k",
      "timeline": "3-months"
    },
    "preferences": {
      "cloudPreference": "cloud_only",
      "supportLevel": "standard",
      "trainingNeeds": "moderate",
      "integrationNeeds": "extensive"
    },
    "contact": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@paradisetoursHI.com",
      "phone": "808-555-1234",
      "jobTitle": "Operations Manager",
      "marketingConsent": true,
      "bestTimeToContact": "Mornings (9am-12pm HST)"
    }
  }'
```

### Test Endpoint (Development Only)

Simple endpoint to test API connectivity.

**Endpoint:** `GET /api/test`

**Response:**
```json
{
  "message": "API is working",
  "timestamp": "2024-01-20T10:30:00Z"
}
```

## Data Validation

All request data is validated using Zod schemas. Key validation rules:

### Company Information
- Company name: Required, 2-100 characters
- Industry: Must be one of predefined values
- Employee count: Must be valid range
- Monthly tech spend: Positive number

### Contact Information
- Email: Valid email format
- Phone: Optional, but validated if provided
- Names: 1-50 characters each
- Marketing consent: Boolean required

### Numeric Ranges
- Tech satisfaction: 1-5
- Budget ranges: Predefined options
- Growth rates: Percentage ranges

## Rate Limiting

API endpoints include rate limiting to prevent abuse:

- **Rate:** 10 requests per minute per IP
- **Headers:** `X-RateLimit-Limit`, `X-RateLimit-Remaining`
- **Reset:** `X-RateLimit-Reset` (Unix timestamp)

When rate limit is exceeded:
```json
{
  "error": "Too many requests",
  "retryAfter": 60
}
```

## HubSpot Integration

The `/api/calculate` endpoint automatically:

1. **Creates or updates contact** in HubSpot
2. **Sets custom properties** with calculation results
3. **Adds detailed note** with full assessment
4. **Handles marketing consent** per GDPR

### HubSpot Properties Set

| Property | Type | Description |
|----------|------|-------------|
| firstname | string | Contact first name |
| lastname | string | Contact last name |
| email | string | Contact email |
| phone | string | Contact phone |
| company | string | Company name |
| jobtitle | string | Job title |
| hawaii_business_industry | string | Selected industry |
| current_monthly_tech_spend | number | Current spend |
| employee_count | string | Employee range |
| tech_satisfaction_score | number | 1-5 rating |
| pain_points | string | Comma-separated list |
| budget_range | string | Selected budget |
| implementation_timeline | string | Timeline preference |
| estimated_monthly_savings | number | Calculated savings |
| three_year_roi | number | ROI percentage |
| payback_period_months | number | Months to payback |
| calculator_tracking_id | string | Unique submission ID |
| calculator_submission_date | date | Submission timestamp |

## Error Handling

The API uses consistent error response format:

```typescript
{
  error: string;        // Error type
  message?: string;     // Human-readable message
  details?: any;        // Additional error details
  code?: string;        // Error code for debugging
}
```

Common error codes:
- `VALIDATION_ERROR` - Invalid request data
- `HUBSPOT_ERROR` - HubSpot API failure
- `CALCULATION_ERROR` - ROI calculation failed
- `RATE_LIMIT_ERROR` - Too many requests
- `INTERNAL_ERROR` - Unexpected server error

## Webhooks (Future)

Planned webhook support for:
- Lead submission notifications
- Calculation completed events
- HubSpot sync status

## SDK Examples

### JavaScript/TypeScript

```typescript
async function submitCalculation(data: CalculatorData) {
  const response = await fetch('/api/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Calculation failed');
  }

  return response.json();
}
```

### Python

```python
import requests
import json

def submit_calculation(data):
    url = "https://your-domain.com/api/calculate"
    headers = {"Content-Type": "application/json"}
    
    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status()
    
    return response.json()
```

### cURL

```bash
# Save request data to file
cat > request.json << 'EOF'
{
  "companyInfo": {...},
  "techAssessment": {...},
  "growthGoals": {...},
  "preferences": {...},
  "contact": {...}
}
EOF

# Send request
curl -X POST https://your-domain.com/api/calculate \
  -H "Content-Type: application/json" \
  -d @request.json
```

## Best Practices

1. **Always validate data** before sending
2. **Handle errors gracefully** in your UI
3. **Implement retry logic** for network failures
4. **Cache results** when appropriate
5. **Monitor rate limits** in headers
6. **Use HTTPS** in production
7. **Implement request timeouts** (30s recommended)

## Testing

Test the API using:
- Postman collection (available on request)
- cURL commands (see examples)
- Built-in test endpoint
- Swagger documentation (coming soon)

## Versioning

The API currently uses URL versioning. Future versions will be available at:
- `/api/v1/calculate` (current)
- `/api/v2/calculate` (future)

## Support

For API support:
- GitHub Issues: [Report API issues](https://github.com/rprovine/hawaii-growth-calculator/issues)
- Email: api-support@lenilani.com
- Documentation: This document