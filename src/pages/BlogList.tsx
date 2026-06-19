import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageHeader } from '../components/PageHeader';
import { ScrollReveal } from '../components/ScrollReveal';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { defaultBlogs } from '../data/defaultBlogs';
import type { BlogPostItem } from '../data/defaultBlogs';

export const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('hecate_blogs')
            .select('*')
            .order('published_at', { ascending: false });

          if (error) throw error;
          if (data && data.length > 0) {
            setBlogs(data);
          } else {
            // Auto-seed defaults into Supabase if empty
            try {
              const blogsToSeed = defaultBlogs.map(({ id, ...rest }) => rest);
              const { data: seededData, error: seedError } = await supabase
                .from('hecate_blogs')
                .insert(blogsToSeed)
                .select();

              if (seedError) throw seedError;
              if (seededData && seededData.length > 0) {
                setBlogs(seededData);
              } else {
                loadLocalBlogs();
              }
            } catch (seedErr) {
              console.error('Failed to auto-seed blogs:', seedErr);
              loadLocalBlogs();
            }
          }
        } catch (err) {
          console.error('Failed to load blogs from Supabase, loading from LocalStorage:', err);
          loadLocalBlogs();
        }
      } else {
        loadLocalBlogs();
      }
      setIsLoading(false);
    };

    fetchBlogs();
  }, []);

  const loadLocalBlogs = () => {
    const saved = localStorage.getItem('hecate_blogs');
    if (saved) {
      setBlogs(JSON.parse(saved));
    } else {
      setBlogs(defaultBlogs);
      localStorage.setItem('hecate_blogs', JSON.stringify(defaultBlogs));
    }
  };

  const categories = ['All', 'Modular Kitchen', 'Office Space', 'Interior Trends', 'Modern Living', 'Bedroom & Wardrobes', 'Other'];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-hecate-cream">
      <SEO pageKey="blog" />

      {/* Hero Header */}
      <PageHeader 
        title="Design Journals" 
        subtitle="Insights, trends, and comprehensive design guides from Kolkata's premium modular furniture experts." 
        bgImage="/images/project-collab.jpg"
      />

      <section className="py-20 md:py-28 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-16 select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-hecate-secondary text-white border-hecate-secondary shadow-md'
                    : 'bg-white text-hecate-muted border-hecate-border hover:border-hecate-secondary hover:text-hecate-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-hecate-secondary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-hecate-muted text-sm mt-4 font-sans font-light">Loading journals...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-hecate-border shadow-sm max-w-xl mx-auto">
              <BookOpen size={48} className="text-hecate-muted/40 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-hecate-primary mb-2">No Articles Found</h3>
              <p className="text-hecate-muted text-sm font-light font-sans px-6">
                There are no articles published in this category yet. Check back soon for new updates.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {filteredBlogs.map((blog, idx) => (
                <ScrollReveal key={blog.id} delay={idx * 0.1} className="h-full">
                  <article className="group bg-white rounded-xl shadow-md border border-hecate-border overflow-hidden flex flex-col h-full hover:shadow-xl hover:border-hecate-secondary/30 transition-all duration-300">
                    
                    {/* Card Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-hecate-cream border-b border-hecate-border shrink-0">
                      <img 
                        src={blog.image || '/images/service-kitchen.jpg'} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 bg-hecate-primary text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-md shadow">
                        {blog.category}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-[10px] text-hecate-muted uppercase tracking-wider mb-3 select-none font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-hecate-secondary" />
                          <span>
                            {new Date(blog.published_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-hecate-secondary" />
                          <span>{blog.read_time}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg font-bold text-hecate-primary mb-3 leading-snug group-hover:text-hecate-secondary transition-colors line-clamp-2">
                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-hecate-muted text-xs md:text-sm font-light leading-relaxed mb-6 flex-1 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Read More button */}
                      <div className="pt-4 border-t border-hecate-border/50">
                        <Link 
                          to={`/blog/${blog.slug}`} 
                          className="inline-flex items-center gap-2 text-hecate-secondary hover:text-hecate-primary text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          <span>Read Full Story</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
