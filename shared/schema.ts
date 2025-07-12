import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  wordCount: integer("word_count").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const translations = pgTable("translations", {
  id: serial("id").primaryKey(),
  blogId: integer("blog_id").references(() => blogs.id).notNull(),
  summary: text("summary").notNull(),
  urduSummary: text("urdu_summary").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBlogSchema = createInsertSchema(blogs).omit({
  id: true,
  createdAt: true,
});

export const insertTranslationSchema = createInsertSchema(translations).omit({
  id: true,
  createdAt: true,
});

export type Blog = typeof blogs.$inferSelect;
export type Translation = typeof translations.$inferSelect;
export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type InsertTranslation = z.infer<typeof insertTranslationSchema>;

export type BlogWithTranslation = Blog & {
  translation: Translation;
};
