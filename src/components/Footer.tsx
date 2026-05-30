import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MessageCircle, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper component for spring-animated hover links
const AnimatedFooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  return (
    <RouterLink to={to} className="relative block group select-none">
      <motion.div
        className="inline-block text-white/70 group-hover:text-blue-200 transition-colors duration-300"
        whileHover={{ x: 6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <span className="flex items-center gap-2">
          {/* Subtle slide-in horizontal accent line indicator */}
          <span className="w-0 h-[1.5px] bg-blue-300 inline-block transition-all duration-300 group-hover:w-2" />
          <span className="font-light text-sm">{children}</span>
        </span>
      </motion.div>
    </RouterLink>
  );
};

// Helper component for animated contact details
const AnimatedContactItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.li 
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="flex items-start gap-3 group text-white/70 font-light text-sm"
    >
      {children}
    </motion.li>
  );
};

export const Footer: React.FC = () => {
  // Staggered scroll variants
  const footerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <footer className="bg-hecate-primary text-white relative overflow-hidden shadow-[0_-15px_35px_rgba(0,0,0,0.18)]">
      {/* Top Banner Call to Action */}
      <div className="relative border-b border-white/10">
        {/* Animated slide-in top border line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 origin-left"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-1 tracking-wide">
                Want to Work with Us?
              </h3>
              <p className="text-white/75 max-w-xl font-light text-sm md:text-base leading-relaxed">
                From cost savings to quicker lead times, and better quality, we are your go-to contract furniture manufacturer.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <RouterLink
                to="/contact"
                className="btn-primary bg-white text-hecate-primary whitespace-nowrap hover:bg-hecate-secondary hover:text-white transition-all duration-300 px-8 py-3.5 rounded-full font-medium inline-block shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.45)]"
              >
                Let's Discuss
              </RouterLink>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <motion.div 
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {/* Brand Info */}
          <motion.div variants={columnVariants} className="sm:col-span-2 lg:col-span-1">
            <RouterLink to="/" className="inline-block mb-3 group">
              <motion.img 
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                src="/images/Logo White.png" 
                alt="Hecate Logo" 
                className="h-10 w-auto object-contain"
              />
            </RouterLink>
            <p className="text-white/75 text-sm leading-relaxed mb-4 font-light max-w-md">
              Premium contract furniture solutions for hospitality, corporate, and residential projects. Crafted with German precision and outstanding durability.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md border border-white/5"
                aria-label="Visit our Facebook page"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3.3 0-4 1.7-4 4v3z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 transition-colors shadow-md border border-white/5"
                aria-label="Visit our Instagram page"
              >
                <svg className="w-[18px] h-[18px] stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://api.whatsapp.com/send?phone=918697610701"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 transition-colors shadow-md border border-white/5"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={columnVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-white/90 font-sans border-b border-white/10 pb-2 relative">
              Quick Links
              {/* Animated header underline indicator */}
              <span className="absolute bottom-0 left-0 w-8 h-[1.5px] bg-blue-300" />
            </h4>
            <ul className="space-y-2">
              <li>
                <AnimatedFooterLink to="/">Home</AnimatedFooterLink>
              </li>
              <li>
                <AnimatedFooterLink to="/about">About</AnimatedFooterLink>
              </li>
              <li>
                <AnimatedFooterLink to="/services">Services</AnimatedFooterLink>
              </li>
              <li>
                <AnimatedFooterLink to="/projects">Projects</AnimatedFooterLink>
              </li>
              <li>
                <AnimatedFooterLink to="/certificates">Certifications</AnimatedFooterLink>
              </li>
              <li>
                <AnimatedFooterLink to="/contact">Contact</AnimatedFooterLink>
              </li>
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div variants={columnVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-white/90 font-sans border-b border-white/10 pb-2 relative">
              Our Services
              <span className="absolute bottom-0 left-0 w-8 h-[1.5px] bg-blue-300" />
            </h4>
            <ul className="space-y-2">
              <li>
                <AnimatedFooterLink to="/services/modern-living">Modern Living</AnimatedFooterLink>
              </li>
              <li>
                <AnimatedFooterLink to="/services/modern-kitchen">Modern Kitchen</AnimatedFooterLink>
              </li>
              <li>
                <AnimatedFooterLink to="/services/modern-office">Modern Office</AnimatedFooterLink>
              </li>
              <li>
                <AnimatedFooterLink to="/services/modern-bedroom">Modern Bedroom</AnimatedFooterLink>
              </li>
              <li>
                <AnimatedFooterLink to="/services/kids-baby-room">Kid's & Baby Room</AnimatedFooterLink>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={columnVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-white/90 font-sans border-b border-white/10 pb-2 relative">
              Contact Info
              <span className="absolute bottom-0 left-0 w-8 h-[1.5px] bg-blue-300" />
            </h4>
            <ul className="space-y-3">
              <AnimatedContactItem>
                <MapPin size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <span className="leading-relaxed">P 42 Arjun Park, A-50, Ahalyanagar, Purba Kalikapur, Kolkata, West Bengal 700099</span>
              </AnimatedContactItem>
              <AnimatedContactItem>
                <Mail size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <a href="mailto:hecatemodularfurniture@gmail.com" className="hover:text-blue-200 transition-colors duration-200">
                  hecatemodularfurniture@gmail.com
                </a>
              </AnimatedContactItem>
              <AnimatedContactItem>
                <Phone size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <a href="tel:+918697610701" className="hover:text-blue-200 transition-colors duration-200">
                  +91 86976 10701
                </a>
              </AnimatedContactItem>
              <AnimatedContactItem>
                <Clock size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </AnimatedContactItem>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Footer Copy */}
      <div className="border-t border-white/10 bg-black/15 relative">
        {/* Animated slow loading bottom divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 right-0 h-[1px] bg-white/15 origin-right"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60 font-light">
          <p>© 2026 Hecate Furniture Company. All rights reserved.</p>
          <div className="flex gap-2 items-center">
            <span>Powered by</span>
            <span className="text-white font-medium opacity-90 underline underline-offset-4 decoration-blue-300 decoration-[1.5px] cursor-default hover:text-blue-200 transition-colors">
              Hecate Digital
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
