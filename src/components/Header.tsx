import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="w-full bg-background border-b border-accent-light-grey">
      <div className="max-w-[1200px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl font-semibold text-foreground">
              E-Waste India
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-paragraph text-base ${isActive('/') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'} transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/report" 
              className={`font-paragraph text-base ${isActive('/report') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'} transition-colors`}
            >
              Report E-Waste
            </Link>
            <Link 
              to="/impact" 
              className={`font-paragraph text-base ${isActive('/impact') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'} transition-colors`}
            >
              Impact & Education
            </Link>
            <Link 
              to="/centers" 
              className={`font-paragraph text-base ${isActive('/centers') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'} transition-colors`}
            >
              Recycling Centers
            </Link>
            <Link 
              to="/admin" 
              className={`font-paragraph text-base ${isActive('/admin') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'} transition-colors`}
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
