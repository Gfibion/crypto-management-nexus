import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMediaAsset } from '@/config/mediaAssets';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: object;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Gfibion Joseph Mutua - Professional Business Manager & ICT Consultant",
  description = "Professional business manager and ICT consultant specializing in strategic management, digital transformation, and technology integration. Expert in business consulting, strategic planning, and innovative solutions.",
  keywords = "business management consultant, ICT technology services, digital transformation, strategic planning, business strategy, technology integration, Joseph Mutua, Gfibion, business consultant, technology consultant, Kenya business manager, digital business solutions, entrepreneurship consulting, financial strategy, business process optimization, strategic management, business analytics, digital innovation, ICT consulting, business development, organizational transformation",
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  breadcrumbs
}) => {
  const location = useLocation();
  const defaultOgImage = getMediaAsset('icon_pwa');
  const baseUrl = 'https://www.josephmgfibion.org';
  
  // Use explicit canonical if provided, otherwise build from current path
  const finalCanonical = canonical || `${baseUrl}${location.pathname === '/' ? '' : location.pathname}`;
  
  // Ensure absolute URL for OG images
  const finalOgImage = ogImage 
    ? (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`)
    : (defaultOgImage?.url || `${baseUrl}/og-default.png`);
  
  useEffect(() => {
    // Update page title
    document.title = title;

    // Update meta description
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'author', 'Joseph Mutua (Gfibion), Founder of Gfibion Genesis');

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', ogTitle || title);
    updateMetaTag('property', 'og:description', ogDescription || description);
    updateMetaTag('property', 'og:image', finalOgImage);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:url', finalCanonical);
    updateMetaTag('property', 'og:site_name', 'Gfibion Joseph Mutua Portfolio');
    
    // Update Twitter tags
    updateMetaTag('name', 'twitter:card', twitterCard);
    updateMetaTag('name', 'twitter:title', ogTitle || title);
    updateMetaTag('name', 'twitter:description', ogDescription || description);
    updateMetaTag('name', 'twitter:image', finalOgImage);
    updateMetaTag('name', 'twitter:creator', '@GfibionJoseph');
    updateMetaTag('name', 'twitter:site', '@GfibionJoseph');
    updateMetaTag('name', 'twitter:url', finalCanonical);

    // Update canonical URL
    updateCanonicalTag(finalCanonical);

    // Robots directives
    updateMetaTag('name', 'robots', 'index, follow');
    updateMetaTag('name', 'googlebot', 'index, follow');

    // Add structured data if provided
    if (structuredData) {
      updateStructuredData(structuredData);
    }

    // Add breadcrumb structured data if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": `${baseUrl}${crumb.url}`
        }))
      };
      updateStructuredData(breadcrumbData, 'breadcrumb');
    }
  }, [title, description, keywords, finalCanonical, ogTitle, ogDescription, finalOgImage, ogType, twitterCard, structuredData, breadcrumbs, location.pathname]);

  const updateMetaTag = (attribute: string, name: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const updateCanonicalTag = (url: string) => {
    let element = document.querySelector('link[rel="canonical"]');
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      document.head.appendChild(element);
    }
    element.setAttribute('href', url);
  };

  const updateStructuredData = (data: object, id?: string) => {
    const selector = id 
      ? `script[type="application/ld+json"][data-id="${id}"]`
      : 'script[type="application/ld+json"]:not([data-id])';
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('script');
      element.setAttribute('type', 'application/ld+json');
      if (id) element.setAttribute('data-id', id);
      document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(data);
  };

  return null;
};

export default SEOHead;
