import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Leaf, GraduationCap, ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";
import type { BlogWithTranslation } from "@shared/schema";

export function RecentTranslations() {
  const { data: recentTranslations, isLoading } = useQuery<BlogWithTranslation[]>({
    queryKey: ['/api/translations/recent'],
    queryFn: async () => {
      const response = await fetch('/api/translations/recent?limit=6');
      if (!response.ok) throw new Error('Failed to fetch recent translations');
      return response.json();
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  const getIconForCategory = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('tech') || titleLower.includes('innovation') || titleLower.includes('ai')) {
      return <Newspaper className="h-5 w-5 text-blue-600" />;
    }
    if (titleLower.includes('environment') || titleLower.includes('climate') || titleLower.includes('green')) {
      return <Leaf className="h-5 w-5 text-emerald-600" />;
    }
    if (titleLower.includes('education') || titleLower.includes('learn') || titleLower.includes('school')) {
      return <GraduationCap className="h-5 w-5 text-purple-600" />;
    }
    return <Newspaper className="h-5 w-5 text-slate-600" />;
  };

  const getBackgroundColor = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('tech') || titleLower.includes('innovation') || titleLower.includes('ai')) {
      return 'bg-blue-100';
    }
    if (titleLower.includes('environment') || titleLower.includes('climate') || titleLower.includes('green')) {
      return 'bg-emerald-100';
    }
    if (titleLower.includes('education') || titleLower.includes('learn') || titleLower.includes('school')) {
      return 'bg-purple-100';
    }
    return 'bg-slate-100';
  };

  return (
    <section id="recent-translations" className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Recent Translations</h2>
          <p className="text-xl text-slate-600">
            See what others are translating
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="shadow-lg border border-slate-200">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-slate-200 rounded"></div>
                      <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-slate-200 rounded w-16"></div>
                      <div className="h-8 bg-slate-200 rounded w-16"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recentTranslations && recentTranslations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTranslations.map((item) => (
              <Card key={item.id} className="shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 ${getBackgroundColor(item.title)} rounded-lg flex items-center justify-center`}>
                      {getIconForCategory(item.title)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(item.translation.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3" dir="rtl" lang="ur">
                    {item.translation.urduSummary}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="secondary">{item.wordCount} words</Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      asChild
                      className="text-blue-600 hover:text-blue-700 p-0"
                    >
                      <Link href={`/blog/${item.id}`}>
                        View <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Newspaper className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No translations yet</h3>
            <p className="text-slate-600">Be the first to translate a blog post!</p>
          </div>
        )}

        {recentTranslations && recentTranslations.length > 0 && (
          <div className="text-center mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700">
              View All Translations
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

