import React, { useState, useEffect } from 'react';
import { defaultSEOSettings, loadSEOSettings, saveSEOSettings } from '../components/SEO';
import type { SEOData } from '../components/SEO';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Search, Save, RotateCcw, Trash2, Mail, Phone, Calendar, ClipboardList, Settings, LogOut, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Inquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  projectType?: string;
  message: string;
  date: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'seo' | 'inquiries'>('seo');
  
  // SEO state
  const [seoSettings, setSeoSettings] = useState<Record<string, SEOData>>({});
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [currentPageData, setCurrentPageData] = useState<SEOData>({
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    noindex: false,
    nofollow: false,
    customHeadScript: '',
    customBodyScript: '',
  });
  
  // Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Feedback states
  const [toastMessage, setToastMessage] = useState('');

  // Load resources
  useEffect(() => {
    const fetchResources = async () => {
      // 1. Load SEO Settings
      let loadedData = defaultSEOSettings[selectedPage] || defaultSEOSettings.home;
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('hecate_seo_settings')
            .select('*')
            .eq('page_key', selectedPage)
            .single();

          if (error && error.code !== 'PGRST116') throw error;
          if (data) {
            loadedData = {
              title: data.title,
              description: data.description,
              keywords: data.keywords || '',
              ogTitle: data.og_title || data.title,
              ogDescription: data.og_description || data.description,
              noindex: data.noindex,
              nofollow: data.nofollow,
              customHeadScript: data.header_scripts || '',
              customBodyScript: data.body_scripts || '',
            };
          }
        } catch (err) {
          console.error('Failed to load SEO settings from Supabase, loading from LocalStorage:', err);
          const seo = loadSEOSettings();
          if (seo[selectedPage]) {
            loadedData = seo[selectedPage];
          }
        }
      } else {
        const seo = loadSEOSettings();
        if (seo[selectedPage]) {
          loadedData = seo[selectedPage];
        }
      }

      setCurrentPageData({
        title: loadedData.title || '',
        description: loadedData.description || '',
        keywords: loadedData.keywords || '',
        ogTitle: loadedData.ogTitle || loadedData.title || '',
        ogDescription: loadedData.ogDescription || loadedData.description || '',
        noindex: !!loadedData.noindex,
        nofollow: !!loadedData.nofollow,
        customHeadScript: loadedData.customHeadScript || '',
        customBodyScript: loadedData.customBodyScript || '',
      });

      // 2. Load Inquiries
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('hecate_inquiries')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          if (data) {
            const mapped = data.map((inq: any) => ({
              id: inq.id,
              firstName: inq.first_name,
              lastName: inq.last_name,
              email: inq.email,
              phone: inq.phone,
              company: inq.company || '',
              projectType: inq.project_type || '',
              message: inq.message,
              date: new Date(inq.created_at).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
            }));
            setInquiries(mapped);
          }
        } catch (err) {
          console.error('Failed to load inquiries from Supabase, loading from LocalStorage:', err);
          loadInquiriesFromLocalStorage();
        }
      } else {
        loadInquiriesFromLocalStorage();
      }
    };

    fetchResources();
  }, [selectedPage]);

  const loadInquiriesFromLocalStorage = () => {
    const savedInquiries = localStorage.getItem('hecate_inquiries');
    if (savedInquiries) {
      setInquiries(JSON.parse(savedInquiries));
    } else {
      setInquiries([]);
    }
  };

  // Sync state when page tab is selected
  const handlePageChange = async (page: string) => {
    setSelectedPage(page);
    let loadedData = seoSettings[page] || defaultSEOSettings[page] || defaultSEOSettings.home;
    
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('hecate_seo_settings')
          .select('*')
          .eq('page_key', page)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        if (data) {
          loadedData = {
            title: data.title,
            description: data.description,
            keywords: data.keywords || '',
            ogTitle: data.og_title || data.title,
            ogDescription: data.og_description || data.description,
            noindex: data.noindex,
            nofollow: data.nofollow,
            customHeadScript: data.header_scripts || '',
            customBodyScript: data.body_scripts || '',
          };
        }
      } catch (err) {
        console.error('Failed to sync page change from Supabase, using memory config:', err);
      }
    }

    setCurrentPageData({
      title: loadedData.title || '',
      description: loadedData.description || '',
      keywords: loadedData.keywords || '',
      ogTitle: loadedData.ogTitle || loadedData.title || '',
      ogDescription: loadedData.ogDescription || loadedData.description || '',
      noindex: !!loadedData.noindex,
      nofollow: !!loadedData.nofollow,
      customHeadScript: loadedData.customHeadScript || '',
      customBodyScript: loadedData.customBodyScript || '',
    });
  };

  // Input change in SEO fields
  const handleSeoFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCurrentPageData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setCurrentPageData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Save changes to localStorage / Supabase
  const handleSaveSEO = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('hecate_seo_settings').upsert({
          page_key: selectedPage,
          title: currentPageData.title,
          description: currentPageData.description,
          keywords: currentPageData.keywords,
          og_title: currentPageData.ogTitle,
          og_description: currentPageData.ogDescription,
          noindex: !!currentPageData.noindex,
          nofollow: !!currentPageData.nofollow,
          header_scripts: currentPageData.customHeadScript,
          body_scripts: currentPageData.customBodyScript,
          updated_at: new Date().toISOString(),
        });
        if (error) throw error;
      } catch (err) {
        console.error('Failed to save SEO settings to Supabase, saving to LocalStorage:', err);
        saveSEOToLocalStorage();
      }
    } else {
      saveSEOToLocalStorage();
    }

    // Dynamic browser title update if Home page edited
    if (selectedPage === 'home') {
      document.title = currentPageData.title;
    }

    // Success Toast
    setToastMessage('SEO settings saved successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const saveSEOToLocalStorage = () => {
    const seo = loadSEOSettings();
    const updated = {
      ...seo,
      [selectedPage]: currentPageData,
    };
    setSeoSettings(updated);
    saveSEOSettings(updated);
  };

  // Reset page to original default settings
  const handleResetSEO = async () => {
    const defaultData = defaultSEOSettings[selectedPage];
    const resetData = {
      title: defaultData.title || '',
      description: defaultData.description || '',
      keywords: defaultData.keywords || '',
      ogTitle: defaultData.ogTitle || '',
      ogDescription: defaultData.ogDescription || '',
      noindex: false,
      nofollow: false,
      customHeadScript: '',
      customBodyScript: '',
    };
    setCurrentPageData(resetData);
    
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('hecate_seo_settings')
          .delete()
          .eq('page_key', selectedPage);
        if (error) throw error;
      } catch (err) {
        console.error('Failed to reset SEO in Supabase, falling back to LocalStorage:', err);
        resetSEOInLocalStorage(resetData);
      }
    } else {
      resetSEOInLocalStorage(resetData);
    }

    setToastMessage('Reset page to factory SEO settings.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const resetSEOInLocalStorage = (resetData: SEOData) => {
    const seo = loadSEOSettings();
    const updated = {
      ...seo,
      [selectedPage]: resetData,
    };
    setSeoSettings(updated);
    saveSEOSettings(updated);
  };

  // Delete an inquiry lead
  const handleDeleteInquiry = async (id: string) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('hecate_inquiries')
          .delete()
          .eq('id', id);
        if (error) throw error;
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      } catch (err) {
        console.error('Failed to delete inquiry from Supabase, deleting from LocalStorage:', err);
        deleteFromLocalStorage(id);
      }
    } else {
      deleteFromLocalStorage(id);
    }

    setToastMessage('Inquiry deleted successfully.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const deleteFromLocalStorage = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem('hecate_inquiries', JSON.stringify(updated));
  };

  // Filtered inquiries list
  const filteredInquiries = inquiries.filter((inq) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${inq.firstName} ${inq.lastName}`.toLowerCase();
    return (
      fullName.includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      (inq.company || '').toLowerCase().includes(query) ||
      inq.message.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-hecate-cream flex flex-col md:flex-row font-sans text-sm">
      <SEO pageKey="admin" />

      {/* Admin success toast alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-hecate-primary text-white border border-hecate-accent/40 px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in fade-in-0 duration-300">
          <CheckCircle size={18} className="text-hecate-accent" />
          <span className="font-medium text-xs md:text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-hecate-primary text-white flex flex-col justify-between shrink-0 select-none border-r border-white/10">
        <div>
          {/* Header logo */}
          <div className="p-6 border-b border-white/10 flex flex-col">
            <span className="text-2xl font-serif font-bold text-hecate-secondary tracking-tight">
              hecate
            </span>
            <span className="text-[10px] uppercase tracking-widest text-hecate-accent font-medium mt-1">
              Admin Control Panel
            </span>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors uppercase tracking-wider text-xs font-semibold ${
                activeTab === 'seo'
                  ? 'bg-hecate-secondary text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Settings size={16} />
              <span>SEO Settings</span>
            </button>
            
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors relative uppercase tracking-wider text-xs font-semibold ${
                activeTab === 'inquiries'
                  ? 'bg-hecate-secondary text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ClipboardList size={16} />
              <span>Inquiries</span>
              {inquiries.length > 0 && (
                <span className="absolute right-4 bg-hecate-accent text-hecate-primary text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {inquiries.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Logout bottom */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              sessionStorage.removeItem('hecate_admin_auth');
              onLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-white/70 hover:bg-red-950/40 hover:text-red-300 transition-colors uppercase tracking-wider text-xs font-semibold"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen scrollbar-thin">
        {activeTab === 'seo' ? (
          <div className="space-y-8 w-full">
            {/* Top Bar selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-hecate-border">
              <div>
                <h1 className="text-2xl font-serif font-bold text-hecate-primary">
                  Search Engine Optimization
                </h1>
                <p className="text-hecate-muted text-xs font-light mt-1">
                  Select a route directory page below to dynamically update meta headers.
                </p>
              </div>

              {/* Selection list */}
              <div>
                <select
                  value={selectedPage}
                  onChange={(e) => handlePageChange(e.target.value)}
                  className="w-full sm:w-56 px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary text-hecate-text font-medium text-sm font-sans"
                >
                  <option value="home">Home Page ( / )</option>
                  <option value="about">About Page ( /about )</option>
                  <option value="services">Services Page ( /services )</option>
                  <option value="projects">Projects Page ( /projects )</option>
                  <option value="certificates">Certificates Page ( /certificates )</option>
                  <option value="contact">Contact Page ( /contact )</option>
                </select>
              </div>
            </div>

            {/* Config Form & Previews block */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              
              {/* Form Config Block */}
              <div className="bg-white rounded-xl shadow-sm p-8 border border-hecate-border space-y-6">
                <h2 className="text-lg font-serif font-bold text-hecate-primary border-b pb-3 border-hecate-border">
                  Configure Settings
                </h2>

                <div className="space-y-4">
                  {/* Meta Title */}
                  <div>
                    <label className="block text-xs font-semibold text-hecate-text mb-1">
                      Meta Page Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={currentPageData.title}
                      onChange={handleSeoFieldChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary font-light text-sm text-hecate-text font-sans"
                    />
                    <div className="flex justify-between mt-1 text-[10px] text-hecate-muted">
                      <span>Google recommends under 60 characters.</span>
                      <span className={currentPageData.title.length > 60 ? 'text-hecate-secondary font-medium' : ''}>
                        {currentPageData.title.length} characters
                      </span>
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="block text-xs font-semibold text-hecate-text mb-1">
                      Meta Description *
                    </label>
                    <textarea
                      name="description"
                      value={currentPageData.description}
                      onChange={handleSeoFieldChange}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary font-light text-sm text-hecate-text font-sans resize-none"
                    ></textarea>
                    <div className="flex justify-between mt-1 text-[10px] text-hecate-muted">
                      <span>Google recommends under 160 characters.</span>
                      <span className={currentPageData.description.length > 160 ? 'text-hecate-secondary font-medium' : ''}>
                        {currentPageData.description.length} characters
                      </span>
                    </div>
                  </div>

                  {/* Meta Keywords */}
                  <div>
                    <label className="block text-xs font-semibold text-hecate-text mb-1">
                      Meta Keywords (Comma separated)
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={currentPageData.keywords}
                      onChange={handleSeoFieldChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary font-light text-sm text-hecate-text font-sans"
                    />
                  </div>

                  {/* OG Title */}
                  <div>
                    <label className="block text-xs font-semibold text-hecate-text mb-1">
                      Open Graph Social Title
                    </label>
                    <input
                      type="text"
                      name="ogTitle"
                      value={currentPageData.ogTitle}
                      onChange={handleSeoFieldChange}
                      placeholder={currentPageData.title}
                      className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary font-light text-sm text-hecate-text font-sans"
                    />
                  </div>

                  {/* OG Description */}
                  <div>
                    <label className="block text-xs font-semibold text-hecate-text mb-1">
                      Open Graph Social Description
                    </label>
                    <textarea
                      name="ogDescription"
                      value={currentPageData.ogDescription}
                      onChange={handleSeoFieldChange}
                      placeholder={currentPageData.description}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary font-light text-sm text-hecate-text font-sans resize-none"
                    ></textarea>
                  </div>

                  {/* Search Engine Robots Indexing */}
                  <div className="pt-4 border-t border-hecate-border/50 space-y-3">
                    <h3 className="text-xs font-semibold text-hecate-primary uppercase tracking-wider font-sans">
                      Search Engine Indexing
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-start gap-3 bg-hecate-ivory/50 border border-hecate-border p-3.5 rounded-lg cursor-pointer hover:bg-hecate-cream/40 transition-colors select-none">
                        <input
                          type="checkbox"
                          name="noindex"
                          checked={!!currentPageData.noindex}
                          onChange={handleSeoFieldChange}
                          className="mt-1 accent-hecate-secondary cursor-pointer h-4 w-4"
                        />
                        <div className="text-xs font-sans">
                          <span className="font-semibold text-hecate-text block">Noindex</span>
                          <span className="text-[10px] text-hecate-muted leading-tight font-light block mt-0.5">
                            Hide page in search results.
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 bg-hecate-ivory/50 border border-hecate-border p-3.5 rounded-lg cursor-pointer hover:bg-hecate-cream/40 transition-colors select-none">
                        <input
                          type="checkbox"
                          name="nofollow"
                          checked={!!currentPageData.nofollow}
                          onChange={handleSeoFieldChange}
                          className="mt-1 accent-hecate-secondary cursor-pointer h-4 w-4"
                        />
                        <div className="text-xs font-sans">
                          <span className="font-semibold text-hecate-text block">Nofollow</span>
                          <span className="text-[10px] text-hecate-muted leading-tight font-light block mt-0.5">
                            Do not follow links on page.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Advanced SEO Scripts Injector */}
                  <div className="pt-4 border-t border-hecate-border/50 space-y-4">
                    <h3 className="text-xs font-semibold text-hecate-primary uppercase tracking-wider font-sans">
                      Advanced Code Injector
                    </h3>
                    
                    {/* Head Script */}
                    <div>
                      <label className="block text-xs font-semibold text-hecate-text mb-1">
                        Header Script Code (injects in &lt;head&gt;)
                      </label>
                      <textarea
                        name="customHeadScript"
                        value={currentPageData.customHeadScript || ''}
                        onChange={handleSeoFieldChange}
                        rows={4}
                        placeholder="<!-- Injects scripts/styles like Google Analytics or GTM -->&#10;<script>&#10;  console.log('Hecate custom code');&#10;</script>"
                        className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-primary text-green-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary resize-y scrollbar-thin"
                      ></textarea>
                    </div>

                    {/* Body Script */}
                    <div>
                      <label className="block text-xs font-semibold text-hecate-text mb-1">
                        Footer Script Code (injects at end of &lt;body&gt;)
                      </label>
                      <textarea
                        name="customBodyScript"
                        value={currentPageData.customBodyScript || ''}
                        onChange={handleSeoFieldChange}
                        rows={4}
                        placeholder="<!-- Injects code at the end of the page body -->&#10;<script>&#10;  // Custom metrics tracking&#10;</script>"
                        className="w-full px-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-primary text-green-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary resize-y scrollbar-thin"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 border-t border-hecate-border pt-6">
                  <button
                    onClick={handleSaveSEO}
                    className="btn-primary gap-2 bg-hecate-secondary text-white flex-1 py-2.5"
                  >
                    <Save size={16} />
                    Save Settings
                  </button>
                  
                  <button
                    onClick={handleResetSEO}
                    className="btn-outline gap-2 border-hecate-muted text-hecate-muted hover:bg-hecate-muted hover:text-white px-5 py-2.5"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>
                </div>
              </div>

              {/* Previews Sidebar Block */}
              <div className="space-y-6">
                
                {/* 1. Google Preview */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-hecate-border">
                  <h3 className="text-xs uppercase tracking-widest text-hecate-muted font-bold mb-4 font-sans border-b pb-2 border-hecate-border/50">
                    Google Search Result Preview
                  </h3>
                  <div className="space-y-1.5 p-4 bg-hecate-ivory/50 rounded-lg border border-hecate-border/30">
                    {/* URL */}
                    <div className="text-xs text-green-700 leading-none font-sans overflow-hidden text-ellipsis whitespace-nowrap">
                      https://hecatefurniture.com{selectedPage !== 'home' ? `/${selectedPage}` : ''}
                    </div>
                    {/* Title */}
                    <h4 className="text-[18px] text-[#1a0dab] font-sans hover:underline cursor-pointer leading-tight font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                      {currentPageData.title.slice(0, 60) || 'Hecate Furniture'}
                      {currentPageData.title.length > 60 ? '...' : ''}
                    </h4>
                    {/* Description */}
                    <p className="text-xs text-[#4d5156] font-sans leading-relaxed font-light break-words">
                      {currentPageData.description.slice(0, 160) || 'Premium contract furniture solutions...'}
                      {currentPageData.description.length > 160 ? '...' : ''}
                    </p>
                  </div>
                </div>

                {/* 2. Facebook card Preview */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-hecate-border">
                  <h3 className="text-xs uppercase tracking-widest text-hecate-muted font-bold mb-4 font-sans border-b pb-2 border-hecate-border/50">
                    Social Card Share Preview
                  </h3>
                  
                  {/* Simulated Social card */}
                  <div className="rounded-lg overflow-hidden border border-hecate-border/70 shadow-sm bg-hecate-ivory/40">
                    {/* Image */}
                    <div className="h-44 bg-hecate-cream overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80"
                        alt="SEO Share Thumbnail"
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                    {/* Data */}
                    <div className="p-4 border-t border-hecate-border/50 space-y-1 font-sans">
                      <div className="text-[10px] uppercase text-hecate-muted leading-none tracking-wide font-medium">
                        HECATEFURNITURE.COM
                      </div>
                      <h4 className="font-semibold text-hecate-primary text-sm line-clamp-1">
                        {currentPageData.ogTitle || currentPageData.title || 'Hecate Furniture'}
                      </h4>
                      <p className="text-xs text-hecate-muted leading-relaxed font-light line-clamp-2">
                        {currentPageData.ogDescription || currentPageData.description || 'Premium contract furniture solutions...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 w-full">
            {/* Top Header & Search inquiries bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-hecate-border">
              <div>
                <h1 className="text-2xl font-serif font-bold text-hecate-primary">
                  Customer Leads & Inquiries
                </h1>
                <p className="text-hecate-muted text-xs font-light mt-1">
                  Manage form queries, quote submissions, and requests generated from storefronts.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64 font-sans">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-hecate-muted pointer-events-none">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary text-sm text-hecate-text font-light"
                />
              </div>
            </div>

            {/* Inquiries list Table */}
            <div className="bg-white rounded-xl shadow-sm border border-hecate-border overflow-hidden">
              {filteredInquiries.length === 0 ? (
                <div className="p-16 text-center">
                  <div className="w-16 h-16 bg-hecate-cream rounded-full flex items-center justify-center text-hecate-secondary/40 mx-auto mb-4">
                    <ClipboardList size={32} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-hecate-primary mb-1">
                    No Inquiries Found
                  </h3>
                  <p className="text-hecate-muted text-sm font-light">
                    {searchQuery ? 'Try adjusting your search criteria.' : 'Customer leads submitted on storefront forms show up here.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left font-sans text-xs md:text-sm">
                    <thead>
                      <tr className="bg-hecate-cream border-b border-hecate-border text-hecate-primary font-semibold uppercase tracking-wider text-[10px] select-none">
                        <th className="p-4 whitespace-nowrap">Submitted</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4 whitespace-nowrap">Project Scope</th>
                        <th className="p-4 w-[40%]">Message / Requirements</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hecate-border/50 text-hecate-text font-light">
                      {filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-hecate-ivory/30 transition-colors">
                          {/* Date */}
                          <td className="p-4 whitespace-nowrap text-hecate-muted text-xs">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-hecate-secondary shrink-0" />
                              <span>{inq.date}</span>
                            </div>
                          </td>
                          {/* Contact */}
                          <td className="p-4">
                            <div className="font-medium text-hecate-primary text-sm">
                              {inq.firstName} {inq.lastName}
                            </div>
                            {inq.company && (
                              <div className="text-[10px] font-semibold text-hecate-accent uppercase tracking-wide mt-0.5">
                                {inq.company}
                              </div>
                            )}
                            <div className="space-y-0.5 mt-2 text-xs text-hecate-muted">
                              <a href={`mailto:${inq.email}`} className="flex items-center gap-1 hover:text-hecate-secondary transition-colors">
                                <Mail size={11} />
                                <span>{inq.email}</span>
                              </a>
                              <a href={`tel:${inq.phone}`} className="flex items-center gap-1 hover:text-hecate-secondary transition-colors">
                                <Phone size={11} />
                                <span>{inq.phone}</span>
                              </a>
                            </div>
                          </td>
                          {/* Project Scope */}
                          <td className="p-4 whitespace-nowrap text-xs font-semibold">
                            {inq.projectType ? (
                              <span className="bg-hecate-cream text-hecate-secondary px-3 py-1 rounded-full uppercase tracking-wider text-[9px]">
                                {inq.projectType}
                              </span>
                            ) : (
                              <span className="text-hecate-muted">—</span>
                            )}
                          </td>
                          {/* Message */}
                          <td className="p-4 leading-relaxed break-words text-xs text-hecate-muted font-light">
                            {inq.message}
                          </td>
                          {/* Action */}
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="w-9 h-9 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center mx-auto border border-red-200"
                              aria-label="Delete inquiry"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
