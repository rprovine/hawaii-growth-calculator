'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { DollarSign, Clock, Wrench, Users2, ChevronLeft } from 'lucide-react';
import { useCalculatorStore } from '@/hooks/useCalculatorStore';
import { solutionPreferencesSchema } from '@/lib/validations/calculator';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  BUDGET_RANGES,
  TIMELINES,
  IMPLEMENTATION_TYPES,
  DECISION_MAKERS
} from '@/types/calculator';

type PreferencesFormData = z.infer<typeof solutionPreferencesSchema>;

export function PreferencesStep() {
  const { preferences, setPreferences, nextStep, prevStep } = useCalculatorStore();
  
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(solutionPreferencesSchema),
    defaultValues: {
      ...preferences,
      decisionMakers: preferences.decisionMakers || [],
    },
  });

  const selectedDecisionMakers = watch('decisionMakers') || [];

  const toggleDecisionMaker = (maker: string) => {
    const current = selectedDecisionMakers;
    const updated = current.includes(maker)
      ? current.filter((m) => m !== maker)
      : [...current, maker];
    setValue('decisionMakers', updated, { shouldValidate: true });
  };

  const onSubmit = (data: PreferencesFormData) => {
    setPreferences(data);
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
            Solution Preferences
          </h2>
          <p className="text-gray-600">
            Let us know your requirements to find the perfect solution
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Budget Range */}
          <Card className="p-6">
            <Label className="flex items-center gap-2 text-lg font-semibold mb-4">
              <DollarSign className="w-5 h-5 text-teal-600" />
              Monthly Budget Range
            </Label>
            <RadioGroup
              value={watch('budgetRange')}
              onValueChange={(value) => setValue('budgetRange', value, { shouldValidate: true })}
              className="space-y-3"
            >
              {BUDGET_RANGES.map((range) => (
                <motion.div
                  key={range.value}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <RadioGroupItem value={range.value} id={range.value} />
                  <Label
                    htmlFor={range.value}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {range.label}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
            {errors.budgetRange && (
              <p className="text-sm text-red-600 mt-2">{errors.budgetRange.message}</p>
            )}
          </Card>

          {/* Timeline */}
          <Card className="p-6">
            <Label className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              Implementation Timeline
            </Label>
            <RadioGroup
              value={watch('timeline')}
              onValueChange={(value) => setValue('timeline', value, { shouldValidate: true })}
              className="space-y-3"
            >
              {TIMELINES.map((timeline) => (
                <motion.div
                  key={timeline.value}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <RadioGroupItem value={timeline.value} id={timeline.value} />
                  <Label
                    htmlFor={timeline.value}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {timeline.label}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
            {errors.timeline && (
              <p className="text-sm text-red-600 mt-2">{errors.timeline.message}</p>
            )}
          </Card>

          {/* Implementation Type */}
          <Card className="p-6">
            <Label className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Wrench className="w-5 h-5 text-green-600" />
              Implementation Preference
            </Label>
            <RadioGroup
              value={watch('implementationType')}
              onValueChange={(value) => setValue('implementationType', value, { shouldValidate: true })}
              className="space-y-3"
            >
              {IMPLEMENTATION_TYPES.map((type) => (
                <motion.div
                  key={type.value}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label
                    htmlFor={type.value}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {type.label}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
            {errors.implementationType && (
              <p className="text-sm text-red-600 mt-2">{errors.implementationType.message}</p>
            )}
          </Card>

          {/* Decision Makers */}
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <Label className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Users2 className="w-5 h-5 text-amber-600" />
              Key Decision Makers
            </Label>
            <p className="text-sm text-gray-600 mb-4">
              Who will be involved in the decision-making process?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DECISION_MAKERS.map((maker) => (
                <motion.div
                  key={maker}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={selectedDecisionMakers.includes(maker) ? "default" : "outline"}
                    className={`w-full justify-center py-3 cursor-pointer transition-all ${
                      selectedDecisionMakers.includes(maker)
                        ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600'
                        : 'hover:border-amber-300 hover:bg-amber-50'
                    }`}
                    onClick={() => toggleDecisionMaker(maker)}
                  >
                    {maker}
                  </Badge>
                </motion.div>
              ))}
            </div>
            {errors.decisionMakers && (
              <p className="text-sm text-red-600 mt-2">{errors.decisionMakers.message}</p>
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
              Get Your Results
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}