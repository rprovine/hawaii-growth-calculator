'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, ChevronLeft } from 'lucide-react';
import { useCalculatorStore } from '@/hooks/useCalculatorStore';
import { growthGoalsSchema } from '@/lib/validations/calculator';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BUSINESS_OBJECTIVES,
  TECH_BARRIERS,
  PRIORITY_AREAS
} from '@/types/calculator';

type GrowthGoalsFormData = z.infer<typeof growthGoalsSchema>;

export function GrowthGoalsStep() {
  const { growthGoals, setGrowthGoals, nextStep, prevStep } = useCalculatorStore();
  
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GrowthGoalsFormData>({
    resolver: zodResolver(growthGoalsSchema),
    defaultValues: {
      businessObjectives: growthGoals.businessObjectives || [],
      techBarriers: growthGoals.techBarriers || [],
      priorityAreas: growthGoals.priorityAreas || [],
    },
  });

  const selectedObjectives = watch('businessObjectives') || [];
  const selectedBarriers = watch('techBarriers') || [];
  const selectedPriorities = watch('priorityAreas') || [];

  const toggleSelection = (
    field: 'businessObjectives' | 'techBarriers' | 'priorityAreas',
    value: string
  ) => {
    const current = watch(field) || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setValue(field, updated, { shouldValidate: true });
  };

  const onSubmit = (data: GrowthGoalsFormData) => {
    setGrowthGoals(data);
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Define Your Growth Goals
          </h2>
          <p className="text-gray-600">
            Help us understand your business objectives and challenges
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Business Objectives */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <div className="mb-4">
              <Label className="flex items-center gap-2 text-lg font-semibold">
                <Target className="w-5 h-5 text-teal-600" />
                Business Objectives
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                What are your primary business goals for the next 12 months?
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BUSINESS_OBJECTIVES.map((objective) => (
                <motion.div
                  key={objective}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={selectedObjectives.includes(objective) ? "default" : "outline"}
                    className={`w-full justify-center py-3 cursor-pointer transition-all ${
                      selectedObjectives.includes(objective)
                        ? 'bg-green-600 hover:bg-green-700 text-white border-green-600'
                        : 'hover:border-green-300 hover:bg-green-50'
                    }`}
                    onClick={() => toggleSelection('businessObjectives', objective)}
                  >
                    {objective}
                  </Badge>
                </motion.div>
              ))}
            </div>
            {errors.businessObjectives && (
              <p className="text-sm text-red-600 mt-2">{errors.businessObjectives.message}</p>
            )}
          </Card>

          {/* Tech Barriers */}
          <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-100">
            <div className="mb-4">
              <Label className="flex items-center gap-2 text-lg font-semibold">
                <Shield className="w-5 h-5 text-orange-600" />
                Technology Barriers
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                What challenges prevent you from adopting new technology?
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TECH_BARRIERS.map((barrier) => (
                <motion.div
                  key={barrier}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={selectedBarriers.includes(barrier) ? "default" : "outline"}
                    className={`w-full justify-center py-3 cursor-pointer transition-all ${
                      selectedBarriers.includes(barrier)
                        ? 'bg-red-600 hover:bg-red-700 text-white border-red-600'
                        : 'hover:border-red-300 hover:bg-red-50'
                    }`}
                    onClick={() => toggleSelection('techBarriers', barrier)}
                  >
                    {barrier}
                  </Badge>
                </motion.div>
              ))}
            </div>
            {errors.techBarriers && (
              <p className="text-sm text-red-600 mt-2">{errors.techBarriers.message}</p>
            )}
          </Card>

          {/* Priority Areas */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100">
            <div className="mb-4">
              <Label className="flex items-center gap-2 text-lg font-semibold">
                <Zap className="w-5 h-5 text-green-600" />
                Priority Areas for Improvement
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Which areas of your business need the most attention?
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PRIORITY_AREAS.map((area) => (
                <motion.div
                  key={area}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={selectedPriorities.includes(area) ? "default" : "outline"}
                    className={`w-full justify-center py-3 cursor-pointer transition-all ${
                      selectedPriorities.includes(area)
                        ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600'
                        : 'hover:border-purple-300 hover:bg-purple-50'
                    }`}
                    onClick={() => toggleSelection('priorityAreas', area)}
                  >
                    {area}
                  </Badge>
                </motion.div>
              ))}
            </div>
            {errors.priorityAreas && (
              <p className="text-sm text-red-600 mt-2">{errors.priorityAreas.message}</p>
            )}
          </Card>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              Continue to Preferences
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}