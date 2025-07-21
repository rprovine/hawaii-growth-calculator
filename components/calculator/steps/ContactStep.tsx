'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  ChevronLeft,
  Loader2,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react';
import { useCalculatorStore } from '@/hooks/useCalculatorStore';
import { contactInfoSchema } from '@/lib/validations/calculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type ContactInfoFormData = z.infer<typeof contactInfoSchema>;

export function ContactStep() {
  const { 
    contactInfo, 
    setContactInfo, 
    prevStep, 
    results,
    setResults,
    companyInfo,
    techAssessment,
    growthGoals,
    preferences,
    getCompletionTime,
    sessionId
  } = useCalculatorStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactInfoFormData>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      firstName: contactInfo.firstName || '',
      lastName: contactInfo.lastName || '',
      email: contactInfo.email || '',
      phone: contactInfo.phone || '',
      title: contactInfo.title || '',
      marketingConsent: contactInfo.marketingConsent === true,
    },
  });


  const onSubmit = async (data: ContactInfoFormData) => {
    console.log('Form submitted with data:', data);
    
    setContactInfo(data);
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare the data
      const requestData = {
        companyInfo,
        techAssessment,
        growthGoals,
        preferences,
        contactInfo: data,
      };
      
      console.log('Sending data to API:', requestData);
      console.log('Request data keys:', Object.keys(requestData));
      console.log('Company info:', requestData.companyInfo);
      console.log('Tech assessment:', requestData.techAssessment);
      console.log('Growth goals:', requestData.growthGoals);
      console.log('Preferences:', requestData.preferences);
      
      // Call the calculate API
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        
        // Check if there are validation errors
        if (errorData.details?.fieldErrors) {
          const fieldErrors = Object.entries(errorData.details.fieldErrors)
            .map(([field, errors]) => `${field}: ${(errors as string[]).join(', ')}`)
            .join('\n');
          throw new Error(`Validation errors:\n${fieldErrors}`);
        }
        
        throw new Error(errorData.error || 'Failed to calculate results');
      }

      const responseData = await response.json();
      console.log('API Response:', responseData);
      if (responseData.success && responseData.results) {
        setResults(responseData.results);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      let errorMessage = 'Failed to generate your personalized recommendations. Please try again.';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
      }
      
      setError(errorMessage);
      console.error('Calculation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (results) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-block mb-4"
            >
              <CheckCircle className="w-16 h-16 text-teal-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Your Personalized Growth Plan is Ready!
            </h2>
            <p className="text-lg text-gray-600">
              Here&apos;s how modern technology can transform your {companyInfo.industry} business
            </p>
          </div>

          {/* Recommended Solution */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {results.recommendedSolution.title}
            </h3>
            <p className="text-gray-700 mb-4">
              {results.recommendedSolution.description}
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1">
                {results.recommendedSolution.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Financial Impact */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-teal-600" />
              Financial Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Savings</span>
                  <span className="font-bold text-teal-600">
                    ${results.financials.estimatedMonthlySavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Savings</span>
                  <span className="font-bold text-teal-600">
                    ${results.financials.estimatedAnnualSavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Investment</span>
                  <span className="font-semibold">
                    ${results.financials.monthlyInvestment.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Implementation Cost</span>
                  <span className="font-semibold">
                    ${results.financials.implementationCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payback Period</span>
                  <span className="font-semibold">
                    {results.financials.paybackPeriodMonths} months
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">3-Year ROI</span>
                  <span className="font-bold text-blue-600">
                    {results.financials.threeYearROI}%
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total 3-Year Value</span>
              <span className="text-2xl font-bold text-blue-600">
                ${results.financials.totalValue.toLocaleString()}
              </span>
            </div>
          </Card>

          {/* Competitive Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                vs. Enterprise Solutions
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost Difference</span>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                    {results.competitiveAnalysis.vsEnterprise.costDifference}% Lower
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time to Implement</span>
                  <span className="font-medium">
                    {results.competitiveAnalysis.vsEnterprise.timeToImplement}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Flexibility</span>
                  <span className="font-medium">
                    {results.competitiveAnalysis.vsEnterprise.flexibility}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-600" />
                vs. Status Quo
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Efficiency Gains</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    +{results.competitiveAnalysis.vsStatusQuo.efficiencyGains}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth Potential</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    +{results.competitiveAnalysis.vsStatusQuo.growthPotential}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Reduction</span>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                    -{results.competitiveAnalysis.vsStatusQuo.riskReduction}%
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Implementation Timeline */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              Implementation Timeline
            </h3>
            <div className="space-y-4">
              {results.timeline.map((phase, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                    <p className="text-sm text-gray-600 mb-2">{phase.duration}</p>
                    <ul className="list-disc list-inside space-y-1">
                      {phase.milestones.map((milestone, mIndex) => (
                        <li key={mIndex} className="text-sm text-gray-700">{milestone}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-teal-600" />
            <AlertDescription className="text-teal-800">
              A detailed report has been sent to your email address. Our team will contact you within 24 hours to discuss your personalized growth strategy.
            </AlertDescription>
          </Alert>

          <div className="flex gap-4">
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="flex-1"
            >
              Download Report
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Get Your Personalized Results
          </h2>
          <p className="text-gray-600">
            Enter your contact information to receive your customized growth plan
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log('Form validation errors:', errors);
          setError('Please fix the form errors and try again.');
        })} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register('firstName')}
                className="bg-white/80 backdrop-blur-sm"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register('lastName')}
                className="bg-white/80 backdrop-blur-sm"
              />
              {errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              {...register('email')}
              className="bg-white/80 backdrop-blur-sm"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                Phone Number (Optional)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="815-641-6689"
                {...register('phone')}
                className="bg-white/80 backdrop-blur-sm"
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" />
                Job Title (Optional)
              </Label>
              <Input
                id="title"
                placeholder="CEO, Manager, etc."
                {...register('title')}
                className="bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          <Card className="p-4 bg-blue-50/50 border-blue-100">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="marketingConsent"
                {...register('marketingConsent')}
                className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="space-y-1">
                <Label htmlFor="marketingConsent" className="text-sm font-normal cursor-pointer">
                  I agree to receive helpful business growth tips and updates
                </Label>
                <p className="text-xs text-gray-500">
                  You can unsubscribe at any time. We respect your privacy.
                </p>
              </div>
            </div>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={isSubmitting}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                'Get My Results'
              )}
            </Button>
          </div>
        </form>
        
        {/* Debug button - remove in production */}
        <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded">
          <p className="text-sm text-gray-600 mb-2">Debug: Test API directly</p>
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              console.log('Testing API directly...');
              try {
                const testData = {
                  firstName: 'Test',
                  lastName: 'User',
                  email: 'test@example.com',
                  marketingConsent: false
                };
                await onSubmit(testData as ContactInfoFormData);
              } catch (err) {
                console.error('Test failed:', err);
              }
            }}
          >
            Test API Call
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              console.log('Testing debug endpoint...');
              const debugData = {
                companyInfo,
                techAssessment,
                growthGoals,
                preferences,
                contactInfo: {
                  firstName: 'Debug',
                  lastName: 'Test',
                  email: 'debug@test.com'
                }
              };
              console.log('Sending debug data:', debugData);
              
              try {
                const response = await fetch('/api/debug-calculate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(debugData),
                });
                const result = await response.json();
                console.log('Debug response:', result);
              } catch (err) {
                console.error('Debug test failed:', err);
              }
            }}
          >
            Debug Data Check
          </Button>
        </div>
      </div>
    </motion.div>
  );
}