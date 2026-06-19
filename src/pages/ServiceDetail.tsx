import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronRight, MessageSquare } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHeader } from '../components/PageHeader';
import { SEO } from '../components/SEO';

interface DetailData {
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  gallery: string[];
  bgImage: string;
}

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const detailsMap: Record<string, DetailData> = {
    'modern-living': {
      title: 'Modern Living',
      subtitle: 'Contemporary living room furniture that combines sophistication and functionality.',
      desc: 'Our Modern Living collection brings sophistication and functionality to every living space. We design and manufacture contemporary sofas, coffee tables, entertainment units, bookshelves, and accent chairs that enhance both style and comfort. Whether you are furnishing a single home or a multi-unit residential project, our pieces are crafted with premium materials and German precision. Each item is designed to be modular, allowing flexible configurations that adapt to different room sizes and layouts. We offer bulk pricing for developers, interior designers, and hospitality projects.',
      features: [
        'Premium upholstery in fabric, leather, and velvet',
        'Solid wood and engineered wood construction',
        'Space-saving designs for compact urban homes',
        '10-year structural warranty on all frames',
        'Bulk order discounts for 10+ units',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
        '/images/service-living.jpg',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
      ],
      bgImage: '/images/service-living.jpg',
    },
    'modern-kitchen': {
      title: 'Modern Kitchen',
      subtitle: 'Sleek and functional kitchen interiors with premium cabinetry and island storage.',
      desc: 'The Modern Kitchen collection by HECATE offers sleek, functional, and aesthetically pleasing kitchen furniture. From modular cabinets and kitchen islands to pantry units and dining sets, every piece is designed to maximize utility without compromising on style. Our kitchen solutions use moisture-resistant materials, soft-close mechanisms, and ergonomic designs. We cater to both residential projects and commercial kitchens, offering custom finishes, colors, and configurations to match your project requirements.',
      features: [
        'Moisture-resistant engineered wood and plywood',
        'Soft-close drawers and cabinet mechanisms',
        'Custom finishes: matte, gloss, and textured',
        'Ergonomic height standards for Indian homes',
        'Modular island units with breakfast counters',
        'Complete kitchen packages available',
      ],
      gallery: [
        '/images/service-kitchen.jpg',
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      ],
      bgImage: '/images/service-kitchen.jpg',
    },
    'modern-office': {
      title: 'Modern Office',
      subtitle: 'Ergonomic and stylish workspace furniture for productive environments.',
      desc: 'Our Modern Office furniture collection is designed for the way people work today. From collaborative open-plan workstations to private executive suites, we create environments that boost productivity and well-being. Our office furniture includes ergonomic chairs, height-adjustable desks, modular workstations, conference tables, and reception desks. All pieces are built with durability in mind, using commercial-grade materials that withstand heavy daily use. We specialize in large-scale corporate fit-outs and co-working space projects.',
      features: [
        'Ergonomic designs with lumbar support chairs',
        'Height-adjustable and standing desk options',
        'Modular workstation systems for open offices',
        'Cable management and integrated power solutions',
        'Acoustic panels and privacy screens',
        'Full office fit-out project management',
      ],
      gallery: [
        '/images/service-office.jpg',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=600&q=80',
      ],
      bgImage: '/images/service-office.jpg',
    },
    'modern-bedroom': {
      title: 'Modern Bedroom',
      subtitle: 'Serene and elegant bedroom furnishings designed for restful spaces.',
      desc: 'Create serene, restful spaces with our Modern Bedroom collection. We design platform beds, wardrobes, nightstands, dressers, and vanity units that bring calm elegance to any bedroom. Our furniture uses soft-close mechanisms, ambient lighting options, and space-optimizing designs. Whether you need furniture for a boutique hotel, serviced apartments, or residential towers, we deliver consistent quality with customizable finishes and hardware options.',
      features: [
        'Platform and upholstered bed frames',
        'Sliding and hinged wardrobe systems',
        'Soft-close drawers and doors',
        'Integrated LED lighting options',
        'Space-optimized designs for compact rooms',
        'Hotel-grade durability and finish standards',
      ],
      gallery: [
        '/images/service-bedroom.jpg',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
      ],
      bgImage: '/images/service-bedroom.jpg',
    },
    'kids-baby-room': {
      title: "Kid's & Baby Room",
      subtitle: 'Playful, safe, and creative furniture designed for children.',
      desc: 'Our Kids & Baby Room furniture is designed with safety, durability, and imagination in mind. From bunk beds and study tables to toy storage and cribs, every piece is built using child-safe materials with rounded edges and non-toxic finishes. Our colorful designs spark creativity while our robust construction ensures longevity. We cater to schools, daycare centers, pediatric clinics, and residential projects, offering bulk orders with customization options.',
      features: [
        'Child-safe rounded edges and non-toxic finishes',
        'Bunk beds with safety rails and sturdy ladders',
        'Ergonomic study tables and chairs',
        'Colorful, customizable designs',
        'Durable materials for active use',
        'Bulk pricing for schools and institutions',
      ],
      gallery: [
        '/images/service-kids.jpg',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80',
      ],
      bgImage: '/images/service-kids.jpg',
    },
  };

  const currentSlug = slug || '';
  const data = detailsMap[currentSlug];

  if (!data) {
    return <Navigate to="/services" replace />;
  }

  // Related categories
  const relatedList = Object.keys(detailsMap)
    .filter((k) => k !== currentSlug)
    .map((k) => ({
      id: k,
      title: detailsMap[k].title,
      subtitle: detailsMap[k].subtitle,
    }));

  return (
    <div>
      <SEO pageKey={`service-${slug}`} />

      {/* Header */}
      <PageHeader title={data.title} subtitle={data.subtitle} bgImage={data.bgImage} />

      {/* Main Grid */}
      <section className="py-20 md:py-28 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-hecate-muted hover:text-hecate-secondary mb-10 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} />
            <span>All Services</span>
          </Link>

          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Left 2 Cols: Main Detail & Gallery */}
            <div className="md:col-span-2 space-y-12">
              <ScrollReveal>
                <h2 className="text-3xl font-serif font-bold text-hecate-primary mb-6">
                  Service Details
                </h2>
                <p className="text-hecate-muted leading-relaxed font-light text-base md:text-lg">
                  {data.desc}
                </p>
              </ScrollReveal>

              {/* Gallery Section */}
              <ScrollReveal delay={0.2}>
                <h3 className="text-2xl font-serif font-bold text-hecate-primary mb-6">
                  Gallery Showcase
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {data.gallery.map((imgUrl, sIdx) => (
                    <div
                      key={sIdx}
                      className="overflow-hidden rounded-lg shadow-md aspect-square border border-hecate-border"
                    >
                      <img
                        src={imgUrl}
                        alt={`${data.title} ${sIdx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Key Features sidebar */}
            <div className="space-y-8">
              <ScrollReveal delay={0.3}>
                <div className="bg-white rounded-lg p-8 shadow-md border border-hecate-border/50">
                  <h3 className="font-serif text-xl font-semibold mb-6 text-hecate-primary border-b border-hecate-border pb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-4">
                    {data.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check size={16} className="text-hecate-secondary shrink-0 mt-1" />
                        <span className="text-hecate-muted text-sm leading-relaxed font-light">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Related collections list */}
              <ScrollReveal delay={0.4}>
                <div className="bg-hecate-cream rounded-lg p-8 border border-hecate-border">
                  <h3 className="font-serif text-xl font-semibold mb-6 text-hecate-primary border-b border-hecate-border pb-3">
                    Explore More
                  </h3>
                  <div className="space-y-4">
                    {relatedList.map((item) => (
                      <Link
                        key={item.id}
                        to={`/services/${item.id}`}
                        className="group block bg-white p-4 rounded-lg shadow-sm border border-hecate-border/30 hover:shadow-md hover:border-hecate-secondary transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-sm font-semibold text-hecate-primary group-hover:text-hecate-secondary transition-colors">
                            {item.title}
                          </h4>
                          <ChevronRight
                            size={14}
                            className="text-hecate-muted group-hover:text-hecate-secondary transition-colors"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Quote */}
      <section className="bg-hecate-primary py-16 text-center text-white relative">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Request {data.title} Custom Manufacture
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 font-light text-sm md:text-base leading-relaxed">
            Need this department to engineer custom modular packages for your project? Fill out our form.
          </p>
          <Link to="/contact" className="btn-primary gap-2 bg-hecate-secondary inline-flex text-base">
            <MessageSquare size={18} />
            Discuss this Collection
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
};
