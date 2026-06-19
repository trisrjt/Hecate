import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { defaultBlogs } from '../data/defaultBlogs';
import type { BlogPostItem } from '../data/defaultBlogs';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPostItem | null>(null);
  const [otherBlogs, setOtherBlogs] = useState<BlogPostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      setIsLoading(true);
      let loadedBlog: BlogPostItem | null = null;
      let allLoadedBlogs: BlogPostItem[] = [];

      // 1. Fetch from Supabase
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('hecate_blogs')
            .select('*');

          if (error) throw error;
          if (data && data.length > 0) {
            allLoadedBlogs = data;
            loadedBlog = data.find((b: BlogPostItem) => b.slug === slug) || null;
          } else {
            // Auto-seed defaults into Supabase
            try {
              const blogsToSeed = defaultBlogs.map(({ id, ...rest }) => rest);
              const { data: seededData, error: seedError } = await supabase
                .from('hecate_blogs')
                .insert(blogsToSeed)
                .select();

              if (seedError) throw seedError;
              if (seededData && seededData.length > 0) {
                allLoadedBlogs = seededData;
                loadedBlog = seededData.find((b: BlogPostItem) => b.slug === slug) || null;
              } else {
                allLoadedBlogs = loadLocalBlogs();
                loadedBlog = allLoadedBlogs.find((b: BlogPostItem) => b.slug === slug) || null;
              }
            } catch (seedErr) {
              console.error('Failed to auto-seed blogs:', seedErr);
              allLoadedBlogs = loadLocalBlogs();
              loadedBlog = allLoadedBlogs.find((b: BlogPostItem) => b.slug === slug) || null;
            }
          }
        } catch (err) {
          console.error('Failed to load blog from Supabase, fetching from local:', err);
          allLoadedBlogs = loadLocalBlogs();
          loadedBlog = allLoadedBlogs.find((b: BlogPostItem) => b.slug === slug) || null;
        }
      } else {
        allLoadedBlogs = loadLocalBlogs();
        loadedBlog = allLoadedBlogs.find((b: BlogPostItem) => b.slug === slug) || null;
      }

      setBlog(loadedBlog);
      if (loadedBlog) {
        setOtherBlogs(allLoadedBlogs.filter((b: BlogPostItem) => b.slug !== slug).slice(0, 3));
      }
      setIsLoading(false);
    };

    fetchBlogPost();
  }, [slug]);

  const loadLocalBlogs = (): BlogPostItem[] => {
    const saved = localStorage.getItem('hecate_blogs');
    if (saved) {
      return JSON.parse(saved);
    } else {
      localStorage.setItem('hecate_blogs', JSON.stringify(defaultBlogs));
      return defaultBlogs;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-hecate-cream flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-hecate-secondary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-hecate-muted text-sm mt-4 font-sans font-light">Loading journal article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-hecate-cream">
      <SEO 
        pageKey={`blog-${slug}`} 
        defaultSettings={{
          title: `${blog.title} | Hecate Furniture Blog`,
          description: blog.excerpt,
          keywords: `blog, ${blog.category}, hecate, ${blog.author}`,
          ogTitle: blog.title,
          ogDescription: blog.excerpt,
        }}
      />

      <section className="py-20 md:py-28 bg-hecate-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-hecate-muted hover:text-hecate-secondary mb-10 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} />
            <span>All Journals</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left 2 Cols: Main Blog Content */}
            <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-xl border border-hecate-border shadow-sm">
              <ScrollReveal>
                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-xs text-hecate-muted uppercase tracking-wider mb-4 font-sans select-none font-semibold">
                  <span className="bg-hecate-cream text-hecate-secondary px-3 py-1 rounded-full text-[10px]">
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1 lg:mt-0">
                    <Calendar size={13} className="text-hecate-secondary" />
                    <span>
                      {new Date(blog.published_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 lg:mt-0">
                    <Clock size={13} className="text-hecate-secondary" />
                    <span>{blog.read_time}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-4xl font-serif font-bold text-hecate-primary leading-tight mb-6">
                  {blog.title}
                </h1>

                {/* Author Card info */}
                <div className="flex items-center gap-3 pb-6 border-b border-hecate-border/75 mb-8">
                  <div className="w-10 h-10 rounded-full bg-hecate-cream text-hecate-secondary border border-hecate-border flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-sm text-hecate-primary">{blog.author}</div>
                    <div className="text-[10px] uppercase tracking-wider text-hecate-muted">Contributor Author</div>
                  </div>
                </div>

                {/* Main cover Image */}
                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-hecate-border shadow mb-8 bg-hecate-cream">
                  <img 
                    src={blog.image || '/images/service-kitchen.jpg'} 
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Main HTML Content */}
                <div 
                  className="prose max-w-none text-hecate-text font-sans font-light leading-relaxed text-sm md:text-base space-y-6"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </ScrollReveal>
            </div>

            {/* Right Column: Other articles / suggestions */}
            <div className="space-y-8">
              {/* Other blogs sidebar */}
              <ScrollReveal delay={0.2}>
                <div className="bg-white rounded-xl p-8 border border-hecate-border shadow-sm space-y-6">
                  <h3 className="font-serif text-lg font-bold text-hecate-primary border-b border-hecate-border pb-3 flex items-center gap-2">
                    <BookOpen size={18} className="text-hecate-secondary" />
                    Recommended
                  </h3>
                  
                  {otherBlogs.length === 0 ? (
                    <p className="text-hecate-muted text-xs font-light">No other articles available.</p>
                  ) : (
                    <div className="space-y-5">
                      {otherBlogs.map((item) => (
                        <Link
                          key={item.id}
                          to={`/blog/${item.slug}`}
                          className="group block space-y-2 pb-5 border-b border-hecate-border/50 last:border-0 last:pb-0"
                        >
                          <div className="w-full aspect-[16/9] rounded overflow-hidden border border-hecate-border bg-hecate-cream">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="text-[10px] uppercase font-bold text-hecate-secondary tracking-wider mt-1">
                            {item.category}
                          </div>
                          <h4 className="font-serif text-sm font-bold text-hecate-primary group-hover:text-hecate-secondary transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-hecate-muted">
                            <Clock size={10} />
                            <span>{item.read_time}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* Design Consultation box */}
              <ScrollReveal delay={0.3}>
                <div className="bg-hecate-primary text-white rounded-xl p-8 border border-white/10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-hecate-secondary/10 rounded-full translate-x-12 -translate-y-12"></div>
                  <h3 className="font-serif text-xl font-bold mb-3 text-hecate-accent">
                    Modular Custom Fitting?
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed mb-6">
                    Connect with Kolkata's lead planners to custom design modular workspaces, premium living configurations, or custom kitchen packages.
                  </p>
                  <Link 
                    to="/contact" 
                    className="btn-primary bg-hecate-secondary text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 tracking-wider uppercase transition-all"
                  >
                    <span>Discuss Project</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
