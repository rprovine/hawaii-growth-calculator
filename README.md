# Hawaii Business Growth Calculator

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.0+-teal)](https://tailwindcss.com/)

A sophisticated lead generation and ROI calculator designed specifically for Hawaii businesses to discover their technology growth potential and cost savings opportunities. Built for Lenilani Consulting to help local businesses transform through smart technology investments.

**Live Application:** https://hawaii-growth-calculator.vercel.app/calculator

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Development Guide](./docs/DEVELOPMENT.md) | Local setup, coding standards, and development workflow |
| [Deployment Guide](./docs/DEPLOYMENT.md) | How to deploy to Vercel and manage environments |
| [HubSpot Integration](./docs/HUBSPOT.md) | Setting up and managing HubSpot integration |
| [Architecture Overview](./docs/ARCHITECTURE.md) | Technical architecture and design decisions |
| [API Documentation](./docs/API.md) | API endpoints and usage |
| [Troubleshooting](./docs/TROUBLESHOOTING.md) | Common issues and solutions |

## 🌺 Overview

The Hawaii Business Growth Calculator helps local businesses:
- Calculate potential ROI from technology investments with Hawaii-specific market factors
- Get personalized recommendations based on industry, size, and current tech stack
- Understand payback periods and 3-year financial projections
- Connect with expert consultants for implementation support

Built with Hawaii's unique market conditions in mind:
- Island logistics and connectivity challenges
- Local labor market dynamics (25% cost premium)
- Tourism and hospitality industry focus
- Small business constraints (< 50 employees)

## 🚀 Features

- **Multi-Step Assessment**: 5-step comprehensive evaluation of current tech stack and growth goals
- **Smart ROI Calculations**: Hawaii-specific factors for accurate projections
- **HubSpot Integration**: Automatic lead capture and CRM synchronization
- **Responsive Design**: Beautiful experience on all devices
- **Real-time Calculations**: Instant ROI projections as you progress
- **Industry Benchmarks**: Compare against similar Hawaii businesses
- **Email Notifications**: Instant alerts for new assessments
- **Marketing Consent**: GDPR-compliant opt-in for communications

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.2 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS v3
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand with persistence
- **CRM**: HubSpot API Client
- **Email**: Nodemailer (optional)
- **Database**: Prisma + PostgreSQL/SQLite (optional)
- **Analytics**: Built-in tracking system

## Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm package manager
- HubSpot account with API access
- PostgreSQL database (optional - for lead backup)
- SMTP server access (optional - for email notifications)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rprovine/hawaii-growth-calculator.git
cd hawaii-growth-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:
```env
# HubSpot Integration (Required)
HUBSPOT_ACCESS_TOKEN="pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
HUBSPOT_PORTAL_ID="12345678"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
NEXT_PUBLIC_SITE_NAME="Hawaii Business Growth Calculator"

# Contact Information
NEXT_PUBLIC_PHONE="815-641-6689"
NEXT_PUBLIC_EMAIL="info@lenilani.com"

# Optional: Database (for lead backup)
DATABASE_URL="postgresql://user:password@localhost:5432/hawaii_growth"
# For local development with SQLite:
# DATABASE_URL="file:./dev.db"

# Optional: Email Notifications
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="noreply@lenilani.com"
EMAIL_TO="sales@lenilani.com"

# Optional: Feature Flags
NEXT_PUBLIC_ENABLE_EMAIL="true"
NEXT_PUBLIC_ENABLE_ADMIN="false"
NEXT_PUBLIC_DEBUG_MODE="false"
```

5. Set up the database (optional - only if using database backup):
```bash
npx prisma generate
npx prisma db push
```

6. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

7. Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
hawaii-growth-calculator/
├── app/                    # Next.js app directory
│   ├── (public)/          # Public routes
│   │   ├── calculator/    # Calculator page
│   │   └── page.tsx       # Landing page
│   ├── api/               # API routes
│   │   └── calculate/     # Calculation & HubSpot endpoint
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── calculator/        # Calculator components
│   │   ├── steps/        # Form step components
│   │   │   ├── CompanyInfoStep.tsx
│   │   │   ├── TechAssessmentStep.tsx
│   │   │   ├── GrowthGoalsStep.tsx
│   │   │   ├── PreferencesStep.tsx
│   │   │   └── ContactStep.tsx
│   │   ├── CalculatorWrapper.tsx
│   │   └── ProgressBar.tsx
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
│   ├── calculations/      # ROI calculation engine
│   │   └── calculator-engine.ts
│   ├── hubspot.ts        # HubSpot integration
│   ├── email.ts          # Email notifications
│   └── validations/      # Zod schemas
├── hooks/                 # Custom React hooks
│   └── useCalculatorStore.ts
├── types/                 # TypeScript types
│   └── calculator.ts
├── prisma/               # Database schema (optional)
└── public/               # Static assets
```

## 🧮 Calculation Logic

The calculator uses Hawaii-specific market factors:

```typescript
const HAWAII_MARKET_FACTORS = {
  costPremium: 1.10,           // 10% higher implementation costs
  implementationSpeed: 0.90,    // 90% speed due to local expertise
  laborCostPremium: 1.25,      // 25% higher labor costs
  overheadMultiplier: 1.0      // Standard overhead
};
```

### ROI Calculation Components:
1. **Current State Analysis**
   - Monthly technology spend
   - Employee productivity baseline
   - System efficiency metrics

2. **Improvement Projections**
   - Industry-specific efficiency gains (15-45%)
   - Automation savings (20-70% task reduction)
   - Revenue growth potential (10-25%)

3. **Investment Costs**
   - Implementation costs (1-3 months of investment)
   - Monthly subscription/service fees
   - Training and adoption costs

4. **Results**
   - Monthly and annual savings
   - Payback period (typically 6-12 months)
   - 3-year ROI (typically 150-400%)
   - Break-even analysis

## 🚀 Deployment

### Vercel (Recommended)

#### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rprovine/hawaii-growth-calculator&env=HUBSPOT_ACCESS_TOKEN,HUBSPOT_PORTAL_ID&envDescription=HubSpot%20API%20credentials%20required&project-name=hawaii-growth-calculator&repository-name=hawaii-growth-calculator)

#### Option 2: CLI Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

#### Option 3: GitHub Integration
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `HUBSPOT_ACCESS_TOKEN` (required)
   - `HUBSPOT_PORTAL_ID` (required)
   - `NEXT_PUBLIC_SITE_URL` (auto-set by Vercel)
5. Click "Deploy"

#### Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

**Required:**
- `HUBSPOT_ACCESS_TOKEN` - Your HubSpot private app token
- `HUBSPOT_PORTAL_ID` - Your HubSpot portal ID

**Optional:**
- `DATABASE_URL` - PostgreSQL connection string (if using database backup)
- `SMTP_*` - Email configuration (see `.env.production`)

#### Custom Domain Setup
1. Go to Project Settings → Domains
2. Add your domain (e.g., `calculator.lenilani.com`)
3. Configure DNS:
   - **CNAME**: `cname.vercel-dns.com` (for subdomains)
   - **A**: `76.76.21.21` (for root domains)

### Railway

1. **Deploy to Railway**
   
   [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/rprovine/hawaii-growth-calculator)

2. **Add PostgreSQL** (if using database)
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will automatically set DATABASE_URL

3. **Configure Environment Variables**
   - Go to Variables tab
   - Add all required environment variables

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Configure reverse proxy** (nginx example)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Set up SSL** with Let's Encrypt
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

### Database Options

1. **PostgreSQL** (Production)
   - [Neon](https://neon.tech) - Serverless Postgres
   - [Supabase](https://supabase.com) - Postgres with built-in auth
   - [Railway](https://railway.app) - Simple PostgreSQL hosting

2. **SQLite** (Development/Small Scale)
   - Update `DATABASE_URL` in `.env.local`:
     ```
     DATABASE_URL="file:./dev.db"
     ```

## 🔑 HubSpot Setup

### Method 1: Private App (Full Integration)

1. **Create Private App**
   - Navigate to: Settings → Integrations → Private Apps
   - Click "Create a private app"
   - Name: "Hawaii Growth Calculator"
   - Add description

2. **Configure Scopes**
   ```
   Required:
   - crm.objects.contacts.read
   - crm.objects.contacts.write
   
   Optional (for enhanced features):
   - crm.objects.notes.write
   - crm.lists.read
   - crm.lists.write
   ```

3. **Copy Access Token**
   - After creation, copy the access token
   - Add to `HUBSPOT_ACCESS_TOKEN` in `.env.local`

4. **Create Custom Properties**
   
   Go to Settings → Properties → Contact Properties and create:
   
   | Property Label | Internal Name | Type | Options |
   |----------------|---------------|------|---------|
   | Hawaii Business Industry | `hawaii_business_industry` | Dropdown | Tourism, Real Estate, Healthcare, etc. |
   | Current Monthly Tech Spend | `current_monthly_tech_spend` | Number | - |
   | Employee Count | `employee_count` | Number | - |
   | Tech Satisfaction Score | `tech_satisfaction_score` | Number | 1-5 scale |
   | Pain Points | `pain_points` | Multi-line text | - |
   | Budget Range | `budget_range` | Dropdown | under-5k, 5k-15k, 15k-25k, over-25k |
   | Implementation Timeline | `implementation_timeline` | Dropdown | immediate, 3-months, 6-months, next-year |
   | Estimated Monthly Savings | `estimated_monthly_savings` | Number | - |
   | Three Year ROI | `three_year_roi` | Number | - |
   | Payback Period Months | `payback_period_months` | Number | - |
   | Calculator Tracking ID | `calculator_tracking_id` | Single-line text | - |
   | Calculator Submission Date | `calculator_submission_date` | Date | - |

### Method 2: Form Submission (Basic)

1. **Create HubSpot Form**
   - Go to Marketing → Forms
   - Create embedded form
   - Add fields: Email, Name, Company, Phone
   - Save and get Form ID

2. **Update Environment Variables**
   ```env
   HUBSPOT_PORTAL_ID="your-portal-id"
   HUBSPOT_FORM_GUID="form-guid-from-embed-code"
   ```

For detailed setup instructions, see [docs/HUBSPOT_SETUP.md](docs/HUBSPOT_SETUP.md)

## 📊 Analytics & Tracking

The calculator tracks key metrics:

1. **Conversion Metrics**
   - Form starts vs completions
   - Drop-off by step
   - Time per step
   - Field validation errors

2. **Lead Quality Metrics**
   - Lead score distribution
   - Industry segmentation
   - Company size analysis
   - Budget range insights

3. **ROI Insights**
   - Average payback period by industry
   - ROI distribution
   - Most common pain points
   - Solution preferences

## 🔐 Security Best Practices

1. **Input Validation**
   - All inputs validated with Zod schemas
   - SQL injection prevention via Prisma
   - XSS protection built into React

2. **API Security**
   - Rate limiting on `/api/calculate`
   - Input sanitization
   - Error message sanitization

3. **Data Protection**
   - Environment variables for secrets
   - No sensitive data in client state
   - Secure HTTPS connections only

4. **HubSpot Security**
   - Private app with minimal scopes
   - Token stored securely in env vars
   - No client-side API calls

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run linting
npm run lint

# Type checking
npm run type-check

# Run all checks
npm run check-all
```

