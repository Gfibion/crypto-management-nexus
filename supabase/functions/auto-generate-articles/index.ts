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
  url: string;
  industry: string;
}

// Simplified news sources with working RSS feeds
const newsSources: NewsSource[] = [
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', industry: 'Technology' },
  { name: 'Reuters Business', url: 'https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best', industry: 'Business' },
  { name: 'BBC Business', url: 'http://feeds.bbci.co.uk/news/business/rss.xml', industry: 'Finance' }
];

interface NewsItem {
  title: string;
  link: string;
  description: string;
  industry: string;
  pubDate?: Date;
}

async function fetchLatestNews(source: NewsSource): Promise<NewsItem> {
  console.log(`[${source.name}] Starting fetch from: ${source.url}`);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ArticleBot/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const xmlText = await response.text();
    console.log(`[${source.name}] RSS feed fetched, length: ${xmlText.length}`);
    
    // Extract items from RSS feed
    const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/gi);
    
    if (!itemMatches || itemMatches.length === 0) {
      throw new Error('No items found in RSS feed');
    }
    
    console.log(`[${source.name}] Found ${itemMatches.length} items`);
    
    // Parse first item
    const firstItem = itemMatches[0];
    
    const extractTag = (xml: string, tag: string): string => {
      const cdataMatch = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\/${tag}>`, 'i'));
      if (cdataMatch) return cdataMatch[1].trim();
      
      const regularMatch = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'i'));
      if (regularMatch) return regularMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
      
      return '';
    };
    
    const title = extractTag(firstItem, 'title') || `Latest ${source.industry} News`;
    const link = extractTag(firstItem, 'link') || extractTag(firstItem, 'guid') || '';
    const description = extractTag(firstItem, 'description') || extractTag(firstItem, 'summary') || '';
    const pubDateStr = extractTag(firstItem, 'pubDate') || extractTag(firstItem, 'published');
    
    console.log(`[${source.name}] Parsed article: "${title.slice(0, 50)}..."`);
    
    return {
      title,
      link: link.trim(),
      description: description.replace(/<[^>]+>/g, '').slice(0, 500),
      industry: source.industry,
      pubDate: pubDateStr ? new Date(pubDateStr) : new Date()
    };
    
  } catch (error) {
    console.error(`[${source.name}] Error:`, error.message);
    
    // Return fallback article
    return {
      title: `${source.industry} Market Update - ${new Date().toLocaleDateString()}`,
      link: '',
      description: `Latest developments in the ${source.industry.toLowerCase()} sector. Stay informed with the latest industry trends and analysis.`,
      industry: source.industry,
      pubDate: new Date()
    };
  }
}

async function generateEnhancedArticle(newsItem: NewsItem, openAIApiKey: string) {
  console.log(`[AI] Processing: "${newsItem.title.slice(0, 50)}..."`);
  
  function estimateReadTime(text: string): number {
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }
  
  const baseContent = newsItem.description || '';
  
  // If no OpenAI key, return basic article
  if (!openAIApiKey) {
    console.log('[AI] No OpenAI key configured, using basic article');
    return {
      title: newsItem.title,
      content: baseContent || `# ${newsItem.title}\n\n${newsItem.description}`,
      excerpt: newsItem.description.slice(0, 150),
      category: newsItem.industry,
      tags: [newsItem.industry.toLowerCase(), 'news', 'market'],
      read_time: estimateReadTime(baseContent),
      source_url: newsItem.link,
      featured_image: null,
      published: true,
      featured: Math.random() > 0.7
    };
  }
  
  // Generate enhanced content with AI
  try {
    console.log('[AI] Calling OpenAI API...');
    
    const systemPrompt = `You are a professional business journalist. Create engaging, factual articles based on news headlines. Keep the tone professional and informative.`;
    
    const userPrompt = `Based on this news headline, write a comprehensive article:

Title: ${newsItem.title}
Summary: ${newsItem.description}
Category: ${newsItem.industry}

Write a 400-500 word article in markdown format. Include:
- An engaging introduction
- Key facts and implications
- Industry context
- A brief conclusion

Return ONLY valid JSON with this structure:
{
  "content": "markdown article content here",
  "excerpt": "brief 1-2 sentence summary under 150 characters",
  "tags": ["${newsItem.industry.toLowerCase()}", "tag2", "tag3"]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1200,
        temperature: 0.7,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AI] OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content || '{}';
    
    console.log('[AI] Response received, parsing...');
    
    let aiData;
    try {
      // Try to parse as JSON
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      aiData = JSON.parse(jsonMatch ? jsonMatch[0] : rawContent);
    } catch {
      console.error('[AI] Failed to parse JSON response');
      throw new Error('Invalid JSON response from AI');
    }
    
    const content = aiData.content || baseContent;
    const excerpt = aiData.excerpt || newsItem.description.slice(0, 150);
    const tags = Array.isArray(aiData.tags) ? aiData.tags : [newsItem.industry.toLowerCase(), 'news'];
    
    console.log('[AI] Article enhanced successfully');
    
    return {
      title: newsItem.title,
      content,
      excerpt,
      category: newsItem.industry,
      tags,
      read_time: estimateReadTime(content),
      source_url: newsItem.link,
      featured_image: null,
      published: true,
      featured: Math.random() > 0.7
    };
    
  } catch (error) {
    console.error('[AI] Enhancement failed:', error.message);
    
    // Fallback to basic article
    return {
      title: newsItem.title,
      content: baseContent || `# ${newsItem.title}\n\n${newsItem.description}`,
      excerpt: newsItem.description.slice(0, 150),
      category: newsItem.industry,
      tags: [newsItem.industry.toLowerCase(), 'news', 'market'],
      read_time: estimateReadTime(baseContent),
      source_url: newsItem.link,
      featured_image: null,
      published: true,
      featured: Math.random() > 0.7
    };
  }
}

