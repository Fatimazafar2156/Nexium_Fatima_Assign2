import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/navbar";
import { 
  ArrowLeft, 
  Languages, 
  Newspaper, 
  ExternalLink, 
  Copy, 
  Share, 
  Clock,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BlogWithTranslation } from "@shared/schema";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: blog, isLoading, error } = useQuery<BlogWithTranslation>({
    queryKey: ['/api/blogs', id],
    queryFn: async () => {
      const response = await fetch(`/api/blogs/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog not found');
        }
        throw new Error('Failed to fetch blog');
      }
      return response.json();
    },
  });

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
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
          title: blog?.title,
          text: blog?.translation.urduSummary,
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <h2 className="text-lg font-semibold text-red-900">
                  {error.message === 'Blog not found' ? 'Blog Not Found' : 'Error Loading Blog'}
                </h2>
              </div>
              <p className="text-red-700 mb-4">
                {error.message === 'Blog not found' 
                  ? 'The blog you\'re looking for doesn\'t exist or has been removed.'
                  : 'There was an error loading the blog. Please try again later.'
                }
              </p>
              <Button asChild>
                <Link href="/">Go Back Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {/* Blog Info */}
          <Card className="shadow-lg border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Newspaper className="h-8 w-8 text-slate-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-slate-900 mb-3">
                    {blog?.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                    <Badge variant="secondary">{blog?.wordCount} words</Badge>
                    <span>{Math.ceil((blog?.wordCount || 0) / 200)} min read</span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Scraped formatDate((blog?.createdAt as Date)?.toISOString() || '')
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <a href={blog?.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Original Article
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Urdu Translation */}
          <Card className="shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <h2 className="text-white font-semibold text-lg flex items-center space-x-2">
                <Languages className="h-5 w-5" />
                <span>Urdu Translation</span>
              </h2>
            </div>
            <CardContent className="p-6">
              <div className="prose prose-slate max-w-none">
                <div className="text-right leading-relaxed text-lg mb-6" dir="rtl" lang="ur">
                  <p className="text-slate-700">
                    {blog?.translation.urduSummary}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  {/* <span>Translated {formatDate(blog?.translation.createdAt || '')}</span> */}
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCopy(blog?.translation.urduSummary || '')}
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

          {/* Original Summary */}
          <Card className="shadow-lg border border-slate-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Original Summary (English)
              </h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed">
                  {blog?.translation.summary}
                </p>
              </div>
              <div className="flex items-center justify-end pt-4 border-t border-slate-200 mt-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(blog?.translation.summary || '')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Summary
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Full Content */}
          <Card className="shadow-lg border border-slate-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Full Article Content
              </h3>
              <div className="prose prose-slate max-w-none">
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {blog?.content}
                </div>
              </div>
              <div className="flex items-center justify-end pt-4 border-t border-slate-200 mt-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(blog?.content || '')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Full Text
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
