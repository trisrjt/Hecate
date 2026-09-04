import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  noindex?: boolean;
  nofollow?: boolean;
  customHeadScript?: string;
  customBodyScript?: string;
}

export const defaultSEOSettings: Record<string, SEOData> = {
  home: {
    title: 'Hecate Furniture | Premium Custom & Modular Furniture',
    description: 'Specialist furniture supplier for the hospitality, corporate, and residential industry. Discover our high-quality custom contract furniture crafted with German precision.',
    keywords: 'furniture, custom furniture, hospitality furniture, modular kitchen, office workstations, kolkata furniture, hecate',
    ogTitle: 'Hecate Furniture | Premium Custom & Modular Furniture',
    ogDescription: 'Premium contract furniture solutions for modern workplaces, hotels, and homes. Crafted with German precision.',
  },
  about: {
    title: 'About Us | Hecate Furniture',
    description: 'HECATE is a specialist furniture supplier for the hospitality industry. Learn more about our mission, principles, and high-quality German-made machinery.',
    keywords: 'about hecate, furniture manufacturer, corporate furniture supplier, contract furniture',
    ogTitle: 'About Us | Hecate Furniture',
    ogDescription: 'Specialist Furniture Supplier for the Hospitality Industry. Learn about our expert team and principles.',
  },
  services: {
    title: 'Our Collections & Services | Hecate Furniture',
    description: 'Explore our modern furniture collections including Modern Living, Modern Kitchen, Modern Office, Modern Bedroom, and Kids Room furniture.',
    keywords: 'modular kitchen kolkata, modular office workspace, modular sofas, platform beds',
    ogTitle: 'Our Collections & Services | Hecate Furniture',
    ogDescription: 'Discover our elegant, durable furniture solutions custom-designed for every space.',
  },
  projects: {
    title: 'Our Recent Portfolio | Hecate Furniture',
    description: 'Explore our portfolio of recently completed corporate, hospitality, co-working, and residential furniture projects in Kolkata and beyond.',
    keywords: 'co-working space design, office fitout project, luxury apartment furnishing, projects in kolkata',
    ogTitle: 'Our Recent Portfolio | Hecate Furniture',
    ogDescription: 'Real-world showcases of custom modular office workspaces, hotel suites, and residential fit-outs.',
  },
  certificates: {
    title: 'Certifications & Accreditations | Hecate Furniture',
    description: 'HECATE is certified for international standards including GREEN GUARD, MSME Udyam, ISO 9001:2015, and BIFMA. Ensuring quality, durability, and safety.',
    keywords: 'greenguard certificate furniture, iso certified furniture, bifma certified chairs, msme udyam',
    ogTitle: 'Certifications & Accreditations | Hecate Furniture',
    ogDescription: 'Global benchmarks for chemical emission safety, quality systems, and institutional durability.',
  },
  contact: {
    title: 'Contact Us | Hecate Furniture',
    description: 'Get in touch with Hecate Furniture for bulk orders, commercial fit-outs, or project consultations. Fill our enquiry form or visit our workshop.',
    keywords: 'contact hecate, furniture workshop kolkata, custom furniture quote, phone number',
    ogTitle: 'Contact Us | Hecate Furniture',
    ogDescription: 'Enquire for bulk orders, request commercial pricing, or get dynamic project consultations.',
  },
  admin: {
    title: 'Admin Dashboard | Hecate Furniture Settings',
    description: 'Secure administrative portal for managing search engine optimization configurations and reviewing customer lead inquiries.',
    keywords: 'admin panel, seo manager',
    ogTitle: 'Admin Dashboard | Hecate Furniture',
    ogDescription: 'Secure administrative panel.',
  },
  blog: {
    title: 'Hecate Furniture Blog | Design Trends & Guides',
    description: 'Read the latest trends, guides, and tips in modern modular kitchen design, ergonomic office workspaces, and premium interior furniture.',
    keywords: 'furniture blog, kitchen design tips, office planning guide, home interior trends',
    ogTitle: 'Hecate Furniture Blog | Design Trends & Guides',
    ogDescription: 'Read the latest guides, trends, and expert tips in interior furniture designs.',
  },
  'service-modern-living': {
    title: 'Modern Living Collections | Hecate Furniture',
    description: 'Sophisticated and functional modular furniture for your living space. Discover contemporary sofas, coffee tables, and entertainment units.',
    keywords: 'modern living room, modular sofa, contemporary accent chairs, tv units kolkata',
    ogTitle: 'Modern Living Collections | Hecate Furniture',
    ogDescription: 'Premium modular furniture solutions for elegant living rooms.',
  },
  'service-modern-kitchen': {
    title: 'Modern Kitchen Design | Hecate Furniture',
    description: 'Sleek, modular, and functional kitchen interiors with premium cabinetry, soft-close mechanisms, and ergonomic layouts.',
    keywords: 'modular kitchen design, premium kitchen cabinets, kitchen islands kolkata',
    ogTitle: 'Modern Kitchen Interiors | Hecate Furniture',
    ogDescription: 'High-quality modular kitchen solutions crafted with German precision.',
  },
  'service-modern-office': {
    title: 'Modern Office Workspaces | Hecate Furniture',
    description: 'Ergonomic, modular office furniture systems designed to boost productivity. Workstations, conference tables, and executive desks.',
    keywords: 'modular office furniture, ergonomic chairs, corporate fit-out, workstations kolkata',
    ogTitle: 'Modern Office Solutions | Hecate Furniture',
    ogDescription: 'Ergonomic workspace designs for corporate and co-working environments.',
  },
  'service-modern-bedroom': {
    title: 'Modern Bedroom Collections | Hecate Furniture',
    description: 'Serene and premium bedroom furniture including custom platform beds, wardrobe systems, nightstands, and dressing tables.',
    keywords: 'platform bed frames, custom wardrobe, bedroom furniture supplier kolkata',
    ogTitle: 'Modern Bedroom Furniture | Hecate Furniture',
    ogDescription: 'Bespoke bedroom solutions combining comfort, style, and storage.',
  },
  'service-kids-baby-room': {
    title: "Kid's & Baby Room Furniture | Hecate Furniture",
    description: 'Creative, safe, and colorful furniture custom-made for children. Durable study tables, bunk beds, and toy storage units.',
    keywords: 'childrens furniture, bunk beds kolkata, study desks, nursery storage',
    ogTitle: "Kid's & Baby Room Collections | Hecate Furniture",
    ogDescription: 'Safe and playful modular furniture layouts designed for children.',
  }
};

