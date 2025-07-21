import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowRight, 
  Calculator, 
  Shield, 
  BarChart,
  Globe,
  Phone
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Hawaii Business
            <span className="text-blue-600"> Growth Potential</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get a personalized technology roadmap and ROI analysis for your Hawaii business in just 5 minutes. 
            See how local companies save 20-45% on technology costs while growing faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator">
              <Button size="lg" className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all">
                Start Free Assessment <ArrowRight className="ml-2 animate-pulse" />
              </Button>
            </Link>
            <Link href="https://calendly.com/rprovine-kointyme/30min?month=2025-07" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-colors">
                <Phone className="mr-2" /> Schedule Consultation
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 100% Hawaii-focused • Results in 5 minutes
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">87%</div>
            <div className="text-gray-600">Cost Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-600">3.2x</div>
            <div className="text-gray-600">Efficiency Gains</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700">500+</div>
            <div className="text-gray-600">Hawaii Businesses</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600">4.9</div>
            <div className="text-gray-600">Client Rating</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Hawaii Businesses Choose Our Calculator
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Hawaii-Specific Insights</h3>
            <p className="text-gray-600">
              Tailored recommendations based on local market conditions, island logistics, and Hawaii business regulations.
            </p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow hover:-translate-y-1">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart className="text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant ROI Analysis</h3>
            <p className="text-gray-600">
              Get detailed financial projections, cost savings estimates, and payback period calculations in minutes.
            </p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Obligation</h3>
            <p className="text-gray-600">
              Free assessment with no strings attached. Get valuable insights whether you work with us or not.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-blue-200">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Share Your Current State</h3>
              <p className="text-sm text-gray-600">Tell us about your business and current technology setup</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-teal-200">
                <span className="text-2xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Define Your Goals</h3>
              <p className="text-sm text-gray-600">Share your growth objectives and challenges</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-green-200">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Your Analysis</h3>
              <p className="text-sm text-gray-600">Receive personalized recommendations and ROI projections</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-orange-200">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Take Action</h3>
              <p className="text-sm text-gray-600">Download your report or schedule a consultation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted by Leading Hawaii Industries
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            'Tourism & Hospitality',
            'Real Estate',
            'Healthcare',
            'Retail & E-commerce',
            'Professional Services',
            'Construction',
            'Agriculture',
            'Non-profit'
          ].map((industry) => (
            <div key={industry} className="text-center p-4 bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <p className="font-medium text-gray-700">{industry}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Hawaii Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of local businesses who have discovered their growth potential. 
            Get your free personalized assessment now.
          </p>
          <Link href="/calculator">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all">
              <Calculator className="mr-2" /> Start Your Free Assessment
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">LeniLani Consulting</h3>
              <p className="text-gray-400">
                Hawaii&apos;s premier AI and technology consulting firm
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://www.lenilani.com/solutions" target="_blank" rel="noopener noreferrer">AI Consulting</a></li>
                <li><a href="https://www.lenilani.com/solutions" target="_blank" rel="noopener noreferrer">Fractional CTO</a></li>
                <li><a href="https://www.lenilani.com/solutions" target="_blank" rel="noopener noreferrer">HubSpot Implementation</a></li>
                <li><a href="https://www.lenilani.com/solutions" target="_blank" rel="noopener noreferrer">Digital Transformation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://hawaii.lenilani.com/about" target="_blank" rel="noopener noreferrer">About Us</a></li>
                <li><a href="https://hawaii.lenilani.com/case-studies" target="_blank" rel="noopener noreferrer">Case Studies</a></li>
                <li><a href="https://hawaii.lenilani.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                <li><a href="https://hawaii.lenilani.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@lenilani.com</li>
                <li>815-641-6689</li>
                <li>Honolulu, HI</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LeniLani Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}