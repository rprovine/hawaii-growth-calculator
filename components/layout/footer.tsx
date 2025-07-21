import { Logo } from '@/components/ui/logo';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 relative flex-shrink-0">
                  <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor:'#60a5fa', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#06b6d4', stopOpacity:1}} />
                      </linearGradient>
                    </defs>
                    <circle cx="24" cy="24" r="22" fill="url(#footerLogoGradient)" opacity="0.2"/>
                    <path d="M12 18 Q24 12 36 18 Q24 24 12 18" fill="url(#footerLogoGradient)"/>
                    <path d="M15 30 Q24 24 33 30 Q24 36 15 30" fill="url(#footerLogoGradient)" opacity="0.8"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white leading-tight">
                    LeniLani Consulting
                  </span>
                  <span className="text-sm text-blue-300 font-medium">
                    Hawaii Business Growth
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Hawaii's premier AI and technology consulting firm, specializing in custom solutions 
              for local businesses. We help companies across the islands modernize their operations 
              and achieve sustainable growth through smart technology investments.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://lenilani.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://lenilani.com/services/ai-strategy" className="hover:text-white transition-colors">
                  AI Strategy & Implementation
                </a>
              </li>
              <li>
                <a href="https://lenilani.com/services/fractional-cto" className="hover:text-white transition-colors">
                  Fractional CTO Services
                </a>
              </li>
              <li>
                <a href="https://lenilani.com/services/hubspot" className="hover:text-white transition-colors">
                  HubSpot Implementation
                </a>
              </li>
              <li>
                <a href="https://lenilani.com/services/digital-transformation" className="hover:text-white transition-colors">
                  Digital Transformation
                </a>
              </li>
              <li>
                <a href="https://lenilani.com/services/custom-development" className="hover:text-white transition-colors">
                  Custom Software Development
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <a href="tel:815-641-6689" className="hover:text-white transition-colors">
                  (815) 641-6689
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:info@lenilani.com" className="hover:text-white transition-colors">
                  info@lenilani.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                <span>Serving all Hawaiian Islands</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} LeniLani Consulting. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="https://lenilani.com/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="https://lenilani.com/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}