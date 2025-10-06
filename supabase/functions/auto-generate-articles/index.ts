import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

interface NewsSource {
  name: string;
  urls: string[];
  industry: string;
}

const newsSources: NewsSource[] = [
  { name: 'TechCrunch', urls: ['https://techcrunch.com/feed/'], industry: 'Technology' },
  { name: 'Google Finance', urls: ['https://news.google.com/rss/search?q=finance&hl=en-US&gl=US&ceid=US:en'], industry: 'Finance' },
  { name: 'Yahoo Finance', urls: ['https://finance.yahoo.com/news/rssindex','https://finance.yahoo.com/rss/','https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GSPC','https://feeds.finance.yahoo.com/rss/2.0/headline?s=AAPL'], industry: 'Business' }
];

async function fetchLatestNews(source: NewsSource) {
  try {
    const fetchWithTimeout = async (u: string, ms = 15000) => {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), ms);
      try { return await fetch(u, { signal: controller.signal }); }
      finally { clearTimeout(t); }
    };

    for (const url of source.urls) {
      try {
        console.log(`Fetching RSS from ${source.name}: ${url}`);
        const response = await fetchWithTimeout(url);
        const xml = await response.text();

        // Minimal RSS parsing without DOMParser
        const itemRegex = /<item>[\s\S]*?<\/item>/gi;
        const items = Array.from(xml.matchAll(itemRegex)).map(m => m[0]);
        if (items.length === 0) continue;

        const parse = (itemXml: string) => {
          const get = (tag: string) => (itemXml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\/${tag}>`, 'i'))?.[1] || '').replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1').trim();
          const title = get('title') || `Latest ${source.industry} News`;
          const link = get('link');
          const description = get('description');
          const pub = get('pubDate');
          return { title, link, description, pubDate: pub ? new Date(pub) : new Date(), industry: source.industry };
        };

        const parsed = items.map(parse).sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
        if (parsed[0]) return parsed[0];
      } catch (e) {
        console.warn(`RSS fetch/parse failed for ${url}:`, e);
        continue;
      }
    }

    throw new Error(`No items found for ${source.name}`);
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error);
    return {
      title: `${source.industry} Market Update`,
      link: '',
      description: `Latest developments in ${source.industry.toLowerCase()} sector`,
      industry: source.industry
    };
  }
}

async function generateEnhancedArticle(newsItem: any, openAIApiKey: string) {
  // Helper: fetch with timeout
  async function fetchText(url: string, ms = 15000): Promise<string> {
    try {
      if (!url) return '';
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), ms);
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SupabaseEdgeBot/1.0)' },
          signal: controller.signal,
        });
        return await res.text();
      } finally {
        clearTimeout(t);
      }
    } catch (e) {
      console.error('fetchText error:', e);
      return '';
    }
  }

  // Helper: extract readable text from an article URL (no DOMParser)
  async function extractArticleText(url: string): Promise<string> {
    const html = await fetchText(url);
    if (!html) return '';
    // Prefer content inside known wrappers by regex
    const wrappers = [
      /<article[\s\S]*?>([\s\S]*?)<\/article>/i,
      /<main[\s\S]*?>([\s\S]*?)<\/main>/i,
      /<div[^>]+class=["'][^"']*(article-content|entry-content|post-content|StoryBody|caas-body)[^"']*["'][\s\S]*?>([\s\S]*?)<\/div>/i,
    ];
    let section = '';
    for (const rx of wrappers) {
      const m = html.match(rx);
      if (m) { section = (m[1] || m[2] || '').trim(); if (section.length > 300) break; }
    }
    const source = section || html;
    const paragraphs = Array.from(source.matchAll(/<p[\s\S]*?>([\s\S]*?)<\/p>/gi))
      .map(m => m[1]
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .trim())
      .filter(Boolean);
    return paragraphs.join('\n\n');
  }

  // Helper: extract featured image from article URL (no DOMParser)
  async function extractFeaturedImage(url: string): Promise<string> {
    const html = await fetchText(url);
    if (!html) return '';

    const abs = (src: string) => {
      try { return src.startsWith('http') ? src : new URL(src, url).href; }
      catch { return src; }
    };

    const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i)?.[1];
    if (og) return abs(og);

    const tw = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i)?.[1];
    if (tw) return abs(tw);

    const img = html.match(/<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)(?:\?[^"']*)?)["'][^>]*>/i)?.[1];
    if (img) return abs(img);

    return '';
  }

  function estimateReadTime(text: string) {
    const words = (text.match(/\b\w+\b/g) || []).length;
    return Math.max(1, Math.ceil(words / 200));
  }

  const originalText = (await extractArticleText(newsItem.link)) || (newsItem.description || '');
  const baseContent = originalText.trim();
  
  // Extract featured image
  const featuredImage = await extractFeaturedImage(newsItem.link);

  // Fallback path when no OpenAI key is configured
  if (!openAIApiKey) {
    const content = baseContent || `${newsItem.description || ''}`;
    const read_time = estimateReadTime(content);
    return {
      title: newsItem.title,
      content,
      excerpt: (newsItem.description || content).slice(0, 150),
      category: newsItem.industry,
      tags: [newsItem.industry, 'market'],
      read_time,
      source_url: newsItem.link,
      featured_image: featuredImage,
      published: true,
      featured: Math.random() > 0.7,
    };
  }

  const system = 'You are a business editor. Append concise, factual context and implications. Do NOT rewrite or change the original article. No fabrication.';

  const userPrompt = `We have an original article from ${newsItem.industry}.
Title: ${newsItem.title}
Original content (do not change, for context only): """${baseContent.slice(0, 8000)}"""

Task: Produce JSON ONLY with keys:
{
  "title": "${newsItem.title}",
  "content": "Additional context, analysis, and industry implications to append after the original content. 4-6 short paragraphs.",
  "excerpt": "A brief summary under 150 characters highlighting the news and context.",
  "category": "${newsItem.industry}",
  "tags": ["${newsItem.industry}", "market", "insight"],
  "read_time": 0
}

Rules:
- Return ONLY valid JSON (no backticks, no text before/after).
- Keep neutral, journalistic tone.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1500,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content || '{}';

    let articleData: any;
    try {
      articleData = JSON.parse(raw);
    } catch (_) {
      const jsonSlice = raw.substring(raw.indexOf('{'), raw.lastIndexOf('}') + 1);
      articleData = JSON.parse(jsonSlice);
    }

    const addedContext = (articleData.content || '').trim();
    const combinedContent = baseContent
      ? `${baseContent}\n\n---\n\n${addedContext}`
      : addedContext;

    const read_time = articleData.read_time && Number(articleData.read_time) > 0
      ? Number(articleData.read_time)
      : estimateReadTime(combinedContent);

    return {
      ...articleData,
      title: articleData.title || newsItem.title,
      content: combinedContent,
      excerpt: (articleData.excerpt || newsItem.description || '').slice(0, 150),
      category: articleData.category || newsItem.industry,
      tags: Array.isArray(articleData.tags) ? articleData.tags : [newsItem.industry],
      read_time,
      source_url: newsItem.link,
      featured_image: featuredImage,
      published: true,
      featured: Math.random() > 0.7,
    };
  } catch (error) {
    console.error('Error generating article:', error);
    throw error;
  }
}

async function deleteOldArticles(supabaseClient: any) {
  try {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    
    const { data, error } = await supabaseClient
      .from('articles')
      .delete()
      .lt('created_at', twoMonthsAgo.toISOString());
    
    if (error) throw error;
    
    console.log(`Deleted ${data?.length || 0} articles older than 2 months`);
    return data;
  } catch (error) {
    console.error('Error deleting old articles:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY') ?? '';
    const aiEnabled = Boolean(openAIApiKey);
    if (!aiEnabled) {
      console.log('OPENAI_API_KEY not configured. Proceeding with fallback generation (no AI).');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting automated article generation...');

    // First, clean up old articles
    await deleteOldArticles(supabaseClient);

    // Generate 3 new articles from different sources
    const articles = [];
    
    for (const source of newsSources) {
      try {
        console.log(`Processing ${source.name} for ${source.industry}...`);
        
        // Fetch latest news
        const newsItem = await fetchLatestNews(source);
        
        // Generate enhanced article
        const enhancedArticle = await generateEnhancedArticle(newsItem, openAIApiKey);
        
        // Save to database
        const { data, error } = await supabaseClient
          .from('articles')
          .insert({
            title: enhancedArticle.title,
            content: enhancedArticle.content,
            excerpt: enhancedArticle.excerpt,
            category: enhancedArticle.category,
            tags: enhancedArticle.tags,
            read_time: enhancedArticle.read_time,
            published: enhancedArticle.published,
            featured: enhancedArticle.featured,
            source_url: enhancedArticle.source_url,
            featured_image: enhancedArticle.featured_image,
          })
          .select()
          .single();

        if (error) throw error;
        
        articles.push(data);
        console.log(`Successfully created article: ${data.title}`);
        
        // Add delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`Error processing ${source.name}:`, error);
        // Continue with other sources even if one fails
      }
    }

    console.log(`Article generation complete. Created ${articles.length} articles.`);

    return new Response(JSON.stringify({ 
      success: true, 
      articlesCreated: articles.length,
      articles: articles.map(a => ({ id: a.id, title: a.title, category: a.category }))
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in auto-generate-articles:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});