# Development Guide

This guide covers local development setup, coding standards, and best practices for the Hawaii Business Growth Calculator.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Development Workflow](#development-workflow)
4. [Project Structure](#project-structure)
5. [Coding Standards](#coding-standards)
6. [Component Development](#component-development)
7. [State Management](#state-management)
8. [Styling Guidelines](#styling-guidelines)
9. [Testing](#testing)
10. [Debugging](#debugging)
11. [Performance Optimization](#performance-optimization)
12. [Common Tasks](#common-tasks)

## Prerequisites

### Required Software

- **Node.js**: Version 18.17.0 or higher
  ```bash
  node --version  # Should output v18.17.0 or higher
  ```

- **Package Manager**: npm, yarn, or pnpm
  ```bash
  npm --version   # 9.0.0 or higher
  yarn --version  # 1.22.0 or higher
  pnpm --version  # 8.0.0 or higher
  ```

- **Git**: For version control
  ```bash
  git --version   # 2.0.0 or higher
  ```

### Recommended Tools

- **VS Code**: With extensions
  - ESLint
  - Prettier
  - TypeScript Vue Plugin
  - Tailwind CSS IntelliSense
  - Prisma

- **Browser Extensions**:
  - React Developer Tools
  - Redux DevTools (for Zustand)

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/rprovine/hawaii-growth-calculator.git
cd hawaii-growth-calculator
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

```bash
# Copy example environment file
cp .env.example .env.local

# Edit with your values
nano .env.local
```

Minimum required for development:
```env
HUBSPOT_ACCESS_TOKEN="your-sandbox-token"
HUBSPOT_PORTAL_ID="your-sandbox-portal"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Database Setup (Optional)

If using database for lead backup:

```bash
# Generate Prisma client
npx prisma generate

# Create database schema
npx prisma db push

# View database
npx prisma studio
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Development Workflow

### Branch Strategy

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Create bugfix branch
git checkout -b fix/bug-description

# Create hotfix branch
git checkout -b hotfix/urgent-fix
```

### Commit Convention

Follow conventional commits:

```bash
# Features
git commit -m "feat: add ROI calculation chart"

# Bug fixes
git commit -m "fix: resolve email validation error"

# Documentation
git commit -m "docs: update API documentation"

# Style changes
git commit -m "style: format calculator components"

# Refactoring
git commit -m "refactor: simplify calculation logic"

# Tests
git commit -m "test: add unit tests for calculator"

# Chores
git commit -m "chore: update dependencies"
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Run tests and linting
4. Push to GitHub
5. Create PR with description
6. Address review comments
7. Merge after approval

## Project Structure

```
hawaii-growth-calculator/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public routes group
│   │   ├── calculator/      # Calculator page
│   │   │   └── page.tsx    # /calculator route
│   │   ├── layout.tsx      # Public layout wrapper
│   │   └── page.tsx        # Landing page
│   ├── api/                 # API routes
│   │   └── calculate/       # Calculation endpoint
│   │       └── route.ts    # POST /api/calculate
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   └── favicon.ico         # Site favicon
│
├── components/              # React components
│   ├── calculator/         # Calculator-specific
│   │   ├── CalculatorWrapper.tsx
│   │   ├── ProgressBar.tsx
│   │   └── steps/         # Form step components
│   │       ├── CompanyInfoStep.tsx
│   │       ├── TechAssessmentStep.tsx
│   │       ├── GrowthGoalsStep.tsx
│   │       ├── PreferencesStep.tsx
│   │       └── ContactStep.tsx
│   └── ui/                # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
│
├── lib/                    # Utility libraries
│   ├── calculations/      # Business logic
│   │   └── calculator-engine.ts
│   ├── hubspot.ts        # HubSpot integration
│   ├── email.ts          # Email service
│   ├── prisma.ts         # Database client
│   ├── utils.ts          # Helper functions
│   └── validations/      # Zod schemas
│       └── calculator.ts
│
├── hooks/                 # Custom React hooks
│   └── useCalculatorStore.ts
│
├── types/                 # TypeScript definitions
│   └── calculator.ts
│
├── prisma/               # Database schema
│   └── schema.prisma
│
├── public/               # Static assets
│   └── images/
│
└── docs/                 # Documentation
    ├── API.md
    ├── DEPLOYMENT.md
    └── DEVELOPMENT.md
```

## Coding Standards

### TypeScript

```typescript
// Use explicit types
interface CalculatorProps {
  onComplete: (data: CalculatorData) => void;
  initialData?: Partial<CalculatorData>;
}

// Use enums for constants
enum Industry {
  Tourism = "tourism",
  RealEstate = "real_estate",
  Healthcare = "healthcare"
}

// Prefer const assertions
const BUDGET_RANGES = {
  UNDER_5K: "under-5k",
  BETWEEN_5K_15K: "5k-15k",
  OVER_15K: "over-15k"
} as const;

// Use type for unions
type BudgetRange = typeof BUDGET_RANGES[keyof typeof BUDGET_RANGES];
```

### React Components

```typescript
// Functional components with TypeScript
interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ 
  variant = "primary", 
  size = "md", 
  children, 
  onClick 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md font-medium",
        variants[variant],
        sizes[size]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Use custom hooks for logic
function useCalculatorLogic() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<CalculatorData>();
  
  const nextStep = useCallback(() => {
    setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  }, []);
  
  return { step, data, nextStep };
}
```

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE`

## Component Development

### Creating New Components

1. **Create component file**
   ```bash
   touch components/calculator/NewFeature.tsx
   ```

2. **Basic structure**
   ```typescript
   import { FC } from 'react';
   import { cn } from '@/lib/utils';
   
   interface NewFeatureProps {
     className?: string;
   }
   
   export const NewFeature: FC<NewFeatureProps> = ({ 
     className 
   }) => {
     return (
       <div className={cn("", className)}>
         {/* Component content */}
       </div>
     );
   };
   ```

3. **Add to parent component**
   ```typescript
   import { NewFeature } from './NewFeature';
   ```

### Using UI Components

```typescript
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function MyForm() {
  return (
    <Card className="p-6">
      <Input 
        placeholder="Enter your name"
        onChange={(e) => console.log(e.target.value)}
      />
      <Button onClick={() => console.log("Clicked")}>
        Submit
      </Button>
    </Card>
  );
}
```

## State Management

### Zustand Store

```typescript
// hooks/useCalculatorStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CalculatorStore {
  // State
  currentStep: number;
  data: Partial<CalculatorData>;
  
  // Actions
  setStep: (step: number) => void;
  updateData: (data: Partial<CalculatorData>) => void;
  reset: () => void;
}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      data: {},
      
      setStep: (step) => set({ currentStep: step }),
      updateData: (newData) => set((state) => ({ 
        data: { ...state.data, ...newData } 
      })),
      reset: () => set({ currentStep: 1, data: {} })
    }),
    {
      name: 'calculator-storage',
    }
  )
);
```

### Using the Store

```typescript
function CalculatorStep() {
  const { currentStep, data, updateData } = useCalculatorStore();
  
  const handleSubmit = (formData: StepData) => {
    updateData(formData);
    // Continue...
  };
  
  return <div>Step {currentStep}</div>;
}
```

## Styling Guidelines

### Tailwind CSS

```typescript
// Use Tailwind utilities
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <Button className="ml-4">Action</Button>
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid items */}
</div>

// Dark mode support
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

### Component Variants

```typescript
// Using cva for variants
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 hover:bg-gray-50",
        ghost: "hover:bg-gray-100"
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
```

## Testing

### Unit Tests

```typescript
// __tests__/calculator-engine.test.ts
import { calculateROI } from '@/lib/calculations/calculator-engine';

describe('Calculator Engine', () => {
  it('calculates ROI correctly', () => {
    const result = calculateROI({
      monthlySpend: 5000,
      employeeCount: '11-50',
      industry: 'tourism'
    });
    
    expect(result.monthlyInvestment).toBeGreaterThan(0);
    expect(result.paybackPeriodMonths).toBeLessThan(24);
  });
});
```

### Integration Tests

```typescript
// __tests__/api/calculate.test.ts
import { POST } from '@/app/api/calculate/route';

describe('API /calculate', () => {
  it('processes valid request', async () => {
    const request = new Request('http://localhost:3000/api/calculate', {
      method: 'POST',
      body: JSON.stringify(validCalculatorData)
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Debugging

### Console Debugging

```typescript
// Add debug logging
if (process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
  console.log('Calculator data:', data);
  console.log('Calculation results:', results);
}
```

### React DevTools

1. Install browser extension
2. Open DevTools → Components tab
3. Inspect component props and state
4. Use Profiler for performance

### Network Debugging

```typescript
// Log API requests
export async function calculateROI(data: CalculatorData) {
  console.log('API Request:', data);
  
  const response = await fetch('/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  console.log('API Response:', result);
  
  return result;
}
```

## Performance Optimization

### Code Splitting

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const ChartComponent = dynamic(
  () => import('./ChartComponent'),
  { 
    loading: () => <div>Loading chart...</div>,
    ssr: false 
  }
);
```

### Memoization

```typescript
// Memoize expensive calculations
import { useMemo } from 'react';

function ResultsDisplay({ data }: { data: CalculatorData }) {
  const results = useMemo(() => {
    return calculateComplexROI(data);
  }, [data]);
  
  return <div>{results.roi}%</div>;
}

// Memoize components
import { memo } from 'react';

export const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* Complex rendering */}</div>;
});
```

### Image Optimization

```typescript
import Image from 'next/image';

export function HeroImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hawaii Business"
      width={1200}
      height={600}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

## Common Tasks

### Adding a New Form Step

1. **Create step component**
   ```bash
   touch components/calculator/steps/NewStep.tsx
   ```

2. **Define step structure**
   ```typescript
   export function NewStep({ onNext }: StepProps) {
     const form = useForm<NewStepData>();
     
     const onSubmit = (data: NewStepData) => {
       onNext(data);
     };
     
     return (
       <form onSubmit={form.handleSubmit(onSubmit)}>
         {/* Form fields */}
       </form>
     );
   }
   ```

3. **Add to calculator flow**
   ```typescript
   const STEPS = [
     CompanyInfoStep,
     TechAssessmentStep,
     NewStep, // Add here
     GrowthGoalsStep,
     // ...
   ];
   ```

### Updating Calculations

1. **Modify calculation engine**
   ```typescript
   // lib/calculations/calculator-engine.ts
   export function calculateROI(data: CalculatorData) {
     // Add new calculation logic
     const newFactor = data.newField * 1.5;
     
     return {
       ...existingResults,
       newMetric: newFactor
     };
   }
   ```

2. **Update types**
   ```typescript
   // types/calculator.ts
   export interface CalculationResults {
     // ... existing fields
     newMetric: number;
   }
   ```

### Adding HubSpot Properties

1. **Update HubSpot service**
   ```typescript
   // lib/hubspot.ts
   const properties = {
     // ... existing properties
     new_custom_property: data.newField
   };
   ```

2. **Document in HubSpot setup**
   ```markdown
   // docs/HUBSPOT_SETUP.md
   | New Property | `new_custom_property` | Text | Description |
   ```

## Troubleshooting Development Issues

### Common Issues

**Port already in use**
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

**Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Restart TS server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

**Prisma client issues**
```bash
# Regenerate client
npx prisma generate
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Prisma Docs](https://www.prisma.io/docs)

## Getting Help

- GitHub Issues: [Report bugs](https://github.com/rprovine/hawaii-growth-calculator/issues)
- Discord: Join our developer community
- Email: dev-support@lenilani.com