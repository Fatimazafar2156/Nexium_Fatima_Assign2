import { Link } from "wouter";

export function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-language text-white text-sm"></i>
            </div>
            <h1 className="text-xl font-semibold text-slate-900">Blog Translator</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">
              How it Works
            </a>
            <a href="#recent-translations" className="text-slate-600 hover:text-slate-900 transition-colors">
              Recent
            </a>
          </nav>
          <button className="md:hidden">
            <i className="fas fa-bars text-slate-600"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
