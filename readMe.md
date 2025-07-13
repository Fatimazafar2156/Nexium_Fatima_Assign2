# Blog Translator 

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
- **Database**: supabase
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
