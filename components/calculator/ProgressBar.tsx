'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  steps: { id: number; name: string }[];
}

export function ProgressBar({ currentStep, totalSteps, onStepClick, steps }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-8">
      {/* Mobile Progress Bar */}
      <div className="block md:hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {steps[currentStep - 1].name}
          </span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Desktop Step Indicators */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 w-full h-1 bg-blue-200 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>

          {/* Step Indicators */}
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              const isClickable = step.id < currentStep;

              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center",
                    isClickable && "cursor-pointer group"
                  )}
                  onClick={() => isClickable && onStepClick(step.id)}
                >
                  <motion.div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-200",
                      isCompleted && "bg-gradient-to-r from-blue-500 to-blue-600",
                      isCurrent && "bg-orange-500 ring-4 ring-orange-100",
                      !isCompleted && !isCurrent && "bg-gray-300",
                      isClickable && "group-hover:ring-4 group-hover:ring-blue-100"
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: step.id * 0.1 }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <span className={cn(
                        "text-sm font-semibold",
                        isCurrent ? "text-white" : "text-gray-600"
                      )}>
                        {step.id}
                      </span>
                    )}
                  </motion.div>
                  <motion.span
                    className={cn(
                      "mt-2 text-xs font-medium whitespace-nowrap",
                      isCurrent && "text-orange-600",
                      !isCurrent && "text-gray-500"
                    )}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: step.id * 0.1 + 0.2 }}
                  >
                    {step.name}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}