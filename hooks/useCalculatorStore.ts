import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  CompanyInfo, 
  TechnologyAssessment, 
  GrowthGoals, 
  SolutionPreferences, 
  ContactInfo,
  CalculationResults
} from '@/types/calculator';

interface CalculatorStore {
  currentStep: number;
  companyInfo: Partial<CompanyInfo>;
  techAssessment: Partial<TechnologyAssessment>;
  growthGoals: Partial<GrowthGoals>;
  preferences: Partial<SolutionPreferences>;
  contactInfo: Partial<ContactInfo>;
  results: CalculationResults | null;
  sessionId: string;
  startTime: number;
  
  setCurrentStep: (step: number) => void;
  setCompanyInfo: (data: Partial<CompanyInfo>) => void;
  setTechAssessment: (data: Partial<TechnologyAssessment>) => void;
  setGrowthGoals: (data: Partial<GrowthGoals>) => void;
  setPreferences: (data: Partial<SolutionPreferences>) => void;
  setContactInfo: (data: Partial<ContactInfo>) => void;
  setResults: (results: CalculationResults) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetCalculator: () => void;
  getCompletionTime: () => number;
}

const generateSessionId = () => {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const initialState = {
  currentStep: 1,
  companyInfo: {
    currentPainPoints: []
  },
  techAssessment: {
    currentTools: {},
    totalMonthlyCost: 0,
    satisfactionScores: {}
  },
  growthGoals: {
    businessObjectives: [],
    techBarriers: [],
    priorityAreas: []
  },
  preferences: {
    decisionMakers: []
  },
  contactInfo: {},
  results: null,
  sessionId: generateSessionId(),
  startTime: Date.now()
};

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setCompanyInfo: (data) => set((state) => ({
        companyInfo: { ...state.companyInfo, ...data }
      })),
      
      setTechAssessment: (data) => set((state) => ({
        techAssessment: { ...state.techAssessment, ...data }
      })),
      
      setGrowthGoals: (data) => set((state) => ({
        growthGoals: { ...state.growthGoals, ...data }
      })),
      
      setPreferences: (data) => set((state) => ({
        preferences: { ...state.preferences, ...data }
      })),
      
      setContactInfo: (data) => set((state) => ({
        contactInfo: { ...state.contactInfo, ...data }
      })),
      
      setResults: (results) => set({ results }),
      
      nextStep: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, 5)
      })),
      
      prevStep: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 1)
      })),
      
      resetCalculator: () => set({
        ...initialState,
        sessionId: generateSessionId(),
        startTime: Date.now()
      }),
      
      getCompletionTime: () => {
        const state = get();
        return Math.floor((Date.now() - state.startTime) / 1000);
      }
    }),
    {
      name: 'hawaii-calculator-storage',
      partialize: (state) => ({
        companyInfo: state.companyInfo,
        techAssessment: state.techAssessment,
        growthGoals: state.growthGoals,
        preferences: state.preferences,
        contactInfo: state.contactInfo,
        currentStep: state.currentStep
      })
    }
  )
);