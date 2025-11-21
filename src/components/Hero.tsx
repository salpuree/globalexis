import { ChevronDown, Sparkles } from 'lucide-react';

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
      {/* Animated background with parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/5717044/pexels-photo-5717044.jpeg?w=1600&q=80')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900"></div>

      {/* Floating glassmorphic elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left floating card */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-600/5 to-amber-600/5 rounded-full blur-3xl animate-float-enhanced opacity-60"></div>

        {/* Bottom right floating card */}
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-600/5 to-accent-600/5 rounded-full blur-3xl animate-float-enhanced opacity-60" style={{ animationDelay: '1s' }}></div>

        {/* Center floating element */}
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-accent-600/3 to-amber-600/3 rounded-full blur-3xl animate-float-enhanced opacity-40" style={{ animationDelay: '2s', transform: 'translate(-50%, -50%)' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32">
        <div className="animate-fade-in-up">
          {/* Accent badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/10 border border-amber-600/30 rounded-full mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse-glow" />
            <span className="text-sm text-amber-300 font-medium">Elevated Back-Office Solutions</span>
          </div>

          {/* Main heading with animated gradient */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Elite Back-Office Services
            <br />
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-300 to-primary-400 animate-gradient-text"
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              for Luxury Transport
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Professional call handling, booking management, and customer support
            tailored exclusively for luxury ground transportation companies
          </p>

          {/* CTA Buttons with neon glow */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => scrollToSection('contact')}
              className="relative px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-semibold text-lg transition-all hover:scale-105 group overflow-hidden"
            >
              {/* Neon glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity"></div>
              <span className="relative flex items-center gap-2">
                Get Started Today
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="relative px-8 py-4 bg-dark-800/80 hover:bg-dark-700 backdrop-blur-sm text-white rounded-lg font-semibold text-lg transition-all hover:scale-105 border border-dark-600 hover:border-primary-600 group"
            >
              {/* Glass pulse effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 to-accent-600/0 group-hover:from-primary-600/10 group-hover:to-accent-600/10 rounded-lg transition-all"></div>
              <span className="relative">Learn More</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => scrollToSection('services')}
            className="inline-flex flex-col items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group"
          >
            <span className="text-sm uppercase tracking-wider font-medium">Discover Our Services</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>

        {/* Floating stats cards */}
        <div className="grid grid-cols-3 gap-4 mt-24 max-w-2xl mx-auto">
          <div className="glass-pulse backdrop-blur-sm bg-dark-800/30 border border-primary-600/20 rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="text-2xl font-bold text-primary-400">24/7</div>
            <div className="text-xs text-gray-400 mt-1">Always Available</div>
          </div>
          <div className="glass-pulse backdrop-blur-sm bg-dark-800/30 border border-accent-600/20 rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-2xl font-bold text-accent-400">100%</div>
            <div className="text-xs text-gray-400 mt-1">Client Focused</div>
          </div>
          <div className="glass-pulse backdrop-blur-sm bg-dark-800/30 border border-primary-600/20 rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="text-2xl font-bold text-primary-400">Expert</div>
            <div className="text-xs text-gray-400 mt-1">Team Support</div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent"></div>
    </section>
  );
}
