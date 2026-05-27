import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Clipboard, Layers, Cpu, Wrench } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHeader } from '../components/PageHeader';
import { SEO } from '../components/SEO';

interface ServiceCollection {
  id: string;
  title: string;
  image: string;
  desc: string;
  subcategories: string[];
}

export const Services: React.FC = () => {
  const collections: ServiceCollection[] = [
    {
      id: 'modern-living',
      title: 'Modern Living',
      image: '/images/service-living.jpg',
      desc: 'Contemporary living room furniture that combines sophistication and functionality. From sofas and coffee tables to entertainment units and shelving.',
      subcategories: ['Modular Sofas', 'Coffee Tables', 'TV Units', 'Bookshelves', 'Accent Chairs'],
    },
    {
      id: 'modern-kitchen',
      title: 'Modern Kitchen',
      image: '/images/service-kitchen.jpg',
      desc: 'Sleek and functional kitchen interiors with premium cabinetry, islands, and storage solutions designed for modern homes.',
      subcategories: ['Modular Cabinets', 'Kitchen Islands', 'Pantry Units', 'Dining Sets', 'Storage Solutions'],
    },
    {
      id: 'modern-office',
      title: 'Modern Office',
      image: '/images/service-office.jpg',
      desc: 'Ergonomic and stylish workspace furniture for productive corporate environments, co-working spaces, and home offices.',
      subcategories: ['Workstations', 'Conference Tables', 'Executive Desks', 'Storage Cabinets', 'Reception Desks'],
    },
    {
      id: 'modern-bedroom',
      title: 'Modern Bedroom',
      image: '/images/service-bedroom.jpg',
      desc: 'Serene and elegant bedroom furnishings designed for restful spaces. From beds and wardrobes to nightstands and dressers.',
      subcategories: ['Platform Beds', 'Wardrobes', 'Nightstands', 'Dressers', 'Vanity Units'],
    },
    {
      id: 'kids-baby-room',
      title: "Kid's & Baby Room",
      image: '/images/service-kids.jpg',
      desc: 'Playful, safe, and creative furniture designed for children. Colorful, durable, and thoughtfully crafted for little ones.',
      subcategories: ['Bunk Beds', 'Study Tables', 'Toy Storage', 'Playroom Sets'],
    },
  ];

  const processes = [
    {
      step: '01',
      title: 'Consultation',
      desc: 'We understand your requirements and share our expertise to develop the right product for your specific needs.',
      icon: <Clipboard size={24} className="text-hecate-secondary" />,
    },
    {
      step: '02',
      title: 'Design',
      desc: 'Our specialists create detailed CAD designs and 3D visualizations for your visual feedback and approval.',
      icon: <Layers size={24} className="text-hecate-secondary" />,
    },
    {
      step: '03',
      title: 'Manufacturing',
      desc: 'Production begins in our state-of-the-art facility using German-made machinery for high-tolerance precision.',
      icon: <Cpu size={24} className="text-hecate-secondary" />,
    },
    {
      step: '04',
      title: 'Installation',
      desc: 'We safely deliver and install the custom modular furniture at your location with professional assembly care.',
      icon: <Wrench size={24} className="text-hecate-secondary" />,
    },
  ];

  return (
    <div>
      <SEO pageKey="services" />

      {/* Header */}
      <PageHeader
        title="Our Furniture Collections"
        subtitle="Premium furniture solutions for every space in your home or office"
        bgImage="/images/service-living.jpg"
      />

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="section-label">Collections</span>
              <h2 className="section-title">Explore Our Departments</h2>
              <p className="text-hecate-muted max-w-2xl mx-auto font-light">
                We offer modern modular furniture that combines sophistication, style, and utility for every area of your commercial or residential project.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 0.1}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full border border-hecate-border/50 flex flex-col justify-between">
                  <div>
                    {/* Visual Photo */}
                    <div className="overflow-hidden h-60 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-semibold mb-3 text-hecate-primary group-hover:text-hecate-secondary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-hecate-muted text-sm leading-relaxed mb-6 font-light">
                        {item.desc}
                      </p>
                      
                      {/* Sub-categories tags */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.subcategories.map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] bg-hecate-cream text-hecate-text px-3 py-1 rounded-full font-sans font-medium"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Link at bottom */}
                  <div className="px-6 pb-6 pt-0">
                    <Link
                      to={`/services/${item.id}`}
                      className="text-hecate-secondary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      <span>View Details</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Manufacturing Process Mapping */}
      <section className="py-20 md:py-28 bg-hecate-cream border-t border-hecate-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="section-label">Our Process</span>
              <h2 className="section-title">How We Work</h2>
              <p className="text-hecate-muted max-w-2xl mx-auto font-light">
                A streamlined, modular approach from client query to final onsite installation, ensuring consistent German quality benchmarks.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {processes.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="text-center relative h-full">
                  {/* Outer circle layout */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-md relative z-10 hover:scale-105 transition-transform duration-300">
                    {item.icon}
                    {/* Floating step label */}
                    <span className="absolute -top-1 -right-1 text-[11px] bg-hecate-secondary text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </span>
                  </div>

                  {/* Horizontal linking line in large viewports */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-hecate-border -z-0"></div>
                  )}

                  <h3 className="font-serif text-xl font-semibold mb-2 text-hecate-primary">
                    {item.title}
                  </h3>
                  <p className="text-hecate-muted text-xs leading-relaxed font-light px-4">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Quote */}
      <section className="bg-hecate-primary py-16 md:py-20 text-center text-white relative">
        <ScrollReveal>
          <h2 className="text-3xl font-serif font-bold mb-4">
            Need Custom Dimensions or Materials?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 font-light text-sm md:text-base leading-relaxed">
            Our specialized engineering team is equipped to custom manufacture modular contract furniture to suit exact blue-print parameters.
          </p>
          <Link to="/contact" className="btn-primary gap-2 bg-hecate-secondary inline-flex text-base">
            <MessageSquare size={18} />
            Contact Our Joinery Team
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
};
