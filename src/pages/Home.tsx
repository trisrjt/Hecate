import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sofa, Briefcase, Flame, Bed, Baby } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { CTABanner } from '../components/CTABanner';
import { SEO } from '../components/SEO';
import { projects } from './Projects';

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

  const slides: HeroSlide[] = [
    {
      image: '/images/hero-2.jpg',
      title: 'Redefining Spaces with Modern Elegance',
      subtitle: 'Premium contract furniture solutions for modern workplaces and homes',
    },
    {
      image: '/images/hero-3.jpg',
      title: 'Innovate Your Space, Inspire Your Life',
      subtitle: 'Bespoke furniture crafted for hospitality, corporate, and residential projects',
    },
    {
      image: '/images/hero-1.jpg',
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
      <section className="py-16 md:py-24 bg-hecate-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-5 relative">
              <ScrollReveal delay={0.1} className="relative z-10">
                <span className="section-label mb-3 block">Who We Are</span>
                <h2 className="section-title mb-6 leading-tight">
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
                          15+ Years Of Excellence • Hecate Furniture •
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
            
            <div className="md:col-span-12 mt-8 md:mt-10">
              <ScrollReveal delay={0.3}>
                <div className="relative grid md:grid-cols-2 gap-8 lg:gap-16">
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
      <section className="py-20 md:py-28 bg-hecate-primary relative overflow-hidden border-t border-hecate-muted/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <ScrollReveal duration={1.2} yOffset={20}>
              <span className="section-label">Featured Collections</span>
              <h2 className="section-title text-white">Projects of the Month</h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} duration={1.2} yOffset={20}>
                <Link 
                  to="/projects"
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-hecate-border/50 text-left block"
                >
                  <div className="overflow-hidden relative h-56">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Label Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-hecate-text text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm font-sans">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-semibold mb-1 text-hecate-primary group-hover:text-hecate-secondary transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-hecate-secondary text-xs font-medium uppercase tracking-wide mb-3 font-sans">
                      {item.location}
                    </p>
                    <p className="text-hecate-muted text-xs leading-relaxed line-clamp-2 font-light">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12 md:py-16 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
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
      <section className="py-12 md:py-16 bg-hecate-ivory border-b border-hecate-muted/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
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
