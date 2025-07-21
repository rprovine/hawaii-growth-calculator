import type { CalculatorData, CalculationResults, CompanyInfo, GrowthGoals } from '@/types/calculator';

// Hawaii-specific market factors
const HAWAII_MARKET_FACTORS = {
  costPremium: 1.10, // Hawaii costs are typically 10% higher than mainland
  implementationSpeed: 0.90, // Implementation can be 10% slower due to logistics
  localSupportValue: 1.35, // Local support is valued 35% higher
  remoteWorkAdoption: 1.4, // Higher remote work adoption post-COVID
  tourismDependency: 0.7, // 70% of businesses affected by tourism fluctuations
  overheadMultiplier: 1.0, // No additional overhead - we optimize for Hawaii
  laborCostPremium: 1.25, // Hawaii labor costs are 25% higher - savings are more valuable
};

// Industry-specific benchmarks for Hawaii
const INDUSTRY_BENCHMARKS = {
  'Tourism & Hospitality': {
    techSpendPercent: 0.035, // 3.5% of revenue
    efficiencyPotential: 0.28, // 28% efficiency gains possible
    avgSavings: 0.22, // 22% cost savings
    implementationMonths: 3,
  },
  'Real Estate': {
    techSpendPercent: 0.025,
    efficiencyPotential: 0.25,
    avgSavings: 0.20,
    implementationMonths: 3,
  },
  'Healthcare': {
    techSpendPercent: 0.045,
    efficiencyPotential: 0.20,
    avgSavings: 0.16,
    implementationMonths: 5,
  },
  'Retail & E-commerce': {
    techSpendPercent: 0.04,
    efficiencyPotential: 0.35,
    avgSavings: 0.28,
    implementationMonths: 2,
  },
  'Professional Services': {
    techSpendPercent: 0.03,
    efficiencyPotential: 0.32,
    avgSavings: 0.25,
    implementationMonths: 2,
  },
  'Construction': {
    techSpendPercent: 0.02,
    efficiencyPotential: 0.20,
    avgSavings: 0.15,
    implementationMonths: 4,
  },
  'Agriculture': {
    techSpendPercent: 0.015,
    efficiencyPotential: 0.22,
    avgSavings: 0.18,
    implementationMonths: 5,
  },
  'Education': {
    techSpendPercent: 0.035,
    efficiencyPotential: 0.14,
    avgSavings: 0.08,
    implementationMonths: 7,
  },
  'Non-profit': {
    techSpendPercent: 0.025,
    efficiencyPotential: 0.25,
    avgSavings: 0.20,
    implementationMonths: 3,
  },
  'Government': {
    techSpendPercent: 0.03,
    efficiencyPotential: 0.10,
    avgSavings: 0.06,
    implementationMonths: 12,
  },
  'Finance & Insurance': {
    techSpendPercent: 0.05,
    efficiencyPotential: 0.16,
    avgSavings: 0.12,
    implementationMonths: 8,
  },
  'Manufacturing': {
    techSpendPercent: 0.025,
    efficiencyPotential: 0.18,
    avgSavings: 0.14,
    implementationMonths: 9,
  },
  'Technology': {
    techSpendPercent: 0.08,
    efficiencyPotential: 0.18,
    avgSavings: 0.15,
    implementationMonths: 2,
  },
  'Other': {
    techSpendPercent: 0.03,
    efficiencyPotential: 0.20,
    avgSavings: 0.16,
    implementationMonths: 4,
  },
};

// Size-based multipliers
const SIZE_MULTIPLIERS = {
  '1-10': { cost: 1, complexity: 1, timeline: 1 },
  '11-50': { cost: 1.5, complexity: 1.3, timeline: 1.2 },
  '51-100': { cost: 2.2, complexity: 1.8, timeline: 1.5 },
  '100+': { cost: 3.5, complexity: 2.5, timeline: 2 },
};

