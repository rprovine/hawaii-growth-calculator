'use client';

import { useCalculatorStore } from '@/hooks/useCalculatorStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CompanyInfoStep } from './steps/CompanyInfoStep';
import { TechAssessmentStep } from './steps/TechAssessmentStep';
import { GrowthGoalsStep } from './steps/GrowthGoalsStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { ContactStep } from './steps/ContactStep';
import { ProgressBar } from './ProgressBar';
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';

const steps = [
  { id: 1, name: 'Company Info', component: CompanyInfoStep },
  { id: 2, name: 'Tech Assessment', component: TechAssessmentStep },
  { id: 3, name: 'Growth Goals', component: GrowthGoalsStep },
  { id: 4, name: 'Preferences', component: PreferencesStep },
  { id: 5, name: 'Contact & Results', component: ContactStep },
];

export function CalculatorWrapper() {
  const { currentStep, setCurrentStep } = useCalculatorStore();
  
  // Reset calculator on mount
  useEffect(() => {
    const resetCalculator = useCalculatorStore.getState().resetCalculator;
    resetCalculator();
  }, []);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleStepClick = (stepId: number) => {
    if (stepId < currentStep) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressBar 
        currentStep={currentStep} 
        totalSteps={steps.length}
        onStepClick={handleStepClick}
        steps={steps}
      />
      
      <Card className="mt-8 p-6 md:p-8 shadow-xl bg-white/95 backdrop-blur-sm border-gray-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>
      </Card>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Your data is secure and will only be used to provide personalized recommendations.
        </p>
      </div>
    </div>
  );
}