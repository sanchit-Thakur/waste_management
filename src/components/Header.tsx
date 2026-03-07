import { Link, useLocation } from 'react-router-dom';
import { Leaf, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import { Button } from '@/components/ui/button';

export default function Header() {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useThemeStore();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className={`w-full border-b transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-background border-accent-light-grey'}`}>
      <div className="max-w-[1200px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-primary/80' : 'bg-primary'}`}>
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className={`font-heading text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
              E-Waste India
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-paragraph text-base transition-colors ${isActive('/') ? `${isDarkMode ? 'text-primary font-semibold' : 'text-primary font-semibold'}` : `${isDarkMode ? 'text-gray-300 hover:text-primary' : 'text-foreground hover:text-primary'}`}`}
            >
              Home
            </Link>
            <Link 
              to="/report" 
              className={`font-paragraph text-base transition-colors ${isActive('/report') ? `${isDarkMode ? 'text-primary font-semibold' : 'text-primary font-semibold'}` : `${isDarkMode ? 'text-gray-300 hover:text-primary' : 'text-foreground hover:text-primary'}`}`}
            >
              Report E-Waste
            </Link>
            <Link 
              to="/impact" 
              className={`font-paragraph text-base transition-colors ${isActive('/impact') ? `${isDarkMode ? 'text-primary font-semibold' : 'text-primary font-semibold'}` : `${isDarkMode ? 'text-gray-300 hover:text-primary' : 'text-foreground hover:text-primary'}`}`}
            >
              Impact & Education
            </Link>
            <Link 
              to="/centers" 
              className={`font-paragraph text-base transition-colors ${isActive('/centers') ? `${isDarkMode ? 'text-primary font-semibold' : 'text-primary font-semibold'}` : `${isDarkMode ? 'text-gray-300 hover:text-primary' : 'text-foreground hover:text-primary'}`}`}
            >
              Recycling Centers
            </Link>
            <Link 
              to="/admin" 
              className={`font-paragraph text-base transition-colors ${isActive('/admin') ? `${isDarkMode ? 'text-primary font-semibold' : 'text-primary font-semibold'}` : `${isDarkMode ? 'text-gray-300 hover:text-primary' : 'text-foreground hover:text-primary'}`}`}
            >
              Collector Dashboard
            </Link>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className={`ml-4 ${isDarkMode ? 'bg-slate-800 border-slate-600 text-yellow-400 hover:bg-slate-700' : 'bg-white border-accent-light-grey text-gray-700'}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
