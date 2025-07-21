'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Company Name Only */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 leading-tight">
                  LeniLani Consulting
                </span>
                <span className="text-sm text-blue-600 font-medium">
                  Hawaii Business Growth
                </span>
              </div>
            </Link>
          </div>
          
          {/* Contact Information */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-4 w-4 text-blue-500" />
              <a 
                href="tel:815-641-6689" 
                className="hover:text-blue-600 transition-colors font-medium"
              >
                (815) 641-6689
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="h-4 w-4 text-blue-500" />
              <a 
                href="mailto:info@lenilani.com" 
                className="hover:text-blue-600 transition-colors font-medium"
              >
                info@lenilani.com
              </a>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="hidden sm:inline-flex"
              asChild
            >
              <a href="https://lenilani.com" target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              asChild
            >
              <a href="https://hawaii.lenilani.com/#cta" target="_blank" rel="noopener noreferrer">
                Contact Us
              </a>
            </Button>
          </div>
        </div>
        
        {/* Mobile Contact Info */}
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex items-center justify-center space-x-4 text-sm">
          <a href="tel:815-641-6689" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <Phone className="h-3 w-3" />
            <span>(815) 641-6689</span>
          </a>
          <a href="mailto:info@lenilani.com" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <Mail className="h-3 w-3" />
            <span>info@lenilani.com</span>
          </a>
        </div>
      </div>
    </header>
  );
}