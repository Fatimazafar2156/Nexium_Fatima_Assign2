import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Navbar } from "@/components/navbar";
import { BlogForm } from "@/components/blog-form";
import { LoadingState } from "@/components/loading-state";
import { TranslationResults } from "@/components/translation-results";
import { HowItWorks } from "@/components/how-it-works";
import { RecentTranslations } from "@/components/recent-translations";
import { useToast } from "@/hooks/use-toast";
import type { BlogWithTranslation } from "@shared/schema";

export default function Home() {
  const [result, setResult] = useState<BlogWithTranslation | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const processBlogMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest('POST', '/api/blogs/process', { url });
      return response.json();
    },
    onSuccess: (data) => {
      setResult({
        ...data.blog,
        translation: data.translation
      });
      
      // Show success toast
      toast({
        title: "Success!",
        description: data.message || "Blog translated successfully",
      });
      
      // Invalidate recent translations to refresh the list
      queryClient.invalidateQueries({ queryKey: ['/api/translations/recent'] });
    },
    onError: (error: any) => {
      console.error('Translation error:', error);
      toast({
        title: "Translation Failed",
        description: error.message || "Failed to translate the blog. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewTranslation = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {!result && !processBlogMutation.isPending && (
        <BlogForm 
          onSubmit={processBlogMutation.mutate} 
          isLoading={processBlogMutation.isPending}
        />
      )}
      
      {processBlogMutation.isPending && <LoadingState />}
      
      {result && (
        <TranslationResults 
          blogWithTranslation={result}
          onNewTranslation={handleNewTranslation}
        />
      )}
      
      <HowItWorks />
      <RecentTranslations />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-language text-white text-sm"></i>
                </div>
                <h3 className="text-xl font-semibold">Blog Translator</h3>
              </div>
              <p className="text-slate-400 mb-4">
                Making global content accessible through AI-powered translation technology.
              </p>
              <div className="flex space-x-4">
  <a
    href="https://www.linkedin.com/in/fatima-zafar-b9167a2a9/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 hover:text-white transition-colors"
  >
    <i className="fab fa-linkedin"></i>
  </a>
  <a
    href="https://www.instagram.com/fatemah_2156?igsh=MTAybmhuMTJ2bXhoMw%3D%3D&utm_source=qr"
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 hover:text-white transition-colors"
  >
    <i className="fab fa-instagram"></i>
  </a>
</div>

            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Translation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog Scraping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Content Storage</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Blog Translator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
