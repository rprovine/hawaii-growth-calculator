# Architecture Overview

This document provides a comprehensive overview of the Hawaii Business Growth Calculator's technical architecture, design decisions, and system components.

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Application Architecture](#application-architecture)
4. [Data Flow](#data-flow)
5. [Component Architecture](#component-architecture)
6. [API Design](#api-design)
7. [State Management](#state-management)
8. [Security Architecture](#security-architecture)
9. [Performance Considerations](#performance-considerations)
10. [Scalability](#scalability)

## System Overview

The Hawaii Business Growth Calculator is a modern web application built with Next.js 15, leveraging server-side rendering, API routes, and edge functions for optimal performance.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Landing   │  │  Calculator  │  │     Results      │   │
│  │    Page     │  │  Multi-Step  │  │    Display       │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────┴───────────────────────────────────┐
│                    Next.js API Routes                        │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  /calculate │  │ /test-hubspot│  │    /verify       │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────┴───────────────────────────────────┐
│                    Business Logic Layer                      │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Calculator  │  │   HubSpot    │  │     Email        │   │
│  │   Engine    │  │ Integration  │  │    Service       │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────┴───────────────────────────────────┐
│                    External Services                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  HubSpot    │  │   Vercel     │  │    Database      │   │
│  │    API      │  │   Hosting    │  │   (Optional)     │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Core Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 15.4.2 | Full-stack React framework |
| Language | TypeScript | 5.0+ | Type safety and better DX |
| Styling | Tailwind CSS | 3.4+ | Utility-first CSS |
| UI Components | Radix UI | Latest | Accessible components |
| Forms | React Hook Form | 7.0+ | Form management |
| Validation | Zod | 3.0+ | Schema validation |
| State | Zustand | 4.0+ | Client state management |
| API Client | Native Fetch | - | HTTP requests |

### Additional Libraries

| Library | Purpose |
|---------|---------|
| @hubspot/api-client | HubSpot integration |
| class-variance-authority | Component variants |
| clsx | Conditional classes |
| tailwind-merge | Merge Tailwind classes |
| prisma | Database ORM (optional) |
| nodemailer | Email sending (optional) |

## Application Architecture

### Directory Structure

```
app/                          # Next.js App Router
├── (public)/                # Public route group
│   ├── calculator/         # Calculator page
│   └── page.tsx           # Landing page
├── api/                    # API endpoints
│   ├── calculate/         # Main calculation endpoint
│   ├── test-hubspot/      # HubSpot testing
│   └── verify/            # Deployment verification
├── layout.tsx             # Root layout
└── globals.css           # Global styles

components/                  # React components
├── calculator/            # Calculator-specific
│   ├── CalculatorWrapper.tsx
│   └── steps/            # Form steps
└── ui/                   # Reusable UI components

lib/                        # Core business logic
├── calculations/         # ROI calculations
├── hubspot.ts           # HubSpot integration
├── email.ts             # Email service
└── utils.ts             # Utilities
```

### Design Patterns

1. **Component-Based Architecture**
   - Modular, reusable components
   - Clear separation of concerns
   - Props-based communication

2. **Server Components**
   - Default to server components
   - Client components only when needed
   - Optimal bundle size

3. **API Route Handlers**
   - RESTful design
   - Consistent error handling
   - Input validation

## Data Flow

### Calculator Flow

```
User Input → Form Validation → State Update → API Call → Calculation → Results
     ↓                                              ↓
     └──────────────────────────────────────────────┴─→ HubSpot
```

### Detailed Flow

1. **User Input**
   - Multi-step form captures data
   - Client-side validation
   - Progress saved to local state

2. **Form Submission**
   - Data aggregated from all steps
   - Sent to `/api/calculate` endpoint
   - Server-side validation

3. **Calculation Process**
   - Business logic applied
   - ROI calculations performed
   - Results formatted

4. **Integration**
   - HubSpot contact created/updated
   - Email notification sent (optional)
   - Results returned to client

5. **Results Display**
   - Formatted results shown
   - Download options provided
   - Next steps presented

## Component Architecture

### Component Hierarchy

```
<Layout>
  <CalculatorPage>
    <CalculatorWrapper>
      <ProgressBar />
      <StepComponent>
        <FormFields />
        <NavigationButtons />
      </StepComponent>
      <ResultsDisplay />
    </CalculatorWrapper>
  </CalculatorPage>
</Layout>
```

### Key Components

#### CalculatorWrapper
- Manages form state
- Handles step navigation
- Orchestrates data flow

```typescript
interface CalculatorWrapperProps {
  initialStep?: number;
  onComplete?: (data: CalculatorData) => void;
}
```

#### Step Components
- Self-contained form sections
- Own validation logic
- Consistent interface

```typescript
interface StepProps {
  data: Partial<CalculatorData>;
  onNext: (stepData: StepData) => void;
  onBack: () => void;
}
```

#### ResultsDisplay
- Presents calculation results
- Handles data visualization
- Provides action buttons

```typescript
interface ResultsDisplayProps {
  results: CalculatorResults;
  data: CalculatorData;
  onReset: () => void;
}
```

## API Design

### Endpoints

#### POST /api/calculate
Main calculation endpoint

**Request:**
```typescript
{
  companyInfo: CompanyInfo;
  techAssessment: TechAssessment;
  growthGoals: GrowthGoals;
  preferences: Preferences;
  contactInfo: ContactInfo;
}
```

**Response:**
```typescript
{
  success: boolean;
  results?: CalculatorResults;
  trackingId?: string;
  error?: string;
}
```

#### GET /api/verify
Deployment verification

**Response:**
```typescript
{
  project: string;
  timestamp: string;
  env: {
    siteName: string;
    nodeEnv: string;
    hasHubSpot: boolean;
  }
}
```

### Error Handling

Consistent error response format:

```typescript
{
  success: false;
  error: string;
  code?: string;
  details?: any;
}
```

HTTP Status Codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 500: Internal Server Error

## State Management

### Client State (Zustand)

```typescript
interface CalculatorStore {
  // State
  currentStep: number;
  data: Partial<CalculatorData>;
  results: CalculatorResults | null;
  
  // Actions
  updateData: (data: Partial<CalculatorData>) => void;
  setStep: (step: number) => void;
  setResults: (results: CalculatorResults) => void;
  reset: () => void;
}
```

### State Persistence

- Local storage for form progress
- Session recovery on page reload
- Clear on form submission

### Server State

- Stateless API design
- No session management
- All data in request/response

## Security Architecture

### Input Validation

1. **Client-side**
   - Zod schemas for type safety
   - React Hook Form validation
   - XSS prevention

2. **Server-side**
   - Request body validation
   - SQL injection prevention
   - Rate limiting

### Authentication & Authorization

- Public calculator (no auth required)
- API endpoints protected by CORS
- HubSpot API secured with private app token

### Data Protection

1. **Environment Variables**
   - Sensitive data in `.env` files
   - Never committed to repository
   - Managed through Vercel

2. **HTTPS Only**
   - Enforced by Vercel
   - Secure data transmission
   - Certificate management automatic

3. **Content Security Policy**
   ```typescript
   headers: [
     {
       key: 'Content-Security-Policy',
       value: "default-src 'self'; script-src 'self' 'unsafe-inline';"
     }
   ]
   ```

## Performance Considerations

### Optimization Strategies

1. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based splitting automatic
   - Reduced initial bundle size

2. **Image Optimization**
   - Next.js Image component
   - Automatic format selection
   - Lazy loading by default

3. **Caching**
   - Static pages cached at edge
   - API responses with cache headers
   - Browser caching for assets

### Performance Metrics

Target metrics:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1
- Bundle size: < 200KB (initial)

### Monitoring

- Vercel Analytics for performance
- Error tracking with logs
- Real User Monitoring (RUM)

## Scalability

### Horizontal Scaling

- Serverless functions auto-scale
- Edge network distribution
- No server management required

### Vertical Scaling

- Function memory: 1024MB default
- Timeout: 10s for calculations
- Configurable per endpoint

### Database Scaling

If using database:
- Connection pooling
- Read replicas for queries
- Prisma query optimization

### Caching Strategy

1. **CDN Level**
   - Static assets cached globally
   - HTML pages with s-maxage

2. **Application Level**
   - Calculation results caching
   - HubSpot data caching

3. **Browser Level**
   - Service worker for offline
   - LocalStorage for form data

## Future Considerations

### Potential Enhancements

1. **Multi-tenancy**
   - White-label support
   - Custom branding per partner
   - Separate data isolation

2. **Advanced Analytics**
   - A/B testing framework
   - Conversion tracking
   - User behavior analytics

3. **API Expansion**
   - Public API for partners
   - Webhook support
   - Batch processing

4. **Internationalization**
   - Multi-language support
   - Currency conversion
   - Regional calculations

### Technical Debt

Areas to monitor:
- Dependency updates
- TypeScript strict mode
- Test coverage
- Documentation updates

## Conclusion

The Hawaii Business Growth Calculator is built on a modern, scalable architecture that prioritizes:
- Performance through edge computing
- Security through proper validation
- Maintainability through clear structure
- User experience through optimized delivery

The architecture supports future growth while maintaining simplicity and developer experience.