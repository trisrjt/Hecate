import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from './ScrollReveal';
import { MessageSquare } from 'lucide-react';

export const CTABanner: React.FC = () => {
  return (
    <section className="bg-hecate-primary py-16 md:py-20 relative overflow-hidden">
      {/* Subtle geometric light sources for premium look */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-hecate-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-hecate-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
        <ScrollReveal>
          <span className="text-hecate-accent text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
            Partner With Us
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Get bulk pricing for your commercial or residential project. We specialize in custom contract furniture with exceptional quality and competitive pricing.
          </p>
          <Link to="/contact" className="btn-primary gap-2 bg-hecate-secondary text-white inline-flex text-base">
            <MessageSquare size={18} />
            Request a Quote
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};