## 🎯 Conversion Optimization Tips

1. **Landing Page**
   - Strong value proposition
   - Social proof (client numbers)
   - Clear CTA above fold
   - Urgency elements

2. **Calculator Flow**
   - Progress indicator
   - Save and resume capability
   - Inline validation
   - Smart defaults

3. **Results Page**
   - Immediate value display
   - Visual ROI representation
   - Clear next steps
   - Multiple CTAs

4. **Follow-up**
   - Instant email with results
   - Scheduled follow-ups
   - Retargeting setup
   - Lead nurturing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic and descriptive
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌴 About LeniLani Consulting

[LeniLani Consulting](https://lenilani.com) is Hawaii's premier AI and technology consulting firm, specializing in:

- **AI Strategy & Implementation**: Custom AI solutions for Hawaii businesses
- **Fractional CTO Services**: Expert technology leadership on demand
- **HubSpot Implementation**: CRM and marketing automation
- **Digital Transformation**: Modernize your business operations
- **Custom Software Development**: Tailored solutions for unique needs

## 📞 Support & Contact

- **Email**: info@lenilani.com
- **Phone**: 815-641-6689
- **Website**: [https://lenilani.com](https://lenilani.com)
- **Calculator**: [https://hawaii.lenilani.com](https://hawaii.lenilani.com)
- **GitHub Issues**: [Report bugs or request features](https://github.com/rprovine/hawaii-growth-calculator/issues)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment platform
- HubSpot for CRM integration capabilities
- shadcn/ui for beautiful component library
- The Hawaii business community for invaluable feedback

---

<p align="center">Made with 🌺 in Hawaii by <a href="https://lenilani.com">LeniLani Consulting</a></p>