// Budget to implementation mapping
const BUDGET_IMPLEMENTATION_MAP = {
  'under-5k': {
    solutionType: 'Essential Hawaii Business Suite',
    features: [
      'Core CRM & customer management',
      'Basic automation workflows',
      'Financial tracking & reporting',
      'Email marketing tools',
      'Local payment processing',
      'Mobile-first design',
    ],
    monthlyInvestment: 950,
  },
  '5k-15k': {
    solutionType: 'Hawaii Growth Accelerator Platform',
    features: [
      'Advanced CRM with AI insights',
      'Marketing automation suite',
      'Inventory & supply chain management',
      'Advanced analytics & BI',
      'Multi-location support',
      'Custom integrations',
      'Priority local support',
    ],
    monthlyInvestment: 2500,
  },
  '15k-50k': {
    solutionType: 'Enterprise Hawaii Solution',
    features: [
      'Full enterprise CRM',
      'Complete automation platform',
      'Advanced AI & predictive analytics',
      'Custom application development',
      'Dedicated implementation team',
      'White-glove onboarding',
      '24/7 priority support',
      'Compliance & security suite',
    ],
    monthlyInvestment: 5500,
  },
  '50k+': {
    solutionType: 'Custom Enterprise Transformation',
    features: [
      'Fully customized platform',
      'Enterprise architecture design',
      'Complete digital transformation',
      'Dedicated development team',
      'Executive consulting',
      'Change management program',
      'Unlimited scaling',
      'White-label options',
    ],
    monthlyInvestment: 12000,
  },
};

