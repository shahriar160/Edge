import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showWordmark = true }) => {
  const heights = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  }[size];

  return (
    <div className="flex items-center gap-2 select-none">
      <img 
        src="/assets/aistudio/WhatsApp_Image_2026-11-25_at_12.56.59_PM_5d1c8ea4.jpeg" 
        alt="EDGE Logo" 
        className={`${heights} w-auto object-contain rounded-lg`}
      />
    </div>
  );
};