export const loadSEOSettings = (): Record<string, SEOData> => {
  const saved = localStorage.getItem('hecate_seo_settings');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse SEO settings', e);
    }
  }
  return defaultSEOSettings;
};

export const saveSEOSettings = (settings: Record<string, SEOData>) => {
  localStorage.setItem('hecate_seo_settings', JSON.stringify(settings));
};

interface SEOProps {
  pageKey: string;
  defaultSettings?: SEOData;
}

export const SEO: React.FC<SEOProps> = ({ pageKey, defaultSettings }) => {
  const location = useLocation();
  const [pageSettings, setPageSettings] = useState<SEOData>(() => {
    return defaultSEOSettings[pageKey] || defaultSettings || defaultSEOSettings.home;
  });

  useEffect(() => {
    const defaultData = defaultSEOSettings[pageKey] || defaultSettings || defaultSEOSettings.home;

    const loadData = async () => {
      // 1. Try Supabase
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('hecate_seo_settings')
            .select('*')
            .eq('page_key', pageKey)
            .single();

          if (error && error.code !== 'PGRST116') {
            throw error;
          }

          if (data) {
            setPageSettings({
              title: data.title,
              description: data.description,
              keywords: data.keywords || '',
              ogTitle: data.og_title || data.title,
              ogDescription: data.og_description || data.description,
              noindex: data.noindex,
              nofollow: data.nofollow,
              customHeadScript: data.header_scripts || '',
              customBodyScript: data.body_scripts || '',
            });
            return;
          }
        } catch (err) {
          console.error('Supabase SEO fetch failed, loading from LocalStorage:', err);
        }
      }

      // 2. Fallback to LocalStorage
      const localSettings = loadSEOSettings();
      const pageLocal = localSettings[pageKey];
      if (pageLocal) {
        setPageSettings(pageLocal);
      } else {
        setPageSettings(defaultData);
      }
    };

    loadData();
  }, [pageKey, location.pathname]);

  useEffect(() => {
    if (!pageSettings) return;

    // 1. Title
    document.title = pageSettings.title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageSettings.description);

    // 3. Meta Keywords
    let metaKeys = document.querySelector('meta[name="keywords"]');
    if (!metaKeys) {
      metaKeys = document.createElement('meta');
      metaKeys.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeys);
    }
    metaKeys.setAttribute('content', pageSettings.keywords);

    // 4. Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', pageSettings.ogTitle || pageSettings.title);

    // 5. Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', pageSettings.ogDescription || pageSettings.description);

    // 6. Robots Meta (index, follow)
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    const indexVal = pageSettings.noindex ? 'noindex' : 'index';
    const followVal = pageSettings.nofollow ? 'nofollow' : 'follow';
    robotsMeta.setAttribute('content', `${indexVal}, ${followVal}`);

    // 7. Clean up previous injected scripts and style blocks
    document.querySelectorAll('[data-hecate-injected]').forEach((el) => el.remove());

    // 8. Inject custom head scripts/styles
    if (pageSettings.customHeadScript) {
      try {
        const fragment = document.createRange().createContextualFragment(pageSettings.customHeadScript);
        fragment.childNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            node.setAttribute('data-hecate-injected', 'head');
          }
        });
        document.head.appendChild(fragment);
      } catch (err) {
        console.error('Failed to inject head script:', err);
      }
    }

    // 9. Inject custom body scripts
    if (pageSettings.customBodyScript) {
      try {
        const fragment = document.createRange().createContextualFragment(pageSettings.customBodyScript);
        fragment.childNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            node.setAttribute('data-hecate-injected', 'body');
          }
        });
        document.body.appendChild(fragment);
      } catch (err) {
        console.error('Failed to inject body script:', err);
      }
    }
  }, [pageSettings]);

  return null;
};
