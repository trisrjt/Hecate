import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  bgImage = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
}) => {
  return (
    <div className="relative h-[260px] md:h-[340px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={bgImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-hecate-primary/60 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 tracking-tight drop-shadow-md">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto drop-shadow-sm font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
