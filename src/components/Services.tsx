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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleItems.includes(index);

            return (
              <div
                key={index}
                className={`group flex gap-6 transition-all duration-500 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Icon container */}
                <div className="flex-shrink-0 pt-1">
                  <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary-600/20 group-hover:bg-primary-600/30 transition-all duration-500 group-hover:scale-110">
                    <Icon className="w-7 h-7 text-primary-400" />
                  </div>
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>

                {/* Bottom border on hover */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-primary-600/0 via-primary-600/50 to-primary-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