export function calculateResults(data: CalculatorData): CalculationResults {
  const { companyInfo, techAssessment, growthGoals, preferences } = data;
  
  // Get industry benchmarks
  const industryBenchmark = INDUSTRY_BENCHMARKS[companyInfo.industry as keyof typeof INDUSTRY_BENCHMARKS] 
    || INDUSTRY_BENCHMARKS.Other;
  
  // Get size multipliers
  const sizeMultiplier = SIZE_MULTIPLIERS[companyInfo.companySize as keyof typeof SIZE_MULTIPLIERS] 
    || SIZE_MULTIPLIERS['1-10'];
  
  // Get solution details
  const baseSolution = BUDGET_IMPLEMENTATION_MAP[preferences.budgetRange as keyof typeof BUDGET_IMPLEMENTATION_MAP] 
    || BUDGET_IMPLEMENTATION_MAP['under-5k'];
  
  // Calculate current monthly tech spend based on tech budget percentage and company size
  const currentMonthlyCost = estimateMonthlyTechSpend(
    techAssessment,
    companyInfo.companySize || '1-10',
    companyInfo.revenueRange
  );
  
  // Check if this is a micro-business (under $1000/month tech spend)
  const isMicroBusiness = currentMonthlyCost < 1000;
  
  // Calculate scaled monthly investment
  let scaledMonthlyInvestment = baseSolution.monthlyInvestment;
  let solutionName = baseSolution.solutionType;
  let features = [...baseSolution.features];
  
  if (isMicroBusiness) {
    // DIY Starter Kit for micro-businesses
    scaledMonthlyInvestment = 99; // $99/month
    solutionName = 'Hawaii DIY Digital Transformation Kit';
    features = [
      'Self-paced implementation guides',
      'Pre-configured tool templates',
      'Video training library (Hawaii-specific)',
      'Monthly group coaching calls',
      'Community support forum',
      'Basic email support',
      'Quarterly strategy reviews',
      'Local vendor recommendations',
    ];
  }
  // For small businesses, cap solution cost at 50% of current spend
  else if (currentMonthlyCost < 2000) {
    scaledMonthlyInvestment = Math.min(
      baseSolution.monthlyInvestment,
      Math.max(currentMonthlyCost * 0.5, 299) // Minimum $299
    );
    if (scaledMonthlyInvestment < baseSolution.monthlyInvestment * 0.6) {
      solutionName = 'Hawaii Business Starter Package';
    }
  }
  // For medium businesses, cap at 75% of current spend
  else if (currentMonthlyCost < 5000) {
    scaledMonthlyInvestment = Math.min(
      baseSolution.monthlyInvestment,
      currentMonthlyCost * 0.75
    );
    if (scaledMonthlyInvestment < baseSolution.monthlyInvestment * 0.8) {
      solutionName = 'Hawaii Business Growth Package';
    }
  }
  
  const solution = {
    ...baseSolution,
    solutionType: solutionName,
    features: features,
    monthlyInvestment: Math.round(scaledMonthlyInvestment)
  };
  
  // Calculate current inefficiency cost
  const avgSatisfaction = calculateAverageSatisfaction(techAssessment.satisfactionScores || {});
  const inefficiencyMultiplier = (5 - avgSatisfaction) / 5; // Lower satisfaction = higher inefficiency
  const inefficiencyCost = currentMonthlyCost * inefficiencyMultiplier * 0.35; // 35% max inefficiency
  
  // Calculate efficiency gains first
  const efficiencyGains = industryBenchmark.efficiencyPotential * 
    (1 + (growthGoals.priorityAreas?.length || 0) * 0.01); // 1% per priority area
  
  // Calculate potential savings
  const baseSavingsPercent = industryBenchmark.avgSavings;
  const painPointMultiplier = 1 + (companyInfo.currentPainPoints?.length || 0) * 0.04; // 4% per pain point
  const adjustedSavingsPercent = Math.min(baseSavingsPercent * painPointMultiplier, 0.40); // Cap at 40%
  
  const monthlySavings = (currentMonthlyCost + inefficiencyCost) * adjustedSavingsPercent;
  // Account for ramp-up time and Hawaii-specific overhead
  const adjustedMonthlySavings = monthlySavings * 0.90; // 10% reduction for conservative estimate
  
  // Also factor in revenue growth potential from efficiency gains
  const revenueGrowthFactor = 1 + (efficiencyGains * 0.7); // 70% of efficiency converts to revenue growth
  const revenueImpact = currentMonthlyCost * 0.25 * revenueGrowthFactor; // Assume 25% revenue increase potential
  
  // Factor in labor cost savings from automation (Hawaii premium makes this more valuable)
  const laborSavings = currentMonthlyCost * 0.20 * HAWAII_MARKET_FACTORS.laborCostPremium; // 20% labor savings with 25% Hawaii premium
  
  const totalMonthlySavings = adjustedMonthlySavings + revenueImpact + laborSavings;
  const netMonthlySavings = totalMonthlySavings - solution.monthlyInvestment;
  
  // Calculate implementation cost
  const baseImplementationCost = solution.monthlyInvestment * 1; // 1 month base
  const implementationCost = baseImplementationCost * sizeMultiplier.cost * HAWAII_MARKET_FACTORS.costPremium;
  
  // Calculate timeline
  const baseMonths = industryBenchmark.implementationMonths;
  const timelineMonths = Math.ceil(baseMonths * sizeMultiplier.timeline);
  
  // Calculate payback period
  const totalInvestment = implementationCost + (solution.monthlyInvestment * 2); // Include first 2 months
  const paybackMonths = netMonthlySavings > 0 
    ? Math.ceil(totalInvestment / netMonthlySavings) 
    : 999; // Never if no savings
  
  // Calculate 3-year ROI
  const threeYearGrossSavings = totalMonthlySavings * 36;
  const threeYearInvestment = implementationCost + (solution.monthlyInvestment * 36);
  const threeYearNetBenefit = threeYearGrossSavings - threeYearInvestment;
  const threeYearROI = (threeYearNetBenefit / threeYearInvestment) * 100;
  
  // Generate timeline based on company size and preferences
  const timeline = generateImplementationTimeline(
    timelineMonths,
    preferences.implementationType || 'guided',
    companyInfo.companySize || '1-10'
  );
  
  return {
    recommendedSolution: {
      title: solution.solutionType,
      description: getCustomDescription(
        solution.solutionType,
        companyInfo.industry || 'Other',
        companyInfo.location || 'Oahu'
      ),
      features: solution.features,
      benefits: generateBenefits(
        companyInfo,
        growthGoals,
        efficiencyGains,
        adjustedSavingsPercent
      ),
    },
    financials: {
      estimatedMonthlySavings: Math.round(totalMonthlySavings),
      estimatedAnnualSavings: Math.round(totalMonthlySavings * 12),
      implementationCost: Math.round(implementationCost),
      monthlyInvestment: solution.monthlyInvestment,
      paybackPeriodMonths: paybackMonths,
      threeYearROI: Math.round(threeYearROI),
      totalValue: Math.round(threeYearNetBenefit),
    },
    competitiveAnalysis: {
      vsEnterprise: {
        costDifference: -65, // 65% less than enterprise solutions
        timeToImplement: `${timelineMonths} months vs ${timelineMonths * 3} months`,
        flexibility: 'High - Hawaii-focused vs Generic',
      },
      vsStatusQuo: {
        efficiencyGains: Math.round(efficiencyGains * 100),
        growthPotential: Math.round(efficiencyGains * 150), // 1.5x efficiency = growth
        riskReduction: Math.round(adjustedSavingsPercent * 200), // Risk reduction correlates with savings
      },
    },
    timeline,
  };
}

