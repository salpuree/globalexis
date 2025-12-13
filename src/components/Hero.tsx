import { ChevronDown, Sparkles } from 'lucide-react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-full w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 border-b border-amber-600/10"
    >
      {/* Animated background with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/5717044/pexels-photo-5717044.jpeg?w=1600&q=80')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/20 to-dark-900/40"></div>

      {/* Floating glassmorphic elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-primary-600/5 to-amber-600/5 rounded-full blur-3xl animate-float-enhanced opacity-60"></div>
        <div className="absolute bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-amber-600/5 to-accent-600/5 rounded-full blur-3xl animate-float-enhanced opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-accent-600/3 to-amber-600/3 rounded-full blur-3xl animate-float-enhanced opacity-40" style={{ animationDelay: '2s', transform: 'translate(-50%, -50%)' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 lg:py-12">
        <div className="animate-fade-in-up">
          {/* Accent badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-600/10 border border-amber-600/30 rounded-full mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 animate-pulse-glow" />
            <span className="text-xs sm:text-sm text-amber-300 font-medium">Elevated Back-Office Solutions</span>
          </div>

          {/* Main heading with animated gradient */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Elite Back-Office Services
            <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-amber-300 to-accent-400 animate-gradient-text"
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              for Luxury Transport
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Professional call handling, booking management, and customer support
            tailored exclusively for luxury ground transportation companies
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-amber-600 hover:from-primary-500 hover:to-amber-500 text-white rounded-lg font-semibold text-base sm:text-lg transition-all hover:scale-105 group overflow-hidden shadow-lg shadow-primary-600/30"
            >
              <span className="relative flex items-center justify-center gap-2">
                Get Started Today
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-dark-800/80 hover:bg-dark-700 backdrop-blur-sm text-white rounded-lg font-semibold text-base sm:text-lg transition-all hover:scale-105 border border-dark-600 hover:border-primary-600"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-6 sm:mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => scrollToSection('services')}
            className="inline-flex flex-col items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
          >
            <span className="text-xs sm:text-sm uppercase tracking-wider font-medium">Discover Our Services</span>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
          </button>
        </div>

        {/* Floating stats cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6 max-w-lg sm:max-w-2xl mx-auto">
          <div className="glass-pulse backdrop-blur-sm bg-dark-800/30 rounded-lg p-2 sm:p-4 animate-fade-in-up text-center" style={{ animationDelay: '0.5s' }}>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-400">24/7</div>
            <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 mt-0.5 sm:mt-1">Always Available</div>
          </div>
          <div className="glass-pulse backdrop-blur-sm bg-dark-800/30 rounded-lg p-2 sm:p-4 animate-fade-in-up text-center" style={{ animationDelay: '0.6s' }}>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-400">100%</div>
            <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 mt-0.5 sm:mt-1">Client Focused</div>
          </div>
          <div className="glass-pulse backdrop-blur-sm bg-dark-800/30 rounded-lg p-2 sm:p-4 animate-fade-in-up text-center" style={{ animationDelay: '0.7s' }}>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent-400">Expert</div>
            <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 mt-0.5 sm:mt-1">Team Support</div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-dark-950 to-transparent"></div>
    </section>
  );
}
