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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="h-full w-full py-4 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden border-b border-amber-600/10 flex flex-col justify-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Floating accent orbs */}
      <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-primary-600/20 to-amber-600/10 rounded-full blur-3xl animate-float-enhanced opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-accent-600/20 to-amber-600/10 rounded-full blur-3xl animate-float-enhanced opacity-30" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-3 sm:mb-4 lg:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 animate-fade-in-up">
            Comprehensive Back-Office Solutions
          </h2>
          <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-primary-600 via-amber-400 to-accent-400 mx-auto mb-2 animate-pulse-glow"></div>
          <p className="text-xs sm:text-sm lg:text-base text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Everything you need to deliver world-class service to your luxury transport clients
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleItems.includes(index);

            return (
              <div
                key={index}
                className={`group relative flex gap-3 transition-all duration-500 p-3 rounded-lg hover:bg-dark-800/40 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Icon container */}
                <div className="flex-shrink-0">
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-500 group-hover:scale-105 border ${index % 3 === 0 ? 'bg-primary-600/20 group-hover:bg-primary-600/40 border-primary-600/30' :
                      index % 3 === 1 ? 'bg-accent-600/20 group-hover:bg-accent-600/40 border-accent-600/30' :
                        'bg-amber-600/20 group-hover:bg-amber-600/40 border-amber-600/30'
                    }`}>
                    <Icon className={`w-5 h-5 transition-colors ${index % 3 === 0 ? 'text-primary-400' :
                        index % 3 === 1 ? 'text-accent-400' :
                          'text-amber-400'
                      }`} />
                  </div>
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm lg:text-base font-bold text-white mb-1 transition-colors duration-500 ${index % 3 === 0 ? 'group-hover:text-primary-400' :
                      index % 3 === 1 ? 'group-hover:text-accent-400' :
                        'group-hover:text-amber-400'
                    }`}>
                    {service.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-400 leading-snug group-hover:text-gray-300 transition-colors duration-500 line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer badge */}
        <div className="text-center mt-3 lg:mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800/50 backdrop-blur-sm border border-primary-600/30 rounded-full animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse-glow"></div>
            <span className="text-xs lg:text-sm text-gray-300 font-medium">Available 24/7 for Your Business</span>
          </div>
        </div>
      </div>
    </section>
  );
}
