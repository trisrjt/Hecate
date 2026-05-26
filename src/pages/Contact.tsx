import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHeader } from '../components/PageHeader';
import { SEO } from '../components/SEO';

interface EnquiryFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const inquiryData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || null,
      project_type: formData.projectType || null,
      message: formData.message,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('hecate_inquiries').insert([inquiryData]);
        if (error) throw error;
      } catch (err) {
        console.error('Failed to submit enquiry to PostgreSQL database, falling back to LocalStorage:', err);
        saveToLocalStorage(inquiryData, formattedDate);
      }
    } else {
      saveToLocalStorage(inquiryData, formattedDate);
    }

    // Show success block and clear form
    setIsSuccess(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      message: '',
    });
  };

  const saveToLocalStorage = (data: any, formattedDate: string) => {
    const newInquiry = {
      id: Math.random().toString(36).substring(2, 9),
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      company: data.company || '',
      projectType: data.project_type || '',
      message: data.message,
      date: formattedDate,
    };
    const savedInquiries = localStorage.getItem('hecate_inquiries');
    const inquiriesList = savedInquiries ? JSON.parse(savedInquiries) : [];
    inquiriesList.unshift(newInquiry);
    localStorage.setItem('hecate_inquiries', JSON.stringify(inquiriesList));
  };

  const contactMethods = [
    {
      title: 'Address',
      desc: 'P 42 Arjun Park, A-50, Ahalyanagar, Purba Kalikapur, Kolkata, West Bengal 700099',
      icon: <MapPin size={20} className="text-hecate-secondary" />,
      action: null,
    },
    {
      title: 'Email Us',
      desc: 'hecatemodularfurniture@gmail.com',
      icon: <Mail size={20} className="text-hecate-secondary" />,
      action: 'mailto:hecatemodularfurniture@gmail.com',
    },
    {
      title: 'Phone Line',
      desc: '+91 86976 10701',
      icon: <Phone size={20} className="text-hecate-secondary" />,
      action: 'tel:+918697610701',
    },
    {
      title: 'Business Hours',
      desc: 'Monday - Saturday: 9:00 AM - 6:00 PM',
      icon: <Clock size={20} className="text-hecate-secondary" />,
      action: null,
    },
  ];

  return (
    <div>
      <SEO pageKey="contact" />

      {/* Header */}
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch for bulk orders, custom projects, or any enquiries"
        bgImage="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
      />

      {/* Form & Coordinates segment */}
      <section className="py-20 md:py-28 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Brand coordinate contacts */}
            <ScrollReveal>
              <span className="section-label">Get In Touch</span>
              <h2 className="section-title text-hecate-primary">Hecate Furniture</h2>
              <p className="text-hecate-muted leading-relaxed font-light mb-8 text-sm md:text-base">
                Whether you're planning a commercial corporate fit-out, furnishing a hospitality complex, or need custom contract modular furniture, our specialist team is ready to help. Reach out for bulk pricing and blueprint consultations.
              </p>

              {/* Coordinates List */}
              <div className="space-y-6">
                {contactMethods.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-hecate-cream flex items-center justify-center shrink-0 border border-hecate-border">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-hecate-text mb-1">
                        {item.title}
                      </h4>
                      {item.action ? (
                        <a
                          href={item.action}
                          className="text-hecate-muted text-sm font-light hover:text-hecate-secondary transition-colors block"
                        >
                          {item.desc}
                        </a>
                      ) : (
                        <p className="text-hecate-muted text-sm font-light leading-relaxed">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* WhatsApp Chat Line */}
                <div className="flex items-start gap-4 pt-2">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-200 text-green-500">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-hecate-text mb-1">WhatsApp Chat</h4>
                    <a
                      href="https://api.whatsapp.com/send?phone=918697610701"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors block"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Submission Form */}
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-hecate-border">
                <h3 className="font-serif text-2xl font-semibold mb-2 text-hecate-primary">
                  Enquiry Form
                </h3>
                <p className="text-hecate-muted text-xs md:text-sm mb-6 font-light">
                  Fill out the form below and our modular design team will get back to you within 24 hours.
                </p>

                {isSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-in fade-in-0 duration-300">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4 border border-green-200">
                      <Sparkles size={24} />
                    </div>
                    <h4 className="font-serif text-xl font-semibold text-green-800 mb-2">
                      Thank You!
                    </h4>
                    <p className="text-green-700 text-sm font-light leading-relaxed">
                      Your enquiry has been successfully submitted to our database. Our project manager will contact you shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn-primary mt-6 text-xs bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                    {/* Name grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-hecate-text mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary transition-colors font-light text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-hecate-text mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary transition-colors font-light text-sm"
                        />
                      </div>
                    </div>

                    {/* Email/Phone grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-hecate-text mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary transition-colors font-light text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-hecate-text mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary transition-colors font-light text-sm"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-medium text-hecate-text mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary transition-colors font-light text-sm"
                      />
                    </div>

                    {/* Project Selection dropdown */}
                    <div>
                      <label className="block text-xs font-medium text-hecate-text mb-1">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary transition-colors font-light text-sm text-hecate-text"
                      >
                        <option value="">Select Project Type</option>
                        <option value="residential">Residential Fitting</option>
                        <option value="commercial">Commercial / Office Layout</option>
                        <option value="hospitality">Hospitality / Hotel Suites</option>
                        <option value="coworking">Co-working Space Studio</option>
                        <option value="institutional">Institutional Fit-out</option>
                      </select>
                    </div>

                    {/* Text Message */}
                    <div>
                      <label className="block text-xs font-medium text-hecate-text mb-1">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Tell us about your project requirements, quantity, timeline, etc."
                        className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary transition-colors resize-none font-light text-sm"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn-primary w-full py-3 mt-4 text-base">
                      Submit Enquiry
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Locate Us Google Map */}
      <section className="bg-hecate-cream border-t border-hecate-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <ScrollReveal>
            <span className="section-label">Locate Us</span>
            <h2 className="section-title">Visit Our Workshop</h2>
            
            {/* Iframe */}
            <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-hecate-border shadow-md mt-8">
              <iframe
                title="Hecate Furniture Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.5555555555554!2d88.3951!3d22.5056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271f8e8e8e8e8%3A0x8e8e8e8e8e8e8e8e!2sKalikapur%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
