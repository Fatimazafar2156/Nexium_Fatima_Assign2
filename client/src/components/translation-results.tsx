import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Languages, Newspaper, ExternalLink, Eye, Copy, Share, Plus, Download, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BlogWithTranslation } from "@shared/schema";

interface TranslationResultsProps {
  blogWithTranslation: BlogWithTranslation;
  onNewTranslation: () => void;
}

export function TranslationResults({ blogWithTranslation, onNewTranslation }: TranslationResultsProps) {
  const { toast } = useToast();
  const blog = blogWithTranslation;
  const translation = blogWithTranslation.translation;


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translation.urduSummary);
      toast({
        title: "Copied!",
        description: "Urdu summary copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: translation.urduSummary,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Page URL copied to clipboard",
        });
      } catch (error) {
        toast({
          title: "Share Failed",
          description: "Unable to share or copy link",
          variant: "destructive",
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="grid gap-6">
        {/* Success Alert */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-emerald-800 font-medium">Translation completed successfully!</p>
            <p className="text-emerald-600 text-sm">Your blog has been processed and saved to our database.</p>
          </div>
        </div>

        {/* Urdu Summary Card */}
        <Card className="shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h3 className="text-white font-semibold text-lg flex items-center space-x-2">
              <Languages className="h-5 w-5" />
              <span>Urdu Summary</span>
            </h3>
          </div>
          <CardContent className="p-6">
            <div className="prose prose-slate max-w-none">
              <div className="text-right leading-relaxed text-lg" dir="rtl" lang="ur">
                <p className="text-slate-700 mb-4">
                  {translation.urduSummary}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                {/* <span>Translated {formatDate(translation.createdAt)}</span> */}
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCopy}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleShare}
                  className="text-slate-600 hover:text-slate-700"
                >
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Original Blog Info */}
        <Card className="shadow-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-slate-900 font-semibold text-lg flex items-center space-x-2">
              <Newspaper className="h-5 w-5" />
              <span>Original Blog</span>
            </h3>
          </div>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Newspaper className="h-8 w-8 text-slate-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-slate-900 font-medium text-lg mb-2">
                  {blog.title}
                </h4>
                <p className="text-slate-600 text-sm mb-3 line-clamp-3">
                  {translation.summary}
                </p>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <Badge variant="secondary">{blog.wordCount} words</Badge>
                  <span>{Math.ceil(blog.wordCount / 200)} min read</span>
                  {/* <span>Scraped {formatDate(blog.createdAt)}</span> */}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="text-blue-600 hover:text-blue-700"
              >
                <a href={blog.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Original
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <Eye className="h-4 w-4 mr-1" />
                 Content
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 py-3"
            onClick={onNewTranslation}
          >
            <Plus className="h-4 w-4 mr-2" />
            Translate Another Blog
          </Button>
          <Button 
            variant="outline"
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3"
            onClick={() => {
              const content = `${blog.title}\n\n${translation.urduSummary}\n\nOriginal: ${blog.url}`;
              const blob = new Blob([content], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${blog.title.replace(/[^a-zA-Z0-9]/g, '_')}_urdu_translation.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Translation
          </Button>
        </div>
      </div>
    </section>
  );
}
