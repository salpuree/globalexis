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
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100);
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
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Comprehensive Back-Office Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to deliver world-class service to your luxury transport clients,
            handled with expertise and precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={index}
                className={`group relative bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700 hover:border-primary-600 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-600/20 ${
                  isVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-accent-600/0 group-hover:from-primary-600/5 group-hover:to-accent-600/5 rounded-2xl transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-4 bg-primary-600/10 rounded-xl group-hover:bg-primary-600/20 transition-all group-hover:scale-110 duration-300">
                    <Icon className="w-8 h-8 text-primary-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-dark-800/50 backdrop-blur-sm border border-primary-600/30 rounded-full">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-glow"></div>
            <span className="text-gray-300 font-medium">Available 24/7 for Your Business</span>
          </div>
        </div>
      </div>
    </section>
  );
}
