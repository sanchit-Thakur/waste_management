import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';

export default function Footer() {
  const { isDarkMode } = useThemeStore();

  return (
    <footer className={`w-full border-t transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-secondary border-accent-light-grey'}`}>
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-primary/80' : 'bg-primary'}`}>
                <Leaf className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className={`font-heading text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                E-Waste India
              </span>
            </div>
            <p className={`font-paragraph text-base ${isDarkMode ? 'text-gray-400' : 'text-foreground'}`}>
              Making responsible e-waste disposal accessible to every Indian citizen. Together, we can create a cleaner, safer environment.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className={`font-heading text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
              Quick Links
            </h3>
            <nav className="flex flex-col gap-4">
              <Link to="/" className={`font-paragraph text-base transition-colors ${isDarkMode ? 'text-gray-400 hover:text-primary' : 'text-foreground hover:text-primary'}`}>
                Home
              </Link>
              <Link to="/report" className={`font-paragraph text-base transition-colors ${isDarkMode ? 'text-gray-400 hover:text-primary' : 'text-foreground hover:text-primary'}`}>
                Report E-Waste
              </Link>
              <Link to="/impact" className={`font-paragraph text-base transition-colors ${isDarkMode ? 'text-gray-400 hover:text-primary' : 'text-foreground hover:text-primary'}`}>
                Impact & Education
              </Link>
              <Link to="/centers" className={`font-paragraph text-base transition-colors ${isDarkMode ? 'text-gray-400 hover:text-primary' : 'text-foreground hover:text-primary'}`}>
                Recycling Centers
              </Link>
            </nav>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className={`font-heading text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
              Contact Us
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className={`font-paragraph text-base ${isDarkMode ? 'text-gray-400' : 'text-foreground'}`}>
                  support@ewasteindia.gov.in
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className={`font-paragraph text-base ${isDarkMode ? 'text-gray-400' : 'text-foreground'}`}>
                  1800-XXX-XXXX (Toll Free)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`border-t mt-12 pt-8 text-center ${isDarkMode ? 'border-slate-700' : 'border-accent-light-grey'}`}>
          <p className={`font-paragraph text-sm ${isDarkMode ? 'text-gray-500' : 'text-foreground'}`}>
            © 2026 E-Waste India. A Government of India Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
