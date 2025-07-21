import { Metadata } from 'next';
import { CalculatorWrapper } from '@/components/calculator/CalculatorWrapper';
import { PageLayout } from '@/components/layout/page-layout';

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
    <PageLayout>
      <div id="calculator" className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Hawaii Business Growth Calculator
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how modern technology can transform your Hawaii business. 
              Get personalized recommendations in just 5 minutes.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white/80 px-4 py-2 rounded-full border">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Powered by LeniLani Consulting</span>
              </div>
            </div>
          </div>
          
          <CalculatorWrapper />
        </div>
      </div>
    </PageLayout>
  );
}