import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="w-full z-50 relative bg-hecate-ivory border-b border-hecate-border">
      {/* Top Contact Bar */}
      <div className="bg-hecate-primary text-white py-2 px-4 hidden md:block text-xs font-light tracking-wide">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a
              href="mailto:hecatemodularfurniture@gmail.com"
              className="flex items-center gap-2 hover:text-hecate-accent transition-colors"
            >
              <Mail size={12} className="text-hecate-accent" />
              <span>hecatemodularfurniture@gmail.com</span>
            </a>
            <a
              href="tel:+918697610701"
              className="flex items-center gap-2 hover:text-hecate-accent transition-colors"
            >
              <Phone size={12} className="text-hecate-accent" />
              <span>+91 86976 10701</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col select-none group">
            <span className="text-2xl font-serif font-bold text-hecate-secondary tracking-tight group-hover:text-hecate-primary transition-colors">
              hecate
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-widest text-hecate-muted -mt-1 font-medium font-sans">
              Custom & Modular Furniture
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 font-sans text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 transition-colors duration-200 uppercase tracking-wider text-xs group ${
                  isActive(link.path)
                    ? 'text-hecate-secondary font-semibold'
                    : 'text-hecate-text hover:text-hecate-secondary'
                }`}
              >
                <span>{link.name}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-hecate-secondary transform origin-left transition-transform duration-300 ease-snappy ${
                    isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary text-xs py-2 px-5 bg-hecate-secondary text-white rounded-full hover:scale-105 transition-transform"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-hecate-text hover:text-hecate-secondary focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-20 left-0 w-full bg-hecate-ivory border-b border-hecate-border z-40 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3 font-sans text-sm font-medium shadow-md">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg transition-colors uppercase tracking-wider text-xs ${
                    isActive(link.path)
                      ? 'bg-hecate-cream text-hecate-secondary font-bold'
                      : 'text-hecate-text hover:bg-hecate-cream/50 hover:text-hecate-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-hecate-border flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary text-center text-xs py-2.5 bg-hecate-secondary text-white rounded-full"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
