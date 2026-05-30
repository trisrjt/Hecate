import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sofa, Briefcase, Flame, Bed, Baby } from 'lucide-react';
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { CTABanner } from '../components/CTABanner';
import { SEO } from '../components/SEO';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericPart, {
        duration: 10,
        ease: [0.16, 1, 0.3, 1], // sleek cubic-bezier easing for high-end feels
        onUpdate(latest) {
          setDisplayValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericPart]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Ref and scroll progress for the services timeline animation
  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ["start 70%", "end center"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
            <motion.img
              src={slide.image}
              alt="Hecate Showroom"
              initial={{ scale: 1.1 }}
              animate={index === currentSlide ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 6, ease: 'easeOut' }}
              className="w-full h-full object-cover select-none"
            />
            {/* Minimal Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {index === currentSlide && (
              <div className="absolute inset-0 z-20 flex items-center justify-start px-6 md:px-12 lg:px-24">
                <div className="max-w-5xl">
                  {/* Title with overflow-hidden mask */}
                  <div className="overflow-hidden mb-6">
                    <motion.h1
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg"
                    >
                      {slide.title}
                    </motion.h1>
                  </div>

                  <div className="overflow-hidden mb-12">
                    <motion.p
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-lg md:text-xl text-white/80 font-light max-w-2xl"
                    >
                      {slide.subtitle}
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex gap-8"
                  >
                    <Link to="/contact" className="text-white text-xs uppercase tracking-[0.2em] border-b border-white pb-1 font-medium hover:text-hecate-accent hover:border-hecate-accent transition-colors">
                      Request a Quote
                    </Link>
                    <Link to="/projects" className="text-white/60 text-xs uppercase tracking-[0.2em] border-b border-transparent pb-1 font-medium hover:text-white transition-colors">
                      View Our Work
                    </Link>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        ))}
        {/* Minimal Indicators */}
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 z-20 flex gap-4 items-center">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[2px] transition-all duration-500 ${
                index === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>      {/* Who We Are (Welcome Section) */}
      <section className="py-24 md:py-32 bg-hecate-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-5 relative">
              <ScrollReveal delay={0.1} className="relative z-10">
                <span className="section-label mb-4 block">Who We Are</span>
                <h2 className="section-title mb-8 leading-tight">
                  Crafting Excellence <br className="hidden lg:block" /> in Every Piece
                </h2>
                <Link to="/about" className="btn-outline inline-flex items-center gap-3 group">
                  <span>Learn More About Us</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </ScrollReveal>
            </div>
            
            {/* Right Photo Column */}
            <div className="md:col-span-7 relative">
              <ScrollReveal delay={0.2} className="relative z-10">
                <div className="relative w-full aspect-[4/3]">
                  {/* Image container wrapper with overflow-hidden to support zoom-in effect */}
                  <div className="overflow-hidden w-full h-full bg-hecate-cream">
                    <motion.img
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      src="/images/about-workshop.jpg"
                      alt="Hecate Furniture Workshop"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating slowly spinning circular stamp badge */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="absolute -bottom-8 -left-8 bg-hecate-ivory rounded-full p-2 shadow-xl border border-hecate-secondary/10 hidden sm:block pointer-events-none z-20"
                  >
                    <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-28 md:h-28 text-hecate-secondary">
                      <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                      <text className="text-[7px] tracking-[0.16em] fill-current uppercase font-mono font-medium">
                        <textPath href="#circlePath" startOffset="0%">
                          Premium Contract Furniture • Hecate Signature •
                        </textPath>
                      </text>
                    </svg>
                    {/* Center point dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-hecate-accent" />
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="md:col-span-12 mt-12 md:mt-16">
              <ScrollReveal delay={0.3}>
                <div className="relative grid md:grid-cols-2 gap-12 lg:gap-24">
                  {/* Elegant Animated Vertical Line */}
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[1px] bg-hecate-secondary/15"
                  />
                  
                  <div className="hover:text-hecate-primary transition-colors duration-300">
                    <p className="text-hecate-muted leading-relaxed font-light text-lg">
                      <span className="font-serif font-bold text-hecate-secondary">HECATE is</span> a specialist furniture supplier for the hospitality industry. Since we started, our mission has always been to provide our clients with the highest quality products and customer service, while maintaining completely competitive pricing. Our dedicated team works closely with industry professionals to ensure projects are fulfilled successfully.
                    </p>
                  </div>
                  
                  <div className="hover:text-hecate-primary transition-colors duration-300">
                    <p className="text-hecate-muted leading-relaxed font-light text-lg">
                      Whether you're redesigning your home or updating your workspace, our furniture pieces are crafted to enhance both style and comfort. We offer contemporary designs for modern office setups, living rooms, kitchens, and serene bedroom furnishings.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 md:py-24 bg-hecate-ivory relative overflow-hidden border-t border-hecate-muted/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-12 md:mb-16">
            <ScrollReveal duration={1.2} yOffset={20}>
              <span className="section-label">Featured Collections</span>
              <h2 className="section-title">Products of the Month</h2>
            </ScrollReveal>
            {/* <ScrollReveal delay={0.2} className="hidden md:block pb-2">
               <Link to="/products" className="btn-outline text-sm">
                  View All Products
               </Link>
            </ScrollReveal> */}
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-16 md:gap-y-0">
            {collections.map((item, idx) => (
              <div 
                key={idx} 
                className={`group ${idx % 2 !== 0 ? 'md:mt-16' : 'md:mb-16'}`}
              >
                <ScrollReveal delay={idx * 0.15} duration={1.5} yOffset={25}>
                  <Link to={item.path} className="block overflow-hidden relative mb-8 bg-hecate-cream aspect-[4/5]">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6 text-xs font-mono tracking-widest text-hecate-primary bg-white/90 px-3 py-1 font-medium">
                      {`0${idx + 1}`}
                    </div>
                  </Link>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl font-bold mb-3 text-hecate-primary group-hover:text-hecate-secondary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-hecate-muted text-sm font-light leading-relaxed mb-4 line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-hecate-accent font-semibold pt-2">
                      {item.tag}
                    </span>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 md:py-32 bg-hecate-ivory text-hecate-primary overflow-hidden relative border-t border-b border-hecate-muted/10">
        {/* Subtle, soft ambient radial glows (volumetric lighting depth for light theme) */}
        <div className="absolute top-1/6 left-[10%] w-[450px] h-[450px] rounded-full bg-hecate-secondary/[0.02] blur-[140px] pointer-events-none z-0 select-none" />
        <div className="absolute bottom-1/6 right-[10%] w-[450px] h-[450px] rounded-full bg-hecate-accent/[0.02] blur-[140px] pointer-events-none z-0 select-none" />

        {/* Elegant typography brand watermarks vertically floating in the background */}
        <div 
          style={{ writingMode: 'vertical-rl' }}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-7xl md:text-8xl lg:text-[8rem] font-serif font-bold text-hecate-primary/[0.055] select-none pointer-events-none tracking-[0.2em] uppercase hidden xl:block z-0"
        >
          Hecate
        </div>
        <div 
          style={{ writingMode: 'vertical-rl' }}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl md:text-8xl lg:text-[8rem] font-serif font-bold text-hecate-primary/[0.055] select-none pointer-events-none tracking-[0.2em] uppercase hidden xl:block z-0"
        >
          Signature
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-20 md:mb-28 text-center">
            <ScrollReveal>
              <span className="section-label text-hecate-accent mb-4 block">What We Do</span>
              <h2 className="section-title text-hecate-primary" style={{ textShadow: '0 2px 8px rgba(26,26,46,0.04)' }}>Our Furniture Services</h2>
            </ScrollReveal>
          </div>

          <div ref={servicesRef} className="relative">
            {/* Central Vertical Timeline Line (Desktop Only) */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] z-10">
              {/* Subtle background track */}
              <div className="absolute inset-0 bg-hecate-primary/10" />
              {/* Dynamic scroll-drawn line linked to scroll progress */}
              <motion.div 
                style={{ scaleY }}
                className="absolute inset-0 bg-hecate-secondary origin-top shadow-[0_0_8px_#c41e3a]"
              />
            </div>

            {/* Alternating Timeline Steps Container */}
            <div className="space-y-16 md:space-y-24">
              {whatWeDo.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className="group relative grid md:grid-cols-12 gap-8 md:gap-0 items-center">
                    {/* Central Glass Node Circle (Desktop Only) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <motion.div 
                        whileHover={{ scale: 1.15 }}
                        className="w-14 h-14 rounded-full bg-white text-hecate-primary border border-hecate-primary/10 flex items-center justify-center shadow-[0_4px_20px_rgba(26,26,46,0.06)] group-hover:bg-hecate-secondary group-hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_15px_rgba(196,30,58,0.3)]"
                      >
                        <motion.div 
                          whileHover={{ rotate: 15 }}
                          className="text-hecate-primary group-hover:text-white transition-colors duration-500"
                        >
                          {item.icon}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Left Column Text (Even Indexes) */}
                    <div className={`md:col-span-5 ${isEven ? 'md:col-start-1 md:col-span-5' : 'hidden md:block'}`}>
                      {isEven && (
                        <ScrollReveal delay={0.1}>
                          <Link 
                            to={item.path} 
                            className="block relative p-6 md:p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-hecate-primary/[0.04] shadow-[0_8px_30px_rgba(26,26,46,0.03)] hover:shadow-[0_20px_40px_rgba(26,26,46,0.06)] hover:border-hecate-accent/20 hover:bg-white transition-all duration-500 group-hover:-translate-y-1 max-w-lg md:ml-auto text-left"
                          >
                            {/* Giant beautiful background watermark number inside card */}
                            <div className="absolute top-4 right-6 text-6xl md:text-7xl font-serif font-bold text-hecate-primary/[0.015] select-none pointer-events-none group-hover:text-hecate-accent/[0.03] transition-colors duration-500">
                              {item.num}
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-hecate-accent font-semibold mb-2 block">
                              Service {item.num}
                            </span>
                            <h3 className="text-xl md:text-2xl font-serif font-bold text-hecate-primary group-hover:text-hecate-secondary transition-colors duration-500 mb-3" style={{ textShadow: '0 1px 2px rgba(26,26,46,0.03)' }}>
                              {item.title}
                            </h3>
                            <p className="text-hecate-muted font-light text-sm md:text-base leading-relaxed mb-5 group-hover:text-hecate-text transition-colors duration-500">
                              {item.desc}
                            </p>
                            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b border-hecate-primary/10 pb-0.5 text-hecate-muted group-hover:text-hecate-secondary group-hover:border-hecate-secondary transition-all duration-300">
                              <span>Explore Service</span>
                              <ArrowRight size={12} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                          </Link>
                        </ScrollReveal>
                      )}
                    </div>

                    {/* Spacer Column (Desktop Only) */}
                    <div className="hidden md:block md:col-span-2" />

                    {/* Right Column Text (Odd Indexes) */}
                    <div className={`md:col-span-5 ${!isEven ? 'md:col-start-8 md:col-span-5' : 'hidden md:block'}`}>
                      {!isEven && (
                        <ScrollReveal delay={0.1}>
                          <Link 
                            to={item.path} 
                            className="block relative p-6 md:p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-hecate-primary/[0.04] shadow-[0_8px_30px_rgba(26,26,46,0.03)] hover:shadow-[0_20px_40px_rgba(26,26,46,0.06)] hover:border-hecate-accent/20 hover:bg-white transition-all duration-500 group-hover:-translate-y-1 max-w-lg text-left"
                          >
                            {/* Giant beautiful background watermark number inside card */}
                            <div className="absolute top-4 right-6 text-6xl md:text-7xl font-serif font-bold text-hecate-primary/[0.015] select-none pointer-events-none group-hover:text-hecate-accent/[0.03] transition-colors duration-500">
                              {item.num}
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-hecate-accent font-semibold mb-2 block">
                              Service {item.num}
                            </span>
                            <h3 className="text-xl md:text-2xl font-serif font-bold text-hecate-primary group-hover:text-hecate-secondary transition-colors duration-500 mb-3" style={{ textShadow: '0 1px 2px rgba(26,26,46,0.03)' }}>
                              {item.title}
                            </h3>
                            <p className="text-hecate-muted font-light text-sm md:text-base leading-relaxed mb-5 group-hover:text-hecate-text transition-colors duration-500">
                              {item.desc}
                            </p>
                            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b border-hecate-primary/10 pb-0.5 text-hecate-muted group-hover:text-hecate-secondary group-hover:border-hecate-secondary transition-all duration-300">
                              <span>Explore Service</span>
                              <ArrowRight size={12} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                          </Link>
                        </ScrollReveal>
                      )}
                    </div>

                    {/* Responsive Mobile Layout (Visible only on mobile screen widths) */}
                    <div className="md:hidden col-span-12 pl-12 relative border-l border-hecate-primary/10 ml-4 py-2">
                      {/* Floating Mobile Glass Node */}
                      <div className="absolute -left-6 top-2 w-12 h-12 rounded-full bg-white border border-hecate-primary/10 flex items-center justify-center text-hecate-accent shadow-md shadow-black/[0.02]">
                        {item.icon}
                      </div>
                      <ScrollReveal>
                        <Link 
                          to={item.path} 
                          className="block relative p-5 bg-white/60 backdrop-blur-md rounded-xl border border-hecate-primary/[0.03] shadow-[0_6px_20px_rgba(26,26,46,0.02)]"
                        >
                          <span className="text-[10px] uppercase tracking-[0.2em] text-hecate-accent font-semibold mb-1 block">
                            Service {item.num}
                          </span>
                          <h3 className="text-lg font-serif font-bold text-hecate-primary mb-2" style={{ textShadow: '0 1px 2px rgba(26,26,46,0.03)' }}>
                            {item.title}
                          </h3>
                          <p className="text-hecate-muted font-light text-xs leading-relaxed mb-4">
                            {item.desc}
                          </p>
                          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] border-b border-hecate-primary/10 pb-0.5 text-hecate-muted">
                            <span>Explore Service</span>
                            <ArrowRight size={10} className="-rotate-45" />
                          </div>
                        </Link>
                      </ScrollReveal>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-24 bg-hecate-ivory border-b border-hecate-muted/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {stats.map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="border-l border-hecate-primary/20 pl-6">
                  <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-hecate-secondary block mb-3">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <span className="text-hecate-muted text-xs uppercase tracking-wider font-medium block">
                    {stat.label}
                  </span>
                </div>
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
