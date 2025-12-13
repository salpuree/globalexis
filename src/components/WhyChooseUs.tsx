import { Target, Shield, Zap, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const benefits = [
  {
    icon: Target,
    title: 'Luxury Transport Specialists',
    description: 'We exclusively serve high-end ground transportation companies, understanding your unique needs and client expectations.',
  },
  {
    icon: Shield,
    title: 'White-Glove Service',
    description: 'Every interaction is handled with the professionalism and care your luxury brand demands, protecting your reputation.',
  },
  {
    icon: Zap,
    title: 'Seamless Operations',
    description: 'Integrate effortlessly with your existing systems, providing support that feels like a natural extension of your team.',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Our trained professionals understand the nuances of luxury service, ensuring consistent excellence in every interaction.',
  },
];

export function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
      id="why-us"
      ref={sectionRef}
      className="h-screen w-screen py-16 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden border-b border-amber-600/10 flex items-center"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              Why Choose
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-amber-300 to-accent-400">
                {' '}Globalexis
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              When your reputation depends on flawless service, you need a back-office partner
              who understands the luxury transport industry inside and out.
            </p>

            <div className="space-y-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const colors = [
                  { bg: 'bg-primary-600/10', text: 'text-primary-400' },
                  { bg: 'bg-accent-600/10', text: 'text-accent-400' },
                  { bg: 'bg-amber-600/10', text: 'text-amber-400' },
                  { bg: 'bg-primary-600/10', text: 'text-primary-400' }
                ];
                const color = colors[index % colors.length];

                return (
                  <div
                    key={index}
                    className={`flex gap-5 ${
                      isVisible ? 'animate-slide-in-left' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`flex-shrink-0 p-3 ${color.bg} rounded-lg h-fit`}>
                      <Icon className={`w-6 h-6 ${color.text}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
                alt="Professional team collaboration"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-dark-800 border border-primary-600/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-400">24/7</div>
                  <div className="text-sm text-gray-400">Available</div>
                </div>
                <div className="w-px h-12 bg-dark-600"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-400">100%</div>
                  <div className="text-sm text-gray-400">Luxury Focus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