function calculateAverageSatisfaction(scores: Record<string, number>): number {
  const values = Object.values(scores);
  if (values.length === 0) return 3; // Default to neutral
  return values.reduce((sum, score) => sum + score, 0) / values.length;
}

function estimateMonthlyTechSpend(
  techAssessment: any,
  companySize: string,
  revenueRange?: string
): number {
  // If totalMonthlyCost is provided, use it
  if (techAssessment.totalMonthlyCost) {
    return techAssessment.totalMonthlyCost;
  }
  
  // Otherwise, estimate based on tech budget percentage and company size
  const budgetPercentageMap: Record<string, number> = {
    'less_than_1': 0.005,    // 0.5% of revenue
    '1_to_3': 0.02,          // 2% of revenue
    '3_to_5': 0.04,          // 4% of revenue
    'more_than_5': 0.06,     // 6% of revenue
  };
  
  const revenueRangeMap: Record<string, number> = {
    'under-250k': 150000,     // Use midpoint
    '250k-500k': 375000,
    '500k-1m': 750000,
    '1m-5m': 3000000,
    '5m-10m': 7500000,
    '10m-25m': 17500000,
    'over-25m': 35000000,
  };
  
  const companySizeMap: Record<string, number> = {
    '1-10': 500,      // Base spend for micro businesses
    '11-50': 2500,    // Base spend for small businesses
    '51-200': 7500,   // Base spend for medium businesses
    '201-500': 15000, // Base spend for larger businesses
    '500+': 30000,    // Base spend for enterprise
  };
  
  // Get base spend from company size
  let baseSpend = companySizeMap[companySize] || 1000;
  
  // If we have revenue range and budget percentage, calculate more accurately
  if (revenueRange && techAssessment.techBudgetPercentage) {
    const estimatedRevenue = revenueRangeMap[revenueRange] || 1000000;
    const budgetPercent = budgetPercentageMap[techAssessment.techBudgetPercentage] || 0.02;
    const annualTechBudget = estimatedRevenue * budgetPercent;
    baseSpend = annualTechBudget / 12; // Monthly
  }
  
  // Adjust based on current software usage
  if (techAssessment.currentSoftware && Array.isArray(techAssessment.currentSoftware)) {
    const softwareCount = techAssessment.currentSoftware.length;
    const avgCostPerSoftware = 200; // Average $200 per software tool
    const estimatedFromSoftware = softwareCount * avgCostPerSoftware;
    
    // Use the higher of the two estimates
    baseSpend = Math.max(baseSpend, estimatedFromSoftware);
  }
  
  // Hawaii premium adjustment (costs are higher in Hawaii)
  return Math.round(baseSpend * HAWAII_MARKET_FACTORS.costPremium);
}

