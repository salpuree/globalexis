import { Phone, Mail, Calendar, RefreshCw, FileText, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const services = [
  {
    icon: Phone,
    title: 'Professional Call Handling',
    description: 'Expert representatives manage your calls with professionalism and care, ensuring every client interaction reflects your luxury brand standards.',
  },
  {
    icon: Mail,
    title: 'Email Management',
    description: 'Timely, professional responses to all email inquiries, maintaining your reputation for exceptional customer service around the clock.',
  },
  {
    icon: Calendar,
    title: 'Booking Coordination',
    description: 'Seamless reservation management for your high-end clientele, from initial request to confirmed pickup with meticulous attention to detail.',
  },
  {
    icon: RefreshCw,
    title: 'Changes & Modifications',
    description: 'Flexible handling of schedule adjustments and service modifications, keeping your operations running smoothly without missing a beat.',
  },
  {
    icon: FileText,
    title: 'Status Updates',
    description: 'Real-time communication with clients about their service status, ensuring transparency and peace of mind throughout their journey.',
  },
  {
    icon: Clock,
    title: 'Quote Inquiries',
    description: 'Accurate, professional rate quotes delivered promptly, helping convert inquiries into bookings with competitive and transparent pricing.',
  },
];

export function Services() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index]);
              }, index * 80);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden border-b border-amber-600/10"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating accent orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-600/20 to-amber-600/10 rounded-full blur-3xl animate-float-enhanced opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-600/20 to-amber-600/10 rounded-full blur-3xl animate-float-enhanced opacity-30" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 animate-fade-in-up">
            Comprehensive Back-Office Solutions
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-600 via-amber-400 to-accent-400 mx-auto mb-8 animate-pulse-glow"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Everything you need to deliver world-class service to your luxury transport clients,
            handled with expertise and precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleItems.includes(index);

            return (
              <div
                key={index}
                className={`group relative flex gap-7 transition-all duration-500 pb-6 p-6 rounded-xl hover:bg-dark-800/40 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
                onMouseMove={handleMouseMove}
              >
                {/* Neon glow background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg blur-xl -z-10 ${
                  index % 3 === 0 ? 'from-primary-600/5 via-primary-600/10 to-amber-600/5' :
                  index % 3 === 1 ? 'from-accent-600/5 via-accent-600/10 to-amber-600/5' :
                  'from-amber-600/5 via-amber-600/10 to-primary-600/5'
                }`}></div>

                {/* Icon container with neon glow */}
                <div className="flex-shrink-0 pt-1 relative">
                  <div className="relative">
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 rounded-lg ${
                      index % 3 === 0 ? 'bg-gradient-to-br from-primary-600 to-amber-400' :
                      index % 3 === 1 ? 'bg-gradient-to-br from-accent-600 to-amber-400' :
                      'bg-gradient-to-br from-amber-600 to-primary-400'
                    }`}></div>
                    <div className={`relative flex items-center justify-center w-16 h-16 rounded-lg transition-all duration-500 group-hover:scale-110 border ${
                      index % 3 === 0 ? 'bg-primary-600/20 group-hover:bg-primary-600/40 border-primary-600/30 group-hover:border-primary-400/60' :
                      index % 3 === 1 ? 'bg-accent-600/20 group-hover:bg-accent-600/40 border-accent-600/30 group-hover:border-accent-400/60' :
                      'bg-amber-600/20 group-hover:bg-amber-600/40 border-amber-600/30 group-hover:border-amber-400/60'
                    }`}>
                      <Icon className={`w-8 h-8 transition-colors ${
                        index % 3 === 0 ? 'text-primary-400 group-hover:text-primary-300' :
                        index % 3 === 1 ? 'text-accent-400 group-hover:text-accent-300' :
                        'text-amber-400 group-hover:text-amber-300'
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-bold text-white mb-3 transition-colors duration-500 ${
                    index % 3 === 0 ? 'group-hover:text-primary-400' :
                    index % 3 === 1 ? 'group-hover:text-accent-400' :
                    'group-hover:text-amber-400'
                  }`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>

                {/* Animated bottom border */}
                <div className={`absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  index % 3 === 0 ? 'bg-gradient-to-r from-primary-600/0 via-primary-600/50 to-primary-600/0' :
                  index % 3 === 1 ? 'bg-gradient-to-r from-accent-600/0 via-accent-600/50 to-accent-600/0' :
                  'bg-gradient-to-r from-amber-600/0 via-amber-600/50 to-amber-600/0'
                }`}></div>

                {/* Top accent bar on hover */}
                <div className={`absolute top-0 left-0 w-0 h-0.5 group-hover:w-8 transition-all duration-500 ${
                  index % 3 === 0 ? 'bg-gradient-to-r from-primary-600 to-amber-400' :
                  index % 3 === 1 ? 'bg-gradient-to-r from-accent-600 to-amber-400' :
                  'bg-gradient-to-r from-amber-600 to-primary-400'
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Footer badge with glow */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-dark-800/50 backdrop-blur-sm border border-primary-600/30 rounded-full animate-fade-in-up neon-glow" style={{ animationDelay: '0.5s' }}>
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse-glow"></div>
            <span className="text-gray-300 font-medium">Available 24/7 for Your Business</span>
          </div>
        </div>
      </div>
    </section>
  );
}
