import { useEffect } from 'react';
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
  structuredData
}) => {
  const defaultOgImage = getMediaAsset('icon_pwa');
  const finalOgImage = ogImage || defaultOgImage?.url || '/lovable-uploads/8b735fe1-3282-48d6-9daa-a0e5ecb43911.png';
  
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
    
    // Update Twitter tags
    updateMetaTag('name', 'twitter:card', twitterCard);
    updateMetaTag('name', 'twitter:title', ogTitle || title);
    updateMetaTag('name', 'twitter:description', ogDescription || description);
    updateMetaTag('name', 'twitter:image', finalOgImage);

    // Update canonical URL automatically if not provided
    const currentUrl = typeof window !== 'undefined'
      ? window.location.origin + window.location.pathname + window.location.search
      : (canonical || '');
    const canonicalUrl = canonical || currentUrl;
    if (canonicalUrl) {
      updateCanonicalTag(canonicalUrl);
      // Keep URL consistency across social tags
      updateMetaTag('property', 'og:url', canonicalUrl);
      updateMetaTag('name', 'twitter:url', canonicalUrl);
    }

    // Robots directives
    updateMetaTag('name', 'robots', 'index, follow');
    updateMetaTag('name', 'googlebot', 'index, follow');

    // Add structured data if provided
    if (structuredData) {
      updateStructuredData(structuredData);
    }
  }, [title, description, keywords, canonical, ogTitle, ogDescription, finalOgImage, ogType, twitterCard, structuredData]);

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

  const updateStructuredData = (data: object) => {
    let element = document.querySelector('script[type="application/ld+json"]');
    if (!element) {
      element = document.createElement('script');
      element.setAttribute('type', 'application/ld+json');
      document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(data);
  };

  return null;
};

export default SEOHead;
