import { useState, useEffect } from 'react';
import { Menu, X, Headphones } from 'lucide-react';

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
            ? 'bg-dark-900/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 text-white hover:text-primary-400 transition-colors group"
            >
              <div className="p-2 bg-primary-600 rounded-lg group-hover:bg-primary-500 transition-colors">
                <Headphones className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Globalexis</span>
            </button>

            <div className="hidden md:flex items-center gap-8" style={{ margin: '120px 0 160px' }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-300 hover:text-primary-400 transition-colors font-medium relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary-600/50"
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
                  className="text-left text-gray-300 hover:text-primary-400 hover:bg-dark-800 px-4 py-3 rounded-lg transition-all font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-2 px-4 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-all"
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
