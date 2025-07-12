import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Link as LinkIcon, Sparkles, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function BlogForm({ onSubmit, isLoading }: BlogFormProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a blog URL to translate",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url);
      onSubmit(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid blog URL",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Translation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Translate Blog Content to{" "}
            <span className="text-blue-600">Urdu</span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Simply paste any blog URL and get an AI-generated summary translated to Urdu. 
            Perfect for content creators, researchers, and language learners.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="shadow-lg border border-slate-200">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="blog-url" className="text-sm font-medium text-slate-700 mb-2">
                  Blog URL
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="blog-url"
                    type="url"
                    placeholder="https://example.com/blog-post"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10 py-3 border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Enter the URL of the blog post you want to translate to Urdu
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-3"
                  disabled={isLoading}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isLoading ? "Processing..." : "Translate to Urdu"}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3"
                  onClick={() => window.location.href = "#recent-translations"}
                >
                  <History className="h-4 w-4 mr-2" />
                  View Recent
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
