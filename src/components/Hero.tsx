import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533473359331-35a2304efbef?w=1600')] bg-cover bg-center opacity-20"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900"></div>

      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Elite Back-Office Services
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              for Luxury Transport
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Professional call handling, booking management, and customer support
            tailored exclusively for luxury ground transportation companies
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary-600/50 group"
            >
              Get Started Today
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="px-8 py-4 bg-dark-800/80 hover:bg-dark-700 backdrop-blur-sm text-white rounded-lg font-semibold text-lg transition-all hover:scale-105 border border-dark-600 hover:border-primary-600"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => scrollToSection('services')}
            className="inline-flex flex-col items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group"
          >
            <span className="text-sm uppercase tracking-wider font-medium">Discover Our Services</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent"></div>
    </section>
  );
}
