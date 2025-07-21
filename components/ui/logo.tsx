import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link href="/" className={`flex items-center space-x-3 hover:opacity-80 transition-opacity ${className}`}>
      {/* Logo Image */}
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <Image
          src="/images/lenilani-logo.svg"
          alt="LeniLani Consulting Logo"
          width={size === 'lg' ? 64 : size === 'md' ? 48 : 32}
          height={size === 'lg' ? 64 : size === 'md' ? 48 : 32}
          className="object-contain"
          priority
        />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-gray-900 leading-tight`}>
            LeniLani Consulting
          </span>
          {size !== 'sm' && (
            <span className="text-sm text-blue-600 font-medium">
              Hawaii Business Growth
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

export function LogoIcon({ size = 'md', className = '' }: Pick<LogoProps, 'size' | 'className'>) {
  return <Logo size={size} showText={false} className={className} />;
}