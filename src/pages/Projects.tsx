import React, { useState } from 'react';
import { X, Award, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHeader } from '../components/PageHeader';
import { SEO } from '../components/SEO';

export interface Project {
  title: string;
  location: string;
  category: 'Corporate' | 'Co-working' | 'Hospitality' | 'Residential';
  desc: string;
  image: string;
  gallery: string[];
}

export const projects: Project[] = [
    {
      title: 'Collab Deck Co-Working Space',
      location: 'Rawdon Street, Kolkata',
      category: 'Co-working',
      desc: 'A premium co-working space featuring custom modular workstations, collaborative lounges, and private phone booths designed for productivity and comfort.',
      image: '/images/project-collab.jpg',
      gallery: [
        '/images/service-office.jpg',
        '/images/about-workshop.jpg',
        '/images/project-collab.jpg',
      ],
    },
    {
      title: 'ICICI Bank Ltd',
      location: 'Delta Building, Salt Lake, Kolkata',
      category: 'Corporate',
      desc: 'Complete office fit-out including executive desks, customer service counters, meeting room furniture, and employee workstations.',
      image: '/images/project-bank.jpg',
      gallery: [
        '/images/service-office.jpg',
        '/images/about-workshop.jpg',
        '/images/project-bank.jpg',
      ],
    },
    {
      title: 'Serenity Residences',
      location: 'Ballygunge, Kolkata',
      category: 'Residential',
      desc: 'Full interior furnishing for a 24-unit luxury apartment complex including living room, bedroom, and kitchen furniture.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
      ],
    },
    {
      title: 'The Grand Hotel Suites',
      location: 'Park Street, Kolkata',
      category: 'Hospitality',
      desc: 'Custom furniture for 45 premium hotel suites including beds, wardrobes, lounge seating, and reception area.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
      ],
    },
    {
      title: 'TechHub Innovation Center',
      location: 'New Town, Kolkata',
      category: 'Corporate',
      desc: 'Complete corporate headquarters furnishing with high-density benching systems, director cabins, and pantry layouts.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=600&q=80',
      ],
    },
    {
      title: 'Green Valley Apartments',
      location: 'Rajarhat, Kolkata',
      category: 'Residential',
      desc: 'Bulk furniture supply for a 120-unit affordable housing project with modern living, bedroom, and kitchen solutions.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      ],
    },
  ];

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Corporate' | 'Co-working' | 'Hospitality' | 'Residential'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);

  const certificates = [
    {
      title: 'GREEN GUARD Certificate',
      image: '/images/awards.jpg',
      desc: 'Certified for low chemical emissions, ensuring indoor air quality and environmental safety.',
    },
    {
      title: 'Udyam Registration Certificate',
      image: '/images/awards.jpg',
      desc: 'Official MSME registration by the Government of India, recognizing us as a trusted manufacturer.',
    },
    {
      title: 'ISO 9001:2015 Certificate',
      image: '/images/awards.jpg',
      desc: 'International certification for our quality management systems, ensuring consistent product quality.',
    },
    {
      title: 'BIFMA Certification',
      image: '/images/awards.jpg',
      desc: 'Business and Institutional Furniture Manufacturers Association certification for safety, durability, and structural adequacy.',
    },
  ];

  const filteredProjects = projects.filter(
    (p) => activeFilter === 'All' || p.category === activeFilter
  );

  // Submits a pre-filled quote inquiry into PostgreSQL / localStorage so that it populates the admin dashboard instantly!
  const handleRequestSimilarProject = async (project: Project) => {
    const formattedDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const inquiryData = {
      first_name: 'Portfolio User',
      last_name: '(Auto-Generated)',
      email: 'client@portfolio-enquiry.com',
      phone: '+91 99999 99999',
      company: 'Project Interest',
      project_type: project.category.toLowerCase(),
      message: `Dear Hecate Team, I saw your portfolio item: "${project.title}" located at "${project.location}" and would like to request similar pricing and specifications for our project. Please contact us.`,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('hecate_inquiries').insert([inquiryData]);
        if (error) throw error;
      } catch (err) {
        console.error('Failed to submit similar project request to PostgreSQL database, falling back to LocalStorage:', err);
        saveProjectRequestToLocalStorage(inquiryData, formattedDate);
      }
    } else {
      saveProjectRequestToLocalStorage(inquiryData, formattedDate);
    }

    setIsSuccessMsg(true);
    setTimeout(() => {
      setIsSuccessMsg(false);
      setSelectedProject(null);
    }, 2500);
  };

  const saveProjectRequestToLocalStorage = (data: any, formattedDate: string) => {
    const newInquiry = {
      id: Math.random().toString(36).substring(2, 9),
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      projectType: data.project_type,
      message: data.message,
      date: formattedDate,
    };
    const saved = localStorage.getItem('hecate_inquiries');
    const list = saved ? JSON.parse(saved) : [];
    list.unshift(newInquiry);
    localStorage.setItem('hecate_inquiries', JSON.stringify(list));
  };

  return (
    <div>
      <SEO pageKey="projects" />

      {/* Header */}
      <PageHeader
        title="Our Recent Projects"
        subtitle="Explore our portfolio of completed commercial and residential furniture projects"
        bgImage="/images/project-collab.jpg"
      />

      {/* Portfolio segment */}
      <section className="py-20 md:py-28 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <ScrollReveal>
              <span className="section-label">Portfolio</span>
              <h2 className="section-title">Our Recent Projects</h2>
            </ScrollReveal>
          </div>

          {/* Filter Bar */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-12 font-sans">
              {(['All', 'Corporate', 'Co-working', 'Hospitality', 'Residential'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none ${
                    activeFilter === filter
                      ? 'bg-hecate-secondary text-white shadow-md'
                      : 'bg-white text-hecate-text border border-hecate-border hover:bg-hecate-cream hover:text-hecate-secondary'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-hecate-border/50"
                >
                  <div className="overflow-hidden relative h-56">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Label Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-hecate-text text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm font-sans">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-semibold mb-1 text-hecate-primary group-hover:text-hecate-secondary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-hecate-secondary text-xs font-medium uppercase tracking-wide mb-3 font-sans">
                      {project.location}
                    </p>
                    <p className="text-hecate-muted text-xs leading-relaxed line-clamp-2 font-light">
                      {project.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Trust Credentials (Certifications) */}
      <section className="py-20 md:py-28 bg-hecate-cream border-t border-hecate-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="section-label">Credentials</span>
              <h2 className="section-title">Certifications & Accreditations</h2>
              <p className="text-hecate-muted max-w-2xl mx-auto font-light">
                We adhere to the highest international standards for quality, safety, and environmental responsibility across every piece of modular furniture we deliver.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-hecate-border/50 h-full p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-hecate-cream flex items-center justify-center text-hecate-secondary">
                    <Award size={32} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2 text-hecate-primary group-hover:text-hecate-secondary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-hecate-muted text-xs leading-relaxed font-light">
                    {cert.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop opacity fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog container scale & fade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-hecate-border scrollbar-thin"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-hecate-border">
                <div>
                  <span className="text-[10px] bg-hecate-cream text-hecate-secondary px-3 py-1 rounded-full font-sans font-semibold uppercase tracking-wider mb-2 inline-block">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-hecate-primary leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-hecate-secondary font-medium mt-1">
                    {selectedProject.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full bg-hecate-cream flex items-center justify-center text-hecate-text hover:bg-hecate-secondary hover:text-white transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <p className="text-hecate-muted font-light leading-relaxed text-sm md:text-base">
                  {selectedProject.desc}
                </p>

                {/* Gallery Grid */}
                <div>
                  <h4 className="font-serif text-lg font-semibold mb-4 text-hecate-primary border-b pb-2 border-hecate-border/50">
                    Project Gallery
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedProject.gallery.map((imgUrl, sIdx) => (
                      <div
                        key={sIdx}
                        className="overflow-hidden rounded-lg border border-hecate-border aspect-[4/3]"
                      >
                        <img
                          src={imgUrl}
                          alt={`${selectedProject.title} detail ${sIdx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lead Request Button */}
                <div className="pt-4">
                  {isSuccessMsg ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-center justify-center gap-2 font-medium text-sm">
                      <CheckCircle2 size={16} className="text-green-500" />
                      Enquiry Submitted to Admin Panel! Opening Dashboard will show this.
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRequestSimilarProject(selectedProject)}
                      className="btn-primary w-full justify-center text-base py-3"
                    >
                      Request Similar Project Details
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
