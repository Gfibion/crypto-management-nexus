import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = 'https://plnoqiktsyqwcwzlueri.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbm9xaWt0c3lxd2N3emx1ZXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTIzNzQsImV4cCI6MjA2NTQ2ODM3NH0.s4K-4IorBrQmjcHOqYj1qjaHyjoYMPRQKksdobQ-Cw0';

const BASE_URL = 'https://josephmgfibion.org';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const now = new Date().toISOString().split('T')[0];

    // Static pages with their priorities and change frequencies
    const staticPages: SitemapUrl[] = [
      { loc: '', lastmod: now, changefreq: 'daily', priority: 1.0 },
      { loc: '/about', lastmod: now, changefreq: 'monthly', priority: 0.8 },
      { loc: '/services', lastmod: now, changefreq: 'weekly', priority: 0.9 },
      { loc: '/portfolio', lastmod: now, changefreq: 'weekly', priority: 0.9 },
      { loc: '/articles', lastmod: now, changefreq: 'daily', priority: 0.9 },
      { loc: '/education', lastmod: now, changefreq: 'monthly', priority: 0.7 },
      { loc: '/chat', lastmod: now, changefreq: 'monthly', priority: 0.6 },
      { loc: '/donate', lastmod: now, changefreq: 'yearly', priority: 0.5 },
    ];

    // Fetch latest article updates to get accurate lastmod for articles page
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, updated_at, created_at')
      .eq('published', true)
      .order('updated_at', { ascending: false });

    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
    }

    // Update articles page lastmod based on most recent article
    if (articles && articles.length > 0) {
      const latestArticleDate = new Date(articles[0].updated_at).toISOString().split('T')[0];
      const articlesPageIndex = staticPages.findIndex(p => p.loc === '/articles');
      if (articlesPageIndex !== -1) {
        staticPages[articlesPageIndex].lastmod = latestArticleDate;
      }
    }

    // Fetch projects for portfolio page lastmod
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (!projectsError && projects && projects.length > 0) {
      const latestProjectDate = new Date(projects[0].updated_at).toISOString().split('T')[0];
      const portfolioPageIndex = staticPages.findIndex(p => p.loc === '/portfolio');
      if (portfolioPageIndex !== -1) {
        staticPages[portfolioPageIndex].lastmod = latestProjectDate;
      }
    }

    // Fetch education for education page lastmod
    const { data: education, error: educationError } = await supabase
      .from('education')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (!educationError && education && education.length > 0) {
      const latestEducationDate = new Date(education[0].updated_at).toISOString().split('T')[0];
      const educationPageIndex = staticPages.findIndex(p => p.loc === '/education');
      if (educationPageIndex !== -1) {
        staticPages[educationPageIndex].lastmod = latestEducationDate;
      }
    }

    // Fetch services for services page lastmod
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('updated_at')
      .eq('active', true)
      .order('updated_at', { ascending: false })
      .limit(1);

    if (!servicesError && services && services.length > 0) {
      const latestServiceDate = new Date(services[0].updated_at).toISOString().split('T')[0];
      const servicesPageIndex = staticPages.findIndex(p => p.loc === '/services');
      if (servicesPageIndex !== -1) {
        staticPages[servicesPageIndex].lastmod = latestServiceDate;
      }
    }

    // Build article URLs
    const articleUrls: SitemapUrl[] = (articles || []).map(article => ({
      loc: `/articles/${article.slug}`,
      lastmod: new Date(article.updated_at || article.created_at).toISOString().split('T')[0],
      changefreq: 'weekly' as const,
      priority: 0.8,
    }));

    // Combine all URLs
    const allUrls = [...staticPages, ...articleUrls];

    // Generate XML sitemap
    const xmlUrls = allUrls
      .map(
        (url) => `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`
      )
      .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlUrls}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate sitemap' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
