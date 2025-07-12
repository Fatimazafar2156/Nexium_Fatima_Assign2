import { Card, CardContent } from "@/components/ui/card";
import { Link, Bot, Languages } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Our AI-powered system makes blog translation simple and efficient
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <Card className="shadow-lg border border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Paste URL</h3>
            <p className="text-slate-600">
              Simply paste the blog URL you want to translate into our secure form
            </p>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="shadow-lg border border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">2. AI Processing</h3>
            <p className="text-slate-600">
              Our AI scrapes the content, generates a summary, and translates it to Urdu
            </p>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="shadow-lg border border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Languages className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">3. Get Translation</h3>
            <p className="text-slate-600">
              Receive your Urdu translation and access the full blog content anytime
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
