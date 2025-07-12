import { blogs, translations, type Blog, type Translation, type InsertBlog, type InsertTranslation, type BlogWithTranslation } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createBlog(blog: InsertBlog): Promise<Blog>;
  createTranslation(translation: InsertTranslation): Promise<Translation>;
  getBlogById(id: number): Promise<Blog | undefined>;
  getBlogByUrl(url: string): Promise<Blog | undefined>;
  getTranslationByBlogId(blogId: number): Promise<Translation | undefined>;
  getBlogWithTranslation(blogId: number): Promise<BlogWithTranslation | undefined>;
  getRecentTranslations(limit: number): Promise<BlogWithTranslation[]>;
}

export class DatabaseStorage implements IStorage {
  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const [blog] = await db
      .insert(blogs)
      .values(insertBlog)
      .returning();
    return blog;
  }

  async createTranslation(insertTranslation: InsertTranslation): Promise<Translation> {
    const [translation] = await db
      .insert(translations)
      .values(insertTranslation)
      .returning();
    return translation;
  }

  async getBlogById(id: number): Promise<Blog | undefined> {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog || undefined;
  }

  async getBlogByUrl(url: string): Promise<Blog | undefined> {
    const [blog] = await db.select().from(blogs).where(eq(blogs.url, url));
    return blog || undefined;
  }

  async getTranslationByBlogId(blogId: number): Promise<Translation | undefined> {
    const [translation] = await db.select().from(translations).where(eq(translations.blogId, blogId));
    return translation || undefined;
  }

  async getBlogWithTranslation(blogId: number): Promise<BlogWithTranslation | undefined> {
    const blog = await this.getBlogById(blogId);
    if (!blog) return undefined;
    
    const translation = await this.getTranslationByBlogId(blogId);
    if (!translation) return undefined;
    
    return { ...blog, translation };
  }

  async getRecentTranslations(limit: number): Promise<BlogWithTranslation[]> {
    const results = await db
      .select({
        id: blogs.id,
        url: blogs.url,
        title: blogs.title,
        content: blogs.content,
        wordCount: blogs.wordCount,
        createdAt: blogs.createdAt,
        translation: {
          id: translations.id,
          blogId: translations.blogId,
          summary: translations.summary,
          urduSummary: translations.urduSummary,
          createdAt: translations.createdAt,
        }
      })
      .from(blogs)
      .innerJoin(translations, eq(blogs.id, translations.blogId))
      .orderBy(desc(translations.createdAt))
      .limit(limit);

    return results.map(result => ({
      ...result,
      translation: result.translation
    }));
  }
}

export const storage = new DatabaseStorage();
