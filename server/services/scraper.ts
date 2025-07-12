import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedData {
  title: string;
  content: string;
  wordCount: number;
}

export async function scrapeBlog(url: string): Promise<ScrapedData> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 30000,
    });
    
    const $ = cheerio.load(response.data);
    
    // Remove script and style elements
    $('script, style, nav, header, footer, aside, .comments, .sidebar').remove();
    
    // Try to find the title
    let title = $('title').text().trim();
    if (!title) {
      title = $('h1').first().text().trim();
    }
    if (!title) {
      title = $('meta[property="og:title"]').attr('content')?.trim() || 'Untitled Blog Post';
    }
    
    // Try to find the main content
    let content = '';
    
    // Common content selectors
    const contentSelectors = [
      'article',
      '.post-content',
      '.entry-content',
      '.content',
      '.post-body',
      '.article-content',
      'main',
      '.main-content',
      '[role="main"]'
    ];
    
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text().trim();
        break;
      }
    }
    
    // If no content found with selectors, try to get text from body
    if (!content) {
      content = $('body').text().trim();
    }
    
    // Clean up the content
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();
    
    if (!content) {
      throw new Error('No content found on the page');
    }
    
    // Count words
    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    
    return {
      title,
      content,
      wordCount,
    };
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Blog post not found (404)');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied to the blog post');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. The blog site may be slow to respond.');
      }
    }
    throw new Error(`Failed to scrape blog: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
