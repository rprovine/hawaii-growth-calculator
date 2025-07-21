export interface CompanyInfo {
  companyName: string;
  industry: string;
  companySize: string;
  location: string;
  revenueRange?: string;
  growthStage?: string;
  currentPainPoints: string[];
}

export interface TechnologyAssessment {
  currentTools: {
    [category: string]: {
      name: string;
      monthlyCost: number;
      satisfaction: number;
    }[];
  };
  totalMonthlyCost: number;
  satisfactionScores: {
    [category: string]: number;
  };
}

export interface GrowthGoals {
  businessObjectives: string[];
  techBarriers: string[];
  priorityAreas: string[];
}

export interface SolutionPreferences {
  budgetRange: string;
  timeline: string;
  implementationType: string;
  decisionMakers: string[];
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  marketingConsent: boolean;
}

export interface CalculatorData {
  companyInfo: CompanyInfo;
  techAssessment: TechnologyAssessment;
  growthGoals: GrowthGoals;
  preferences: SolutionPreferences;
  contactInfo: ContactInfo;
}

export interface CalculationResults {
  recommendedSolution: {
    title: string;
    description: string;
    features: string[];
    benefits: string[];
  };
  financials: {
    estimatedMonthlySavings: number;
    estimatedAnnualSavings: number;
    implementationCost: number;
    monthlyInvestment: number;
    paybackPeriodMonths: number;
    threeYearROI: number;
    totalValue: number;
  };
  competitiveAnalysis: {
    vsEnterprise: {
      costDifference: number;
      timeToImplement: string;
      flexibility: string;
    };
    vsStatusQuo: {
      efficiencyGains: number;
      growthPotential: number;
      riskReduction: number;
    };
  };
  timeline: {
    phase: string;
    duration: string;
    milestones: string[];
  }[];
}

export const INDUSTRIES = [
  'Tourism & Hospitality',
  'Real Estate',
  'Healthcare',
  'Retail & E-commerce',
  'Professional Services',
  'Construction',
  'Agriculture',
  'Education',
  'Non-profit',
  'Government',
  'Finance & Insurance',
  'Manufacturing',
  'Technology',
  'Other'
] as const;

export const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-100', label: '51-100 employees' },
  { value: '100+', label: '100+ employees' }
] as const;

export const HAWAII_LOCATIONS = [
  'Oahu - Honolulu',
  'Oahu - Other',
  'Maui',
  'Big Island - Kona',
  'Big Island - Hilo',
  'Kauai',
  'Molokai',
  'Lanai',
  'Multiple Islands'
] as const;

export const REVENUE_RANGES = [
  { value: 'under-500k', label: 'Under $500K' },
  { value: '500k-1m', label: '$500K - $1M' },
  { value: '1m-5m', label: '$1M - $5M' },
  { value: '5m-10m', label: '$5M - $10M' },
  { value: '10m-50m', label: '$10M - $50M' },
  { value: '50m+', label: '$50M+' }
] as const;

export const GROWTH_STAGES = [
  { value: 'startup', label: 'Startup (0-2 years)' },
  { value: 'growth', label: 'Growth (2-5 years)' },
  { value: 'established', label: 'Established (5-10 years)' },
  { value: 'enterprise', label: 'Enterprise (10+ years)' }
] as const;

export const PAIN_POINTS = [
  'High software costs',
  'Disconnected systems',
  'Manual processes',
  'Limited automation',
  'Poor data insights',
  'Scalability issues',
  'Customer experience gaps',
  'Compliance challenges',
  'Remote work limitations',
  'Security concerns',
  'Staff productivity',
  'Integration problems'
] as const;

export const BUSINESS_OBJECTIVES = [
  'Increase revenue',
  'Reduce operational costs',
  'Improve customer experience',
  'Scale operations',
  'Enter new markets',
  'Improve data insights',
  'Automate workflows',
  'Enhance security',
  'Improve team collaboration',
  'Streamline compliance',
  'Digital transformation',
  'Competitive advantage'
] as const;

export const TECH_BARRIERS = [
  'Budget constraints',
  'Lack of technical expertise',
  'Change resistance',
  'Integration complexity',
  'Time constraints',
  'Vendor lock-in',
  'Data migration concerns',
  'Security requirements',
  'Compliance requirements',
  'Limited IT resources'
] as const;

export const PRIORITY_AREAS = [
  'Sales & Marketing',
  'Customer Service',
  'Operations',
  'Finance & Accounting',
  'HR & Payroll',
  'Inventory Management',
  'Data Analytics',
  'Communication',
  'Project Management',
  'E-commerce',
  'Security',
  'Compliance'
] as const;

export const BUDGET_RANGES = [
  { value: 'under-5k', label: 'Under $5K/month' },
  { value: '5k-15k', label: '$5K - $15K/month' },
  { value: '15k-50k', label: '$15K - $50K/month' },
  { value: '50k+', label: '$50K+/month' }
] as const;

export const TIMELINES = [
  { value: 'immediate', label: 'Immediate (< 1 month)' },
  { value: '3-months', label: 'Next 3 months' },
  { value: '6-months', label: 'Next 6 months' },
  { value: '12-months', label: 'Next 12 months' }
] as const;

export const IMPLEMENTATION_TYPES = [
  { value: 'diy', label: 'DIY with support' },
  { value: 'guided', label: 'Guided implementation' },
  { value: 'full-service', label: 'Full-service implementation' }
] as const;

export const DECISION_MAKERS = [
  'CEO/Owner',
  'CFO',
  'CTO/IT Director',
  'COO',
  'Department Head',
  'Board of Directors',
  'External Consultant'
] as const;