function getCustomDescription(
  solutionType: string,
  industry: string,
  location: string
): string {
  const locationName = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
  const industryName = industry.toLowerCase().replace(' & ', ' and ');
  
  const descriptions: Record<string, string> = {
    'Hawaii DIY Digital Transformation Kit':
      `Perfect for growing ${industryName} businesses in ${locationName}. This self-service kit provides essential tools, templates, and training to modernize your operations at your own pace while keeping costs minimal.`,
    'Hawaii Business Starter Package':
      `Ideal for small ${industryName} businesses in ${locationName} ready to digitize. Core tools with guided implementation help you streamline operations and improve efficiency without breaking the budget.`,
    'Hawaii Business Growth Package':
      `Designed for expanding ${industryName} companies in ${locationName}. Comprehensive tools with professional support to scale your operations and compete more effectively in the local market.`,
    'Essential Hawaii Business Suite': 
      `Perfect for growing ${industryName} businesses in ${locationName}. This suite provides core tools to streamline operations, improve customer relationships, and boost efficiency while keeping costs manageable.`,
    'Hawaii Growth Accelerator Platform': 
      `Designed for established ${industryName} companies ready to scale across Hawaii. Advanced automation and AI-powered insights help you compete with larger competitors while maintaining local agility.`,
    'Enterprise Hawaii Solution': 
      `Comprehensive platform for large ${industryName} organizations in ${locationName}. Full digital transformation with enterprise features tailored to Hawaii's unique business environment.`,
    'Custom Enterprise Transformation': 
      `Bespoke solution for ${industryName} leaders in Hawaii. Complete digital ecosystem designed around your specific needs with unlimited customization and scaling potential.`,
  };
  
  return descriptions[solutionType] || descriptions['Essential Hawaii Business Suite'];
}

function generateBenefits(
  companyInfo: Partial<CompanyInfo>,
  growthGoals: Partial<GrowthGoals>,
  efficiencyGains: number,
  savingsPercent: number
): string[] {
  const benefits: string[] = [];
  
  // Always include these core benefits
  benefits.push(`${Math.round(efficiencyGains * 100)}% increase in operational efficiency`);
  benefits.push(`${Math.round(savingsPercent * 100)}% reduction in technology costs`);
  benefits.push('Local Hawaii-based support team');
  
  // Add benefits based on pain points
  if (companyInfo.currentPainPoints?.includes('High software costs')) {
    benefits.push('Consolidated platform reducing vendor costs');
  }
  if (companyInfo.currentPainPoints?.includes('Manual processes')) {
    benefits.push('Automated workflows saving 10+ hours per week');
  }
  if (companyInfo.currentPainPoints?.includes('Poor data insights')) {
    benefits.push('Real-time dashboards for data-driven decisions');
  }
  
  // Add benefits based on objectives
  if (growthGoals.businessObjectives?.includes('Scale operations')) {
    benefits.push('Scalable infrastructure for multi-island expansion');
  }
  if (growthGoals.businessObjectives?.includes('Improve customer experience')) {
    benefits.push('Omnichannel customer engagement tools');
  }
  
  // Industry-specific benefits
  if (companyInfo.industry === 'Tourism & Hospitality') {
    benefits.push('Tourism-specific booking and guest management');
  }
  if (companyInfo.industry === 'Real Estate') {
    benefits.push('MLS integration and property management tools');
  }
  
  return benefits.slice(0, 6); // Return top 6 benefits
}

function generateImplementationTimeline(
  totalMonths: number,
  implementationType: string,
  companySize: string
): CalculationResults['timeline'] {
  const phases: CalculationResults['timeline'] = [];
  
  // Phase 1: Discovery & Planning
  phases.push({
    phase: 'Discovery & Planning',
    duration: implementationType === 'full-service' ? '2 weeks' : '1 week',
    milestones: [
      'Business process analysis',
      'Technical requirements gathering',
      'Stakeholder alignment',
      'Project roadmap creation',
    ],
  });
  
  // Phase 2: Setup & Configuration
  const setupWeeks = companySize === '100+' ? 4 : companySize === '51-100' ? 3 : 2;
  phases.push({
    phase: 'Setup & Configuration',
    duration: `${setupWeeks} weeks`,
    milestones: [
      'Platform provisioning',
      'Initial configuration',
      'Data migration planning',
      'Integration setup',
    ],
  });
  
  // Phase 3: Implementation & Training
  const implWeeks = Math.max(totalMonths - 1, 1) * 3;
  phases.push({
    phase: 'Implementation & Training',
    duration: `${implWeeks} weeks`,
    milestones: [
      'Core features deployment',
      'Staff training sessions',
      'Process optimization',
      'Testing & refinement',
    ],
  });
  
  // Phase 4: Go-Live & Support
  phases.push({
    phase: 'Go-Live & Support',
    duration: '2 weeks',
    milestones: [
      'Production launch',
      'Performance monitoring',
      'Issue resolution',
      'Success measurement',
    ],
  });
  
  return phases;
}