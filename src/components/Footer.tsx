import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MessageCircle, MapPin, Mail, Phone, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-hecate-primary text-white">
      {/* Top Banner Call to Action */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-2">
              Want to Work with Us?
            </h3>
            <p className="text-white/70 max-w-xl font-light text-sm md:text-base">
              From cost savings to quicker lead times, and better quality, we are your go-to contract furniture manufacturer.
            </p>
          </div>
          <RouterLink
            to="/contact"
            className="btn-primary bg-hecate-secondary text-white whitespace-nowrap hover:scale-105 transition-transform px-8 py-3.5 rounded-full"
          >
            Let's Discuss
          </RouterLink>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <RouterLink to="/" className="text-2xl font-serif font-bold text-hecate-secondary tracking-tight block mb-4">
              hecate
            </RouterLink>
            <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
              Premium contract furniture solutions for hospitality, corporate, and residential projects. Crafted with German precision and outstanding durability.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hecate-secondary transition-colors"
                aria-label="Visit our Facebook page"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3.3 0-4 1.7-4 4v3z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hecate-secondary transition-colors"
                aria-label="Visit our Instagram page"
              >
                <svg className="w-[18px] h-[18px] stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=918697610701"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hecate-secondary transition-colors"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-hecate-accent font-sans">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-white/70 font-light">
              <li>
                <RouterLink to="/" className="hover:text-hecate-accent transition-colors">
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/about" className="hover:text-hecate-accent transition-colors">
                  About
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/services" className="hover:text-hecate-accent transition-colors">
                  Services
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/projects" className="hover:text-hecate-accent transition-colors">
                  Projects
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/certificates" className="hover:text-hecate-accent transition-colors">
                  Certifications
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/contact" className="hover:text-hecate-accent transition-colors">
                  Contact
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-hecate-accent font-sans">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm text-white/70 font-light">
              <li>
                <RouterLink to="/services/modern-living" className="hover:text-hecate-accent transition-colors">
                  Modern Living
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/services/modern-kitchen" className="hover:text-hecate-accent transition-colors">
                  Modern Kitchen
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/services/modern-office" className="hover:text-hecate-accent transition-colors">
                  Modern Office
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/services/modern-bedroom" className="hover:text-hecate-accent transition-colors">
                  Modern Bedroom
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/services/kids-baby-room" className="hover:text-hecate-accent transition-colors">
                  Kid's & Baby Room
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-hecate-accent font-sans">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-white/70 font-light">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-hecate-accent shrink-0 mt-0.5" />
                <span>P 42 Arjun Park, A-50, Ahalyanagar, Purba Kalikapur, Kolkata, West Bengal 700099</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-hecate-accent shrink-0" />
                <a href="mailto:hecatemodularfurniture@gmail.com" className="hover:text-hecate-accent transition-colors">
                  hecatemodularfurniture@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-hecate-accent shrink-0" />
                <a href="tel:+918697610701" className="hover:text-hecate-accent transition-colors">
                  +91 86976 10701
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-hecate-accent shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Copy */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50 font-light">
          <p>© 2026 Hecate Furniture Company. All rights reserved.</p>
          <div className="flex gap-2">
            <span>Powered by</span>
            <span className="text-hecate-accent font-medium">Hecate Digital</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
