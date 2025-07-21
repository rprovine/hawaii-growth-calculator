import { z } from 'zod';

export const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().min(1, 'Please select company size'),
  location: z.string().min(1, 'Please select location'),
  revenueRange: z.string().optional(),
  growthStage: z.string().optional(),
  currentPainPoints: z.array(z.string()).min(1, 'Please select at least one pain point')
});

export const technologyAssessmentSchema = z.object({
  currentTools: z.record(z.string(), z.array(z.object({
    name: z.string(),
    monthlyCost: z.number().min(0),
    satisfaction: z.number().min(1).max(5)
  }))),
  totalMonthlyCost: z.number().min(0),
  satisfactionScores: z.record(z.string(), z.number().min(1).max(5))
});

export const growthGoalsSchema = z.object({
  businessObjectives: z.array(z.string()).min(1, 'Please select at least one objective'),
  techBarriers: z.array(z.string()).min(1, 'Please select at least one barrier'),
  priorityAreas: z.array(z.string()).min(1, 'Please select at least one priority area')
});

export const solutionPreferencesSchema = z.object({
  budgetRange: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  implementationType: z.string().min(1, 'Please select implementation type'),
  decisionMakers: z.array(z.string()).min(1, 'Please select at least one decision maker')
});

export const contactInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^(\+1)?[\s.-]?\(?[0-9]{3}\)?[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/, 'Please enter a valid phone number').optional().or(z.literal('')),
  title: z.string().optional(),
  marketingConsent: z.boolean()
});

export const calculatorDataSchema = z.object({
  companyInfo: companyInfoSchema,
  techAssessment: technologyAssessmentSchema,
  growthGoals: growthGoalsSchema,
  preferences: solutionPreferencesSchema,
  contactInfo: contactInfoSchema
});