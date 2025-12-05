import { useState, useEffect } from 'react';
import { Menu, X, Headphones, Phone, Mail } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Why Us', id: 'why-us' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-900/95 backdrop-blur-md shadow-lg shadow-amber-600/10 border-b border-amber-600/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 text-white hover:text-amber-400 transition-colors group"
            >
              <div className="p-2 bg-gradient-to-br from-primary-600 to-amber-600 rounded-lg group-hover:from-primary-500 group-hover:to-amber-500 transition-colors shadow-lg shadow-amber-600/30">
                <Headphones className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Globalexis</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-300 hover:text-amber-400 transition-colors font-medium relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-primary-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}

              <div className="flex items-center gap-4 pl-6 border-l border-dark-700">
                <a href="tel:+17035206130" className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">(703) 520-6130</span>
                </a>
                <a href="mailto:info@globalexisinc.com" className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">info@globalexisinc.com</span>
                </a>
              </div>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-7 py-2.5 bg-gradient-to-r from-primary-600 to-amber-600 hover:from-primary-500 hover:to-amber-500 text-white rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-600/50"
              >
                Get Started
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-dark-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="absolute top-20 right-0 left-0 bg-dark-900 border-t border-dark-700 shadow-xl animate-fade-in-down">
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-gray-300 hover:text-amber-400 hover:bg-dark-800 px-4 py-3 rounded-lg transition-all font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-amber-600 hover:from-primary-500 hover:to-amber-500 text-white rounded-lg font-medium transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
