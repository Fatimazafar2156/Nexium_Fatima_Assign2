import { Card, CardContent } from "@/components/ui/card";

export function LoadingState() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <Card className="shadow-lg border border-slate-200">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
            <div className="text-slate-700">
              <h3 className="font-medium">Processing your blog...</h3>
              <p className="text-sm text-slate-500">This may take a few moments</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Scraping blog content...</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Generating AI summary...</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Translating to Urdu...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
