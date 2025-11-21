import { Phone, Mail, Calendar, RefreshCw, FileText, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const gradientMap: { [key: string]: string } = {
  'from-primary-600 to-primary-400': 'linear-gradient(135deg, #0284c7, #38bdf8)',
  'from-accent-600 to-cyan-400': 'linear-gradient(135deg, #0891b2, #22d3ee)',
  'from-blue-600 to-primary-400': 'linear-gradient(135deg, #2563eb, #38bdf8)',
  'from-accent-600 to-accent-400': 'linear-gradient(135deg, #0891b2, #22d3ee)',
  'from-cyan-600 to-primary-400': 'linear-gradient(135deg, #0891b2, #38bdf8)',
};

const services = [
  {
    icon: Phone,
    title: 'Professional Call Handling',
    description: 'Expert representatives manage your calls with professionalism and care, ensuring every client interaction reflects your luxury brand standards.',
    gradient: 'from-primary-600 to-primary-400',
    size: 'lg'
  },
  {
    icon: Mail,
    title: 'Email Management',
    description: 'Timely, professional responses to all email inquiries, maintaining your reputation for exceptional customer service around the clock.',
    gradient: 'from-accent-600 to-cyan-400',
    size: 'md'
  },
  {
    icon: Calendar,
    title: 'Booking Coordination',
    description: 'Seamless reservation management for your high-end clientele, from initial request to confirmed pickup with meticulous attention to detail.',
    gradient: 'from-blue-600 to-primary-400',
    size: 'md'
  },
  {
    icon: RefreshCw,
    title: 'Changes & Modifications',
    description: 'Flexible handling of schedule adjustments and service modifications, keeping your operations running smoothly without missing a beat.',
    gradient: 'from-accent-600 to-accent-400',
    size: 'md'
  },
  {
    icon: FileText,
    title: 'Status Updates',
    description: 'Real-time communication with clients about their service status, ensuring transparency and peace of mind throughout their journey.',
    gradient: 'from-cyan-600 to-primary-400',
    size: 'md'
  },
  {
    icon: Clock,
    title: 'Quote Inquiries',
    description: 'Accurate, professional rate quotes delivered promptly, helping convert inquiries into bookings with competitive and transparent pricing.',
    gradient: 'from-primary-600 to-accent-400',
    size: 'lg'
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
      className="py-24 bg-gradient-to-b from-dark-950 to-dark-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Comprehensive Back-Office Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to deliver world-class service to your luxury transport clients,
            handled with expertise and precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleItems.includes(index);
            const isLarge = service.size === 'lg';
            const offset = index % 2 === 0 ? 'md:translate-y-0' : 'md:translate-y-12';
            const gradientColor = gradientMap[service.gradient] || 'linear-gradient(135deg, #0284c7, #38bdf8)';
            
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer ${
                  isLarge ? 'md:col-span-1 md:row-span-2' : 'md:col-span-1'
                } ${offset} ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Gradient background with diagonal accent */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: gradientColor }}
                ></div>

                {/* Diagonal accent bar */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 opacity-20 group-hover:opacity-30 rounded-full blur-3xl transition-all duration-500 group-hover:scale-110 group-hover:-top-20 group-hover:-right-20"
                  style={{ background: gradientColor }}
                ></div>

                {/* Border */}
                <div className="absolute inset-0 border border-dark-700/50 group-hover:border-dark-700 rounded-2xl transition-colors duration-500"></div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between bg-dark-900/50 backdrop-blur-sm rounded-2xl">
                  <div>
                    {/* Icon */}
                    <div 
                      className="mb-6 inline-flex p-4 rounded-xl opacity-20 group-hover:opacity-30 transition-all duration-500 group-hover:scale-110"
                      style={{ background: gradientColor }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-500">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="mt-8 pt-6 border-t border-dark-700/30">
                    <div 
                      className="h-1 w-0 group-hover:w-12 transition-all duration-500"
                      style={{ background: gradientColor }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-dark-800/50 backdrop-blur-sm border border-primary-600/30 rounded-full">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-glow"></div>
            <span className="text-gray-300 font-medium">Available 24/7 for Your Business</span>
          </div>
        </div>
      </div>
    </section>
  );
}
