import React, { useState } from 'react';
import { BadgeCheck, FileText, Eye, X, Download, ExternalLink, ShieldCheck } from 'lucide-react';
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
  pdfUrl: string;
  fileName: string;
  badge: string;
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
      pdfUrl: '/hecate-greenguard-certificate.pdf',
      fileName: 'HECATE GREEN GUARD CERTIFICATE.pdf',
      badge: 'Air Quality & Safety',
    },
    {
      id: 'msme',
      title: 'Udyam Registration Certificate',
      subtitle: 'Government of India MSME',
      desc: 'Official MSME registration by the Government of India, recognizing us as a trusted manufacturer.',
      longDesc: 'The Udyam Registration is a government declaration issued by the Ministry of Micro, Small and Medium Enterprises. This certifies our compliance as a legally recognized, institutional modular furniture designer and supplier, eligible for government contracts and public tenders.',
      image: '/images/awards.jpg',
      pdfUrl: '/hecate-udyam-certificate.pdf',
      fileName: 'HECATE Udyam Registration Certificate.pdf',
      badge: 'Government Registered',
    },
    {
      id: 'iso',
      title: 'ISO 9001:2015 Certificate',
      subtitle: 'Quality Management System',
      desc: 'International certification for our quality management systems, ensuring consistent product quality.',
      longDesc: 'Our ISO 9001:2015 certification guarantees that HECATE adheres to strict quality management principles, including a strong customer focus, systematic procedural audits, and continual improvement. Every batch of commercial furniture leaves our facility under exact QC standards.',
      image: '/images/awards.jpg',
      pdfUrl: '/hecate-iso-certificate.pdf',
      fileName: 'HECATE ISO Certificate.pdf',
      badge: 'ISO Quality Standard',
    },
    {
      id: 'bifma',
      title: 'BIFMA Certification',
      subtitle: 'Institutional Durability Standards',
      desc: 'Business and Institutional Furniture Manufacturers Association certification for safety and durability.',
      longDesc: 'BIFMA sponsors the development of safety and performance standards, providing a common basis for evaluating institutional furniture. BIFMA certified desks and chairs ensure structural adequacy, durability under heavy corporate load cycles, and extreme user safety.',
      image: '/images/awards.jpg',
      pdfUrl: '/hecate-bifma-certificate.pdf',
      fileName: 'HECATE BIFMA Certificate.pdf',
      badge: 'Durability Benchmark',
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
                    When you choose HECATE, you choose furniture that meets global benchmarks — built to last, safe to use, and crafted responsibly. Click any certificate below to view or download the official PDF documents.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Grid display */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, idx) => (
              <ScrollReveal key={cert.id} delay={idx * 0.1}>
                <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-hecate-border flex flex-col justify-between h-full">
                  <div>
                    {/* Visual PDF document card header */}
                    <div 
                      onClick={() => setSelectedCert(cert)}
                      className="bg-gradient-to-br from-hecate-cream to-amber-50 h-52 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-hecate-secondary/10 transition-colors duration-300 cursor-pointer border-b border-hecate-border/50"
                    >
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-hecate-secondary uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <ShieldCheck size={12} />
                        <span>{cert.badge}</span>
                      </div>
                      
                      <div className="p-4 rounded-2xl bg-white shadow-md group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 border border-hecate-border/40 text-hecate-secondary mb-2">
                        <FileText size={44} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-hecate-text/70 font-sans">
                        PDF Certificate
                      </span>

                      <div className="absolute bottom-3 right-3 bg-hecate-primary text-white px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wide font-sans flex items-center gap-1.5 shadow-md group-hover:bg-hecate-secondary transition-colors">
                        <Eye size={12} />
                        <span>View Document</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-serif text-lg font-semibold mb-1 text-hecate-primary group-hover:text-hecate-secondary transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-hecate-secondary text-[11px] font-medium uppercase tracking-wide mb-3 font-sans">
                        {cert.subtitle}
                      </p>
                      <p className="text-hecate-muted text-xs leading-relaxed font-light mb-4">
                        {cert.desc}
                      </p>
                    </div>
                  </div>

                  {/* Actions bar */}
                  <div className="px-6 pb-6 pt-0 space-y-2">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="w-full btn-primary py-2 text-xs flex items-center justify-center gap-2 group-hover:bg-hecate-secondary transition-colors"
                    >
                      <Eye size={14} />
                      <span>Inspect PDF</span>
                    </button>
                    
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={cert.pdfUrl}
                        download={cert.fileName}
                        className="flex-1 bg-hecate-cream hover:bg-hecate-border/50 text-hecate-primary py-1.5 px-3 rounded text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                        title="Download Certificate PDF"
                      >
                        <Download size={13} className="text-hecate-secondary" />
                        <span>Download</span>
                      </a>

                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-hecate-cream hover:bg-hecate-border/50 text-hecate-primary rounded transition-colors"
                        title="Open PDF in new tab"
                      >
                        <ExternalLink size={14} className="text-hecate-muted hover:text-hecate-secondary" />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive PDF Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in-0 duration-300">
          <div className="bg-white rounded-xl max-w-5xl w-full h-[90vh] shadow-2xl border border-hecate-border flex flex-col overflow-hidden">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-hecate-border bg-hecate-ivory">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-hecate-cream text-hecate-secondary text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border border-hecate-border">
                    {selectedCert.badge}
                  </span>
                  <span className="text-xs text-hecate-muted font-mono">PDF Document</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-hecate-primary">
                  {selectedCert.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedCert.pdfUrl}
                  download={selectedCert.fileName}
                  className="hidden sm:inline-flex btn-primary py-2 px-4 text-xs items-center gap-2 bg-hecate-secondary text-white hover:opacity-90 transition-opacity"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>

                <a
                  href={selectedCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white border border-hecate-border text-hecate-muted hover:text-hecate-secondary hover:bg-hecate-cream transition-colors"
                  title="Open PDF in new browser tab"
                >
                  <ExternalLink size={18} />
                </a>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-10 h-10 rounded-full bg-white border border-hecate-border flex items-center justify-center text-hecate-text hover:bg-hecate-secondary hover:text-white transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Interactive Content */}
            <div className="flex-1 p-4 bg-gray-100 overflow-hidden flex flex-col gap-4">
              <iframe
                src={`${selectedCert.pdfUrl}#toolbar=1`}
                className="w-full flex-1 rounded-lg border border-hecate-border bg-white shadow-inner"
                title={selectedCert.title}
              />
            </div>

            {/* Footer detail info */}
            <div className="p-4 md:p-5 bg-white border-t border-hecate-border flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left max-w-3xl">
                <h4 className="font-serif text-sm font-semibold text-hecate-primary">
                  {selectedCert.subtitle}
                </h4>
                <p className="text-hecate-muted text-xs leading-relaxed font-light">
                  {selectedCert.longDesc}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <a
                  href={selectedCert.pdfUrl}
                  download={selectedCert.fileName}
                  className="sm:hidden btn-primary py-2 px-4 text-xs flex-1 flex items-center justify-center gap-2 bg-hecate-secondary text-white"
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2 bg-hecate-cream hover:bg-hecate-border text-hecate-primary text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

