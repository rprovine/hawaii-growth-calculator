'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Building2, MapPin, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { useCalculatorStore } from '@/hooks/useCalculatorStore';
import { companyInfoSchema } from '@/lib/validations/calculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  INDUSTRIES, 
  COMPANY_SIZES, 
  HAWAII_LOCATIONS, 
  REVENUE_RANGES, 
  GROWTH_STAGES,
  PAIN_POINTS 
} from '@/types/calculator';

type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;

export function CompanyInfoStep() {
  const { companyInfo, setCompanyInfo, nextStep } = useCalculatorStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CompanyInfoFormData>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      ...companyInfo,
      currentPainPoints: companyInfo.currentPainPoints || [],
    },
  });

  const selectedPainPoints = watch('currentPainPoints') || [];

  const onSubmit = (data: CompanyInfoFormData) => {
    setCompanyInfo(data);
    nextStep();
  };

  const togglePainPoint = (painPoint: string) => {
    const current = selectedPainPoints;
    const updated = current.includes(painPoint)
      ? current.filter((p) => p !== painPoint)
      : [...current, painPoint];
    setValue('currentPainPoints', updated, { shouldValidate: true });
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
            Tell us about your business
          </h2>
          <p className="text-gray-600">
            Help us understand your company to provide tailored recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-500" />
              Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="Enter your company name"
              {...register('companyName')}
              className="bg-white/80 backdrop-blur-sm"
            />
            {errors.companyName && (
              <p className="text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>

          {/* Industry and Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select 
                value={watch('industry')} 
                onValueChange={(value) => setValue('industry', value, { shouldValidate: true })}
              >
                <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-600">{errors.industry.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                Location
              </Label>
              <Select 
                value={watch('location')} 
                onValueChange={(value) => setValue('location', value, { shouldValidate: true })}
              >
                <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select your location" />
                </SelectTrigger>
                <SelectContent>
                  {HAWAII_LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && (
                <p className="text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
          </div>

          {/* Company Size and Revenue */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companySize" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                Company Size
              </Label>
              <Select 
                value={watch('companySize')} 
                onValueChange={(value) => setValue('companySize', value, { shouldValidate: true })}
              >
                <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZES.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.companySize && (
                <p className="text-sm text-red-600">{errors.companySize.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenueRange">Annual Revenue (Optional)</Label>
              <Select 
                value={watch('revenueRange')} 
                onValueChange={(value) => setValue('revenueRange', value)}
              >
                <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select revenue range" />
                </SelectTrigger>
                <SelectContent>
                  {REVENUE_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Growth Stage */}
          <div className="space-y-2">
            <Label htmlFor="growthStage" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-500" />
              Growth Stage (Optional)
            </Label>
            <Select 
              value={watch('growthStage')} 
              onValueChange={(value) => setValue('growthStage', value)}
            >
              <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Select growth stage" />
              </SelectTrigger>
              <SelectContent>
                {GROWTH_STAGES.map((stage) => (
                  <SelectItem key={stage.value} value={stage.value}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Current Pain Points */}
          <Card className="p-6 bg-blue-50/50 border-blue-100">
            <Label className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              Current Pain Points
            </Label>
            <p className="text-sm text-gray-600 mb-4">
              Select all challenges your business is currently facing
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PAIN_POINTS.map((painPoint) => (
                <motion.div
                  key={painPoint}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={selectedPainPoints.includes(painPoint) ? "default" : "outline"}
                    className={`w-full justify-center py-3 cursor-pointer transition-all ${
                      selectedPainPoints.includes(painPoint)
                        ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
                        : 'hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    onClick={() => togglePainPoint(painPoint)}
                  >
                    {painPoint}
                  </Badge>
                </motion.div>
              ))}
            </div>
            {errors.currentPainPoints && (
              <p className="text-sm text-red-600 mt-2">{errors.currentPainPoints.message}</p>
            )}
          </Card>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-6 text-lg"
          >
            Continue to Tech Assessment
          </Button>
        </form>
      </div>
    </motion.div>
  );
}