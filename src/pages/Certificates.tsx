import React, { useState } from 'react';
import { BadgeCheck, FileText, ArrowRight, Eye, X } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHeader } from '../components/PageHeader';
import { SEO } from '../components/SEO';

interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  image: string;
}

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      id: 'greenguard',
      title: 'GREEN GUARD Certificate',
      subtitle: 'Indoor Air Quality Certified',
      desc: 'Certified for low chemical emissions, ensuring indoor air quality and environmental safety.',
      longDesc: 'The GREEN GUARD Certification program gives assurance that products designed for use in indoor spaces meet strict chemical emissions limits, contributing to the creation of healthier interiors. Highly recommended for commercial office layouts and children\'s spaces where air quality directly correlates to wellness and productivity.',
      image: '/images/awards.jpg',
    },
    {
      id: 'msme',
      title: 'Udyam Registration Certificate',
      subtitle: 'Government of India MSME',
      desc: 'Official MSME registration by the Government of India, recognizing us as a trusted manufacturer.',
      longDesc: 'The Udyam Registration is a government declaration issued by the Ministry of Micro, Small and Medium Enterprises. This certifies our compliance as a legally recognized, institutional modular furniture designer and supplier, eligible for government contracts and public tenders.',
      image: '/images/awards.jpg',
    },
    {
      id: 'iso',
      title: 'ISO 9001:2015 Certificate',
      subtitle: 'Quality Management System',
      desc: 'International certification for our quality management systems, ensuring consistent product quality.',
      longDesc: 'Our ISO 9001:2015 certification guarantees that HECATE adheres to strict quality management principles, including a strong customer focus, systematic procedural audits, and continual improvement. Every batch of commercial furniture leaves our facility under exact QC standards.',
      image: '/images/awards.jpg',
    },
    {
      id: 'bifma',
      title: 'BIFMA Certification',
      subtitle: 'Institutional Durability Standards',
      desc: 'Business and Institutional Furniture Manufacturers Association certification for safety and durability.',
      longDesc: 'BIFMA sponsors the development of safety and performance standards, providing a common basis for evaluating institutional furniture. BIFMA certified desks and chairs ensure structural adequacy, durability under heavy corporate load cycles, and extreme user safety.',
      image: '/images/awards.jpg',
    },
  ];

  return (
    <div>
      <SEO pageKey="certificates" />

      {/* Page Header */}
      <PageHeader
        title="Certifications & Accreditations"
        subtitle="Recognized quality standards that reflect our commitment to excellence"
        bgImage="/images/awards.jpg"
      />

      {/* Description Detail Grid */}
      <section className="py-20 md:py-28 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <ScrollReveal>
              <span className="section-label">Our Promise</span>
              <h2 className="section-title">Why Certifications Matter</h2>
              <p className="text-hecate-muted leading-relaxed mb-6 font-light text-base md:text-lg">
                At HECATE, quality is not just a buzzword — it is embedded in everything we do. Our certifications are a testament to our rigorous quality control processes, environmentally responsible manufacturing, and commitment to customer safety.
              </p>
              <p className="text-hecate-muted leading-relaxed font-light">
                The GREEN GUARD certification ensures our furniture contributes to healthy indoor air quality. Our ISO 9001:2015 certification guarantees consistent quality across every batch. BIFMA certification validates the durability and safety of our office furniture, while our Udyam registration reflects our standing as a trusted Indian manufacturer.
              </p>
            </ScrollReveal>

            {/* Graphic card trust indicator */}
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-xl p-8 border border-hecate-border shadow-md flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-hecate-cream flex items-center justify-center text-hecate-secondary shrink-0">
                  <BadgeCheck size={36} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-hecate-primary mb-2">
                    Verified Global Standards
                  </h3>
                  <p className="text-hecate-muted text-sm font-light leading-relaxed">
                    When you choose HECATE, you choose furniture that meets global benchmarks — built to last, safe to use, and crafted responsibly.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Grid display */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, idx) => (
              <ScrollReveal key={cert.id} delay={idx * 0.1}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-hecate-border/50 flex flex-col justify-between h-full">
                  <div>
                    {/* Simulated Document preview */}
                    <div className="bg-hecate-cream h-48 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                      <FileText size={64} className="text-hecate-secondary/20" />
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase font-semibold text-hecate-text tracking-wide font-sans flex items-center gap-1.5 shadow-sm">
                        <Eye size={12} className="text-hecate-secondary" />
                        <span>Inspect</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-serif text-lg font-semibold mb-1 text-hecate-primary group-hover:text-hecate-secondary transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-hecate-secondary text-[11px] font-medium uppercase tracking-wide mb-3 font-sans">
                        {cert.subtitle}
                      </p>
                      <p className="text-hecate-muted text-xs leading-relaxed font-light">
                        {cert.desc}
                      </p>
                    </div>
                  </div>

                  {/* Trigger inspect button */}
                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="text-hecate-secondary text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all focus:outline-none"
                    >
                      <span>Read Certificate Details</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Dialog */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-300">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl border border-hecate-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-hecate-border">
              <h3 className="font-serif text-xl font-semibold text-hecate-primary">
                {selectedCert.title}
              </h3>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-10 h-10 rounded-full bg-hecate-cream flex items-center justify-center text-hecate-text hover:bg-hecate-secondary hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Document display */}
            <div className="p-6 text-center">
              <div className="bg-hecate-cream h-64 rounded-lg flex items-center justify-center mb-6 relative border border-hecate-border shadow-inner">
                <FileText size={96} className="text-hecate-secondary/35" />
                <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] uppercase font-bold tracking-wider text-hecate-muted px-3 py-1 rounded shadow-sm">
                  Official Verification Copy
                </span>
              </div>
              <h4 className="font-serif text-lg font-semibold text-hecate-primary mb-2">
                {selectedCert.subtitle}
              </h4>
              <p className="text-hecate-muted text-sm leading-relaxed font-light mb-6">
                {selectedCert.longDesc}
              </p>
              <button
                onClick={() => setSelectedCert(null)}
                className="btn-primary w-full py-2.5 text-sm"
              >
                Dismiss Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
