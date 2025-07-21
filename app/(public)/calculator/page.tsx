import { Metadata } from 'next';
import { CalculatorWrapper } from '@/components/calculator/CalculatorWrapper';

export const metadata: Metadata = {
  title: 'Hawaii Business Growth Calculator | Calculate Your Tech ROI',
  description: 'Discover how modern technology can transform your Hawaii business. Get personalized recommendations and ROI calculations tailored to your unique needs.',
  keywords: 'Hawaii business calculator, tech ROI calculator, business growth Hawaii, digital transformation Hawaii',
  openGraph: {
    title: 'Hawaii Business Growth Calculator',
    description: 'Calculate your potential savings and growth with modern technology solutions designed for Hawaii businesses.',
    type: 'website',
  },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Hawaii Business Growth Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how modern technology can transform your Hawaii business. 
            Get personalized recommendations in just 5 minutes.
          </p>
        </div>
        
        <CalculatorWrapper />
      </div>
    </div>
  );
}