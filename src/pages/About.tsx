import React from 'react';
import { Link } from 'react-router-dom';
import { Download, CheckCircle, Shield, Award, Users, Settings } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHeader } from '../components/PageHeader';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  const expertise = [
    {
      title: 'Consultation',
      desc: 'Our Consultants will share their experience to develop the right product for your specific needs.',
      icon: <Users size={28} className="text-hecate-secondary" />,
    },
    {
      title: 'Design',
      desc: 'Our furniture designers are specialists in developing robust contract furniture for all environments.',
      icon: <Award size={28} className="text-hecate-secondary" />,
    },
    {
      title: 'Manufacturing',
      desc: 'We have our own setup with German-made machinery ensuring precision and outstanding structural quality.',
      icon: <Settings size={28} className="text-hecate-secondary" />,
    },
    {
      title: 'Project Management',
      desc: 'Our experienced Project Managers are experts in managing the development and installation of contract furniture.',
      icon: <Shield size={28} className="text-hecate-secondary" />,
    },
  ];

  const principles = [
    {
      title: 'Dedication',
      desc: 'We approach each client with total dedication to excellence, reflected by each employee on every level. Our team carefully evaluates every potential client through a method developed and tested over years of experience.',
    },
    {
      title: 'Satisfaction',
      desc: 'Customer satisfaction can be summed up in three words: consistency, consistency, and consistency. We achieve superior levels by paying attention to the finest details in everything we do.',
    },
  ];

  return (
    <div>
      <SEO pageKey="about" />

      {/* Header */}
      <PageHeader
        title="About HECATE"
        subtitle="Specialist Furniture Supplier for the Hospitality Industry"
        bgImage="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
      />

      {/* Profile Section */}
      <section className="py-20 md:py-28 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Description Text */}
            <ScrollReveal>
              <span className="section-label">Our Profile</span>
              <h2 className="section-title">Specialist Furniture Supplier</h2>
              <p className="text-hecate-muted leading-relaxed mb-6 font-light">
                HECATE is a specialist furniture supplier for the hospitality industry. Since we started, our mission has always been to provide our clients with the highest quality products and customer service, while maintaining a completely competitive price.
              </p>
              <p className="text-hecate-muted leading-relaxed mb-6 font-light">
                Our dedicated team works closely with industry professionals to ensure projects are fulfilled successfully. Our design and sales team is always on hand to offer any guidance or support that you might need. We also offer a custom-made service to meet any specific project requests.
              </p>
              <p className="text-hecate-muted leading-relaxed mb-8 font-light font-medium text-hecate-primary">
                At HECATE, we strive to become one of the nation's leading companies for hospitality furniture supplies by offering products of outstanding quality with equally outstanding values.
              </p>
              
              {/* Download Brochure Link */}
              <a
                href="https://beta.aspectall.net/hecate/wp-content/uploads/2019/09/HECATE-Company-Profile_web.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-2 bg-hecate-secondary hover:scale-105 inline-flex"
              >
                <Download size={18} />
                Download Brochure
              </a>
            </ScrollReveal>

            {/* Showroom Visual */}
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
                  alt="Hecate Furniture Showroom"
                  className="rounded-lg shadow-xl w-full h-[450px] object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Expertise Segment */}
      <section className="py-20 md:py-28 bg-hecate-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="section-label">Our Expertise</span>
              <h2 className="section-title">What We Offer</h2>
              <p className="text-hecate-muted max-w-2xl mx-auto font-light">
                We are continually improving processes, systems, policies, delivery and turnaround times while deploying innovative methods, tools and techniques.
              </p>
            </ScrollReveal>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full border border-hecate-border/50">
                  <div className="w-14 h-14 rounded-full bg-hecate-cream flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 text-hecate-primary">
                    {item.title}
                  </h3>
                  <p className="text-hecate-muted text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles (Motto) */}
      <section className="py-20 md:py-28 bg-hecate-primary text-white relative overflow-hidden">
        {/* Subtle glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-hecate-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-hecate-accent text-xs font-medium uppercase tracking-[0.15em] mb-3 block">
                Our Moto
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                The Principles We Live By
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {principles.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.2}>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 h-full">
                  <div className="w-14 h-14 rounded-full bg-hecate-secondary/20 flex items-center justify-center mb-6 text-hecate-accent">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-4 text-hecate-accent">
                    {item.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Summary CTA */}
      <section className="py-20 bg-hecate-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-hecate-text mb-6">
              How Can We Help You?
            </h2>
            <p className="text-hecate-muted text-lg leading-relaxed mb-8 font-light">
              From cost savings to quicker lead times, and better quality, we are your go-to contract furniture manufacturer. Our expert team includes joinery specialists, furniture consultants and project managers, and will advise, act and implement the best possible solutions for your project.
            </p>
            <Link to="/contact" className="btn-primary px-8">
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