async function deleteOldArticles(supabaseClient: any) {
  try {
    console.log('[Cleanup] Deleting articles older than 2 months...');
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    
    const { error } = await supabaseClient
      .from('articles')
      .delete()
      .lt('created_at', twoMonthsAgo.toISOString());
    
    if (error) throw error;
    
    console.log('[Cleanup] Old articles deleted successfully');
  } catch (error) {
    console.error('[Cleanup] Error:', error.message);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== Article Generation Started ===');
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY') ?? '';
    const aiEnabled = Boolean(openAIApiKey);
    
    if (!aiEnabled) {
      console.log('[Warning] OPENAI_API_KEY not configured. Articles will be basic summaries.');
    } else {
      console.log('[Info] OpenAI API key configured - enhanced articles will be generated');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }
    
    const supabaseClient = createClient(supabaseUrl, supabaseKey);
    console.log('[Info] Supabase client initialized');

    // Clean up old articles first
    await deleteOldArticles(supabaseClient);

    // Generate articles from each source
    const articles = [];
    const errors = [];
    
    for (const source of newsSources) {
      try {
        console.log(`\n[${source.name}] Starting processing...`);
        
        const newsItem = await fetchLatestNews(source);
        const enhancedArticle = await generateEnhancedArticle(newsItem, openAIApiKey);
        
        console.log(`[${source.name}] Saving to database...`);
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

        if (error) {
          console.error(`[${source.name}] Database error:`, error.message);
          errors.push({ source: source.name, error: error.message });
        } else {
          articles.push(data);
          console.log(`[${source.name}] ✓ Article created: ${data.id}`);
        }
        
        // Delay to avoid rate limiting
        if (newsSources.indexOf(source) < newsSources.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
      } catch (error) {
        console.error(`[${source.name}] Failed:`, error.message);
        errors.push({ source: source.name, error: error.message });
      }
    }

    console.log(`\n=== Generation Complete ===`);
    console.log(`Created: ${articles.length} articles`);
    console.log(`Errors: ${errors.length}`);

    return new Response(JSON.stringify({ 
      success: true, 
      articlesCreated: articles.length,
      articles: articles.map(a => ({ id: a.id, title: a.title, category: a.category })),
      errors: errors.length > 0 ? errors : undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('=== Fatal Error ===');
    console.error(error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});