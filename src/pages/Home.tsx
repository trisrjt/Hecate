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
      image: '/images/hero-1.jpg',
      title: 'Redefining Spaces with Modern Elegance',
      subtitle: 'Premium contract furniture solutions for modern workplaces and homes',
    },
    {
      image: '/images/hero-2.jpg',
      title: 'Innovate Your Space, Inspire Your Life',
      subtitle: 'Bespoke furniture crafted for hospitality, corporate, and residential projects',
    },
    {
      image: '/images/hero-3.jpg',
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
      image: '/images/service-living.jpg',
      desc: 'Contemporary living room furniture designed for comfort and style.',
      path: '/services/modern-living',
      tag: 'Best Seller',
      stat: '12 Unique Designs',
      feature: 'Sleek & Modular'
    },
    {
      title: 'Modern Kitchen',
      image: '/images/service-kitchen.jpg',
      desc: 'Sleek modular kitchen solutions with premium finishes.',
      path: '/services/modern-kitchen',
      tag: 'German Hardware',
      stat: 'Fully Custom',
      feature: 'Soft-Close Systems'
    },
    {
      title: 'Modern Office',
      image: '/images/service-office.jpg',
      desc: 'Ergonomic workspace furniture for productive environments.',
      path: '/services/modern-office',
      tag: 'Ergonomic Focus',
      stat: 'Bulk & Custom Orders',
      feature: 'Smart Wire Channels'
    },
    {
      title: 'Modern Bedroom',
      image: '/images/service-bedroom.jpg',
      desc: 'Serene bedroom furnishings for restful spaces.',
      path: '/services/modern-bedroom',
      tag: 'Signature Care',
      stat: 'Premium Woodwork',
      feature: 'Integrated Lighting'
    },
  ];

  const whatWeDo = [
    {
      title: 'Modern Living',
      desc: 'Contemporary designs for stylish living spaces, crafted to maximize comfort and modern layouts.',
      icon: <Sofa className="size-8 stroke-[1.25]" />,
      num: '01',
      path: '/services/modern-living',
    },
    {
      title: 'Modern Office',
      desc: 'Professional workspaces designed to inspire productivity, using ergonomic contract standards.',
      icon: <Briefcase className="size-8 stroke-[1.25]" />,
      num: '02',
      path: '/services/modern-office',
    },
    {
      title: 'Modern Kitchen',
      desc: 'Sleek, functional modular kitchen interiors utilizing the absolute finest German machinery.',
      icon: <Flame className="size-8 stroke-[1.25]" />,
      num: '03',
      path: '/services/modern-kitchen',
    },
    {
      title: 'Modern Bedroom',
      desc: 'Serene bedroom furnishings curated to create a peaceful, elegant, and restful retreat.',
      icon: <Bed className="size-8 stroke-[1.25]" />,
      num: '04',
      path: '/services/modern-bedroom',
    },
    {
      title: "Kid's & Baby Room",
      desc: 'Playful, safe, and highly creative furniture options tailored for the growth of your little ones.',
      icon: <Baby className="size-8 stroke-[1.25]" />,
      num: '05',
      path: '/services/kids-baby-room',
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
              <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl mx-auto">
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight drop-shadow-lg"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md font-light leading-relaxed"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                  </div>
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
                  src="/images/about-workshop.jpg"
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
      <section className="py-20 md:py-28 bg-gradient-to-b from-hecate-cream to-hecate-ivory relative overflow-hidden">
        {/* Subtle decorative background blur spotlight */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-hecate-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-hecate-secondary/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-[1px] w-8 bg-hecate-accent/60" />
                <span className="section-label uppercase tracking-[0.25em] text-xs font-semibold text-hecate-accent">Featured Collections</span>
                <div className="h-[1px] w-8 bg-hecate-accent/60" />
              </div>
              <h2 className="section-title text-4xl md:text-5xl font-bold tracking-tight">Products of the Month</h2>
              <p className="text-hecate-muted max-w-2xl mx-auto font-light leading-relaxed mt-4">
                Discover our exclusive range of modern furniture. Each collection is thoughtfully designed to bring sophistication and functionality to your space.
              </p>
            </ScrollReveal>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <div className="group relative bg-white border border-hecate-border rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_45px_rgba(26,26,46,0.08)] transition-all duration-500 ease-snappy hover:-translate-y-2 flex flex-col justify-between h-[450px]">
                  {/* Decorative corner element */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[14px] border-t-hecate-accent/40 border-r-[14px] border-r-transparent z-20 group-hover:border-t-hecate-secondary transition-colors duration-300" />
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-[240px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-snappy"
                    />
                    
                    {/* Floating Luxury Tag */}
                    <span className="absolute top-4 left-4 z-20 bg-hecate-primary/95 backdrop-blur-md text-white text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full font-medium border border-white/10 font-sans shadow-md">
                      {item.tag}
                    </span>

                    {/* Numeric Accent */}
                    <span className="absolute bottom-3 right-4 z-20 font-serif italic text-4xl text-white/40 drop-shadow select-none group-hover:text-hecate-accent group-hover:scale-110 transition-all duration-500 ease-snappy">
                      {`0${idx + 1}`}
                    </span>

                    {/* Premium Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-hecate-primary/90 via-hecate-primary/30 to-transparent opacity-65 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Interactive Slide-up Glass Details */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-snappy bg-hecate-primary/75 backdrop-blur-md border-t border-white/10 flex justify-between items-center text-white z-10">
                      <span className="text-[10px] uppercase tracking-wider text-hecate-accent font-medium font-sans">
                        {item.feature}
                      </span>
                      <span className="text-[10px] text-white/80 font-light">
                        {item.stat}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between relative bg-white">
                    <div>
                      <h3 className="font-serif text-2xl font-bold mb-3 text-hecate-primary group-hover:text-hecate-secondary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-hecate-muted text-sm font-light leading-relaxed mb-4 line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                    
                    {/* Animated Button Link */}
                    <Link
                      to={item.path}
                      className="inline-flex items-center gap-2 group/btn font-sans text-xs uppercase tracking-widest font-semibold text-hecate-secondary hover:text-hecate-primary transition-colors duration-300 w-fit"
                    >
                      <span className="relative">
                        View Collection
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-hecate-primary group-hover/btn:w-full transition-all duration-300 ease-out" />
                      </span>
                      <div className="w-6 h-6 rounded-full bg-hecate-cream group-hover/btn:bg-hecate-secondary group-hover/btn:text-white flex items-center justify-center transition-all duration-300">
                        <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28 bg-hecate-ivory relative overflow-hidden">
        {/* Soft golden spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-hecate-accent/3 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-[1px] w-8 bg-hecate-accent/60" />
                <span className="section-label uppercase tracking-[0.25em] text-xs font-semibold text-hecate-accent">What We Do</span>
                <div className="h-[1px] w-8 bg-hecate-accent/60" />
              </div>
              <h2 className="section-title text-4xl md:text-5xl font-bold tracking-tight">Our Furniture Services</h2>
              <p className="text-hecate-muted max-w-2xl mx-auto font-light leading-relaxed mt-4">
                We deliver contemporary furniture solutions crafted for today's lifestyles, designed with precision engineering and timeless aesthetic appeal.
              </p>
            </ScrollReveal>
          </div>

          {/* 5 columns luxury list */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whatWeDo.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.12}>
                <Link 
                  to={item.path}
                  className="group relative block bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-[0_20px_45px_rgba(26,26,46,0.08)] transition-all duration-500 ease-snappy hover:-translate-y-2 h-full border border-hecate-border/50 overflow-hidden"
                >
                  {/* Blueprint Grid Pattern */}
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-500 bg-[radial-gradient(#1a1a2e_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
                  
                  {/* Small geometric numbering */}
                  <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-hecate-muted/50 group-hover:text-hecate-secondary transition-colors duration-300 font-bold border border-hecate-border/40 group-hover:border-hecate-secondary/30 px-2 py-0.5 rounded">
                    {item.num}
                  </div>

                  {/* Icon Wrapper inside squircle container */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-hecate-cream border border-hecate-border/40 flex items-center justify-center text-hecate-primary group-hover:bg-hecate-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-[6deg] transition-all duration-500 ease-snappy shadow-inner">
                    {item.icon}
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold mb-3 text-hecate-primary group-hover:text-hecate-secondary transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-hecate-muted text-xs leading-relaxed font-light mb-6">
                    {item.desc}
                  </p>

                  {/* Discover Link overlay */}
                  <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold text-hecate-accent group-hover:text-hecate-secondary transition-colors duration-300">
                    <span>Discover More</span>
                    <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>

                  {/* Premium bottom border glow */}
                  <div className="absolute bottom-0 inset-x-0 h-[3px] w-0 bg-gradient-to-r from-hecate-accent to-hecate-secondary group-hover:w-full transition-all duration-500 ease-snappy" />
                </Link>
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
