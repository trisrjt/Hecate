import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sofa, Briefcase, Flame, Bed, Baby } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { CTABanner } from '../components/CTABanner';
import { SEO } from '../components/SEO';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: HeroSlide[] = [
    {
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
      title: 'Redefining Spaces with Modern Elegance',
      subtitle: 'Premium contract furniture solutions for modern workplaces and homes',
    },
    {
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
      title: 'Innovate Your Space, Inspire Your Life',
      subtitle: 'Bespoke furniture crafted for hospitality, corporate, and residential projects',
    },
    {
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
      title: 'Crafting Modern Comfort for Every Space',
      subtitle: 'From concept to installation — bulk orders, custom designs, exceptional quality',
    },
  ];

  // Auto slider rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const collections = [
    {
      title: 'Modern Living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      desc: 'Contemporary living room furniture designed for comfort and style.',
      path: '/services/modern-living',
    },
    {
      title: 'Modern Kitchen',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      desc: 'Sleek modular kitchen solutions with premium finishes.',
      path: '/services/modern-kitchen',
    },
    {
      title: 'Modern Office',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      desc: 'Ergonomic workspace furniture for productive environments.',
      path: '/services/modern-office',
    },
    {
      title: 'Modern Bedroom',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
      desc: 'Serene bedroom furnishings for restful spaces.',
      path: '/services/modern-bedroom',
    },
  ];

  const whatWeDo = [
    {
      title: 'Modern Living',
      desc: 'Contemporary designs for stylish living spaces.',
      icon: <Sofa className="size-8" />,
    },
    {
      title: 'Modern Office',
      desc: 'Professional workspaces that inspire productivity.',
      icon: <Briefcase className="size-8" />,
    },
    {
      title: 'Modern Kitchen',
      desc: 'Sleek and functional kitchen interiors.',
      icon: <Flame className="size-8" />,
    },
    {
      title: 'Modern Bedroom',
      desc: 'Serene and elegant bedroom furnishings.',
      icon: <Bed className="size-8" />,
    },
    {
      title: "Kid's & Baby Room",
      desc: 'Playful, safe, and creative furniture for little ones.',
      icon: <Baby className="size-8" />,
    },
  ];

  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '1200+', label: 'Projects Completed' },
    { value: '450+', label: 'Corporate Clients' },
    { value: '100%', label: 'German Machinery' },
  ];

  return (
    <div>
      <SEO pageKey="home" />

      {/* Hero Carousel */}
      <section className="relative h-screen w-full overflow-hidden bg-hecate-primary">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image (Ken Burns) */}
            <motion.img
              src={slide.image}
              alt="Hecate Showroom"
              initial={{ scale: 1.05 }}
              animate={index === currentSlide ? { scale: 1 } : { scale: 1.05 }}
              transition={{ duration: 6, ease: 'easeOut' }}
              className="w-full h-full object-cover select-none"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-hecate-primary/70 via-hecate-primary/60 to-hecate-primary/80"></div>

            {/* Slide Content (Staggered entry) */}
            {index === currentSlide && (
              <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.15,
                        },
                      },
                    }}
                  >
                    <motion.h1
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight drop-shadow-lg"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md font-light leading-relaxed"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                      <Link to="/contact" className="btn-primary">
                        Request a Quote
                      </Link>
                      <Link
                        to="/projects"
                        className="btn-outline border-white text-white hover:bg-white hover:text-hecate-text"
                      >
                        View Our Work
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Carousel Chevron Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all focus:outline-none"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all focus:outline-none"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-hecate-secondary w-8' : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Who We Are (Welcome Section) */}
      <section className="py-20 md:py-28 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content Column */}
            <ScrollReveal>
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">Crafting Excellence in Every Piece</h2>
              <p className="text-hecate-muted leading-relaxed mb-6 font-light">
                HECATE is a specialist furniture supplier for the hospitality industry. Since we started, our mission has always been to provide our clients with the highest quality products and customer service, while maintaining completely competitive pricing. Our dedicated team works closely with industry professionals to ensure projects are fulfilled successfully.
              </p>
              <p className="text-hecate-muted leading-relaxed mb-8 font-light">
                Whether you're redesigning your home or updating your workspace, our furniture pieces are crafted to enhance both style and comfort. We offer contemporary designs for modern office setups, living rooms, kitchens, and serene bedroom furnishings.
              </p>
              <Link to="/about" className="btn-outline">
                Learn More About Us
              </Link>
            </ScrollReveal>

            {/* Right Photo Column */}
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                  alt="Hecate Furniture Workshop"
                  className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                />
                {/* 15+ years floating card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg hidden md:block border border-hecate-border animate-float">
                  <span className="text-3xl font-serif font-bold text-hecate-secondary block">
                    15+
                  </span>
                  <span className="text-xs uppercase tracking-wider text-hecate-muted font-medium font-sans">
                    Years of Excellence
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 md:py-28 bg-hecate-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="section-label">Featured Collections</span>
              <h2 className="section-title">Products of the Month</h2>
              <p className="text-hecate-muted max-w-2xl mx-auto font-light">
                Discover our exclusive range of modern furniture. Each collection is thoughtfully designed to bring sophistication and functionality to your space.
              </p>
            </ScrollReveal>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="overflow-hidden h-56 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-2 text-hecate-primary">
                      {item.title}
                    </h3>
                    <p className="text-hecate-muted text-sm mb-4 font-light leading-relaxed h-12 overflow-hidden">
                      {item.desc}
                    </p>
                    <Link
                      to={item.path}
                      className="text-hecate-secondary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      <span>View Collection</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="section-label">What We Do</span>
              <h2 className="section-title">Our Furniture Services</h2>
              <p className="text-hecate-muted max-w-2xl mx-auto font-light">
                We deliver contemporary furniture solutions crafted for today's lifestyles, from modern living to kids' rooms.
              </p>
            </ScrollReveal>
          </div>

          {/* 5 columns responsive list */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whatWeDo.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="group bg-white rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full border border-hecate-border/50">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-hecate-cream flex items-center justify-center text-hecate-secondary group-hover:bg-hecate-secondary group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2 text-hecate-primary">
                    {item.title}
                  </h3>
                  <p className="text-hecate-muted text-xs leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 md:py-20 bg-hecate-cream border-y border-hecate-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} className="text-center">
                <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-hecate-secondary block">
                  {stat.value}
                </span>
                <span className="text-hecate-muted mt-2 text-xs md:text-sm font-medium uppercase tracking-wider block">
                  {stat.label}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTABanner */}
      <CTABanner />
    </div>
  );
};
