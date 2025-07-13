import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { scrapeBlog } from "./services/scraper";
import { translateToUrdu } from "./services/translator";
import { insertBlogSchema, insertTranslationSchema } from "@shared/schema";
import { z } from "zod";

const processBlogSchema = z.object({
  url: z.string().url(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Process blog URL - scrape, summarize, translate
  app.post("/api/blogs/process", async (req, res) => {
    try {
      const { url } = processBlogSchema.parse(req.body);
      
      // Check if blog already exists
      const existingBlog = await storage.getBlogByUrl(url);
      if (existingBlog) {
        const translation = await storage.getTranslationByBlogId(existingBlog.id);
        if (translation) {
          return res.json({ 
            blog: existingBlog, 
            translation,
            message: "Blog already processed" 
          });
        }
      }
      
      // Scrape blog content
      const scrapedData = await scrapeBlog(url);
      
      // Create blog record
      const blogData = insertBlogSchema.parse({
        url,
        title: scrapedData.title,
        content: scrapedData.content,
        wordCount: scrapedData.wordCount,
      });
      
      const blog = await storage.createBlog(blogData);
      
      // Generate summary (first 3 sentences)
      const sentences = scrapedData.content.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const summary = sentences.slice(0, 3).join('. ') + '.';
      
      // Translate to Urdu
      const urduSummary = await translateToUrdu(summary);
      
      // Create translation record
      const translationData = insertTranslationSchema.parse({
        blogId: blog.id,
        summary,
        urduSummary,
      });
      
      const translation = await storage.createTranslation(translationData);
      
      res.json({ blog, translation, message: "Blog processed successfully" });
    } catch (error) {
      console.error("Error processing blog:", error);
      res.status(500).json({ 
        error: "Failed to process blog",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Get blog with translation
  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const blogId = parseInt(req.params.id);
      const blogWithTranslation = await storage.getBlogWithTranslation(blogId);
      
      if (!blogWithTranslation) {
        return res.status(404).json({ error: "Blog not found" });
      }
      
      res.json(blogWithTranslation);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  });
  
  // Get recent translations
  app.get("/api/translations/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 6;
      const recentTranslations = await storage.getRecentTranslations(limit);
      res.json(recentTranslations);
    } catch (error) {
      console.error("Error fetching recent translations:", error);
      res.status(500).json({ error: "Failed to fetch recent translations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
