// Central configuration for all media assets
// Update these URLs when changing images

export interface MediaAsset {
  key: string;
  url: string;
  alt: string;
  type: 'logo' | 'avatar' | 'icon' | 'slideshow' | 'og_image';
  metadata?: Record<string, any>;
}

export const mediaAssets: Record<string, MediaAsset> = {
  logo_main: {
    key: 'logo_main',
    url: '/lovable-uploads/91d89c08-ff38-450a-b2a5-543fb578f2d3.png',
    alt: 'Gfibion Genesis - Venturing half future life',
    type: 'logo'
  },
  icon_pwa: {
    key: 'icon_pwa',
    url: '/lovable-uploads/8b735fe1-3282-48d6-9daa-a0e5ecb43911.png',
    alt: 'Gfibion Joseph Mutua',
    type: 'icon'
  },
  avatar_profile: {
    key: 'avatar_profile',
    url: '/lovable-uploads/e3e47c12-8857-4731-b46f-75afe5159159.png',
    alt: 'Gfibion Joseph Mutua',
    type: 'avatar'
  }
};

export const slideshowAssets: MediaAsset[] = [
  {
    key: 'slideshow_1',
    url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Strategic Business Management',
    type: 'slideshow',
    metadata: {
      title: 'Strategic Business Management',
      description: 'Fresh perspective on modern business solutions and strategic thinking',
      order: 1
    }
  },
  {
    key: 'slideshow_2',
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Technology Integration',
    type: 'slideshow',
    metadata: {
      title: 'Technology Integration',
      description: 'Bridging traditional business with cutting-edge technology solutions',
      order: 2
    }
  },
  {
    key: 'slideshow_3',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Digital Innovation',
    type: 'slideshow',
    metadata: {
      title: 'Digital Innovation',
      description: 'Leveraging emerging technologies for business transformation',
      order: 3
    }
  },
  {
    key: 'slideshow_4',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Professional Development',
    type: 'slideshow',
    metadata: {
      title: 'Professional Development',
      description: 'Continuous learning and adaptation in the evolving business landscape',
      order: 4
    }
  }
];

export const getMediaAsset = (key: string): MediaAsset | undefined => {
  return mediaAssets[key];
};

export const getSlides = () => slideshowAssets;
