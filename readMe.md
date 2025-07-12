# Blog Translator - Replit.md

## Overview

This is a full-stack web application that scrapes blog content from URLs, generates summaries, and translates them to Urdu. The application provides a clean, modern interface for users to process blog articles and view their translations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Web Scraping**: Cheerio for HTML parsing and content extraction
- **Translation**: Simple dictionary-based English to Urdu translation
- **API Design**: RESTful endpoints for blog processing and retrieval

### Key Components

1. **Blog Processing Pipeline**
   - URL validation and scraping
   - Content extraction and cleaning
   - Summary generation (first 3 sentences)
   - Translation to Urdu using dictionary mapping
   - Database storage with deduplication

2. **Data Models**
   - **Blogs**: Store original blog content with metadata
   - **Translations**: Store summaries and Urdu translations linked to blogs

3. **User Interface**
   - Home page with blog URL input form
   - Loading states with progress indicators
   - Translation results display
   - Recent translations showcase
   - Individual blog detail pages

### Data Flow

1. User submits blog URL through the form
2. Backend validates URL and checks for existing entries
3. If new, scrapes content using Cheerio
4. Generates summary from first 3 sentences
5. Translates summary to Urdu using dictionary
6. Stores blog and translation in PostgreSQL
7. Returns processed data to frontend
8. Frontend displays results with sharing options

### External Dependencies

- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **cheerio**: Server-side HTML parsing and manipulation
- **axios**: HTTP client for web scraping
- **@tanstack/react-query**: Client-side data fetching and caching
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Deployment Strategy

- **Development**: Local development with Vite dev server and tsx for backend
- **Build Process**: 
  - Frontend: Vite builds React app to `dist/public`
  - Backend: esbuild bundles server code to `dist/index.js`
- **Production**: Single Node.js process serving both API and static files
- **Database**: Managed PostgreSQL through Neon with connection pooling
- **Environment**: Designed for Replit deployment with specific configurations

### Notable Design Decisions

1. **Monorepo Structure**: Client, server, and shared code in single repository
2. **Shared Schema**: Common TypeScript types and validation schemas
3. **Simple Translation**: Dictionary-based approach rather than AI/API translation
4. **Deduplication**: Prevents reprocessing of already translated blogs
5. **Responsive Design**: Mobile-first approach with Tailwind CSS
6. **Loading States**: Comprehensive feedback during async operations
7. **Error Handling**: User-friendly error messages and fallbacks

The application prioritizes simplicity and user experience while maintaining a clean, scalable architecture suitable for educational or demonstration purposes.