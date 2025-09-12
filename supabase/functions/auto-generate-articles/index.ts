import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsSource {
  name: string;
  url: string;
  industry: string;
}

const newsSources: NewsSource[] = [
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', industry: 'Technology' },
  { name: 'Google Finance', url: 'https://news.google.com/rss/search?q=finance&hl=en-US&gl=US&ceid=US:en', industry: 'Finance' },
  { name: 'Yahoo Finance', url: 'https://feeds.finance.yahoo.com/rss/2.0/headline', industry: 'Business' }
];

async function fetchLatestNews(source: NewsSource) {
  try {
    console.log(`Fetching news from ${source.name}...`);
    const response = await fetch(source.url);
    const xmlText = await response.text();
    
    // Parse RSS feed to extract latest article
    const titleMatch = xmlText.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const linkMatch = xmlText.match(/<link>(.*?)<\/link>/);
    const descMatch = xmlText.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
    
    return {
      title: titleMatch ? titleMatch[1] : `Latest ${source.industry} News`,
      link: linkMatch ? linkMatch[1] : '',
      description: descMatch ? descMatch[1] : '',
      industry: source.industry
    };
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
  const prompt = `
Based on this news item from ${newsItem.industry}, create a comprehensive article:
Title: ${newsItem.title}
Description: ${newsItem.description}
Industry: ${newsItem.industry}

Please create a detailed, professional article (800-1200 words) that:
1. Expands on the original content with industry context
2. Adds relevant market analysis and implications
3. Includes potential future trends and considerations
4. Maintains journalistic integrity and factual accuracy
5. Uses engaging, professional tone suitable for business readers

Format the response as JSON:
{
  "title": "Enhanced article title",
  "content": "Full article content with proper paragraphs",
  "excerpt": "Brief summary (150 characters max)",
  "category": "${newsItem.industry}",
  "tags": ["relevant", "tags", "array"],
  "read_time": estimated_minutes
}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'You are a professional business journalist. Create comprehensive, well-researched articles based on news items.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const articleData = JSON.parse(data.choices[0].message.content);
    
    return {
      ...articleData,
      source_url: newsItem.link,
      published: true,
      featured: Math.random() > 0.7, // 30% chance of being featured
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
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
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