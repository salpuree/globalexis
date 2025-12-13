import { MessageSquare, Settings, Rocket, BarChart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We discuss your needs, understand your brand, and design a custom back-office solution tailored to your business.',
  },
  {
    icon: Settings,
    title: 'Setup & Integration',
    description: 'Quick onboarding process with seamless integration into your existing systems and workflows.',
  },
  {
    icon: Rocket,
    title: 'Launch & Support',
    description: 'We begin handling your operations immediately with dedicated support to ensure a smooth transition.',
  },
  {
    icon: BarChart,
    title: 'Optimize & Grow',
    description: 'Continuous improvement and reporting help you enhance service quality and scale your business confidently.',
  },
];

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
              }, index * 150);
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
      id="how-it-works"
      ref={sectionRef}
      className="h-full w-full pt-4 pb-4 sm:pt-6 sm:pb-6 lg:pt-8 lg:pb-8 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 relative overflow-y-auto border-b border-amber-600/10 flex flex-col justify-start"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 lg:mb-4">
            How It Works
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Getting started is simple. Our proven process ensures you're up and running
            quickly with minimal disruption to your operations.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-600/20 via-amber-600/30 to-primary-600/20 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isVisible = visibleSteps.includes(index);

              return (
                <div
                  key={index}
                  className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`bg-dark-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border transition-all hover:transform hover:-translate-y-2 h-full group ${index % 4 === 0 ? 'border-dark-700 hover:border-primary-600' :
                      index % 4 === 1 ? 'border-dark-700 hover:border-accent-600' :
                        index % 4 === 2 ? 'border-dark-700 hover:border-amber-600' :
                          'border-dark-700 hover:border-primary-600'
                    }`}>
                    <div className="flex flex-col items-center text-center h-full">
                      {/* Icon */}
                      <div className="mb-3 sm:mb-4 lg:mb-6 relative">
                        <div className={`absolute inset-0 rounded-full blur-xl transition-all group-hover:scale-125 ${index % 4 === 0 ? 'bg-primary-600/20 group-hover:bg-primary-600/40' :
                            index % 4 === 1 ? 'bg-accent-600/20 group-hover:bg-accent-600/40' :
                              index % 4 === 2 ? 'bg-amber-600/20 group-hover:bg-amber-600/40' :
                                'bg-primary-600/20 group-hover:bg-primary-600/40'
                          }`}></div>
                        <div className={`relative p-3 sm:p-4 lg:p-5 rounded-full group-hover:scale-110 transition-transform bg-gradient-to-br ${index % 4 === 0 ? 'from-primary-600 to-amber-600' :
                            index % 4 === 1 ? 'from-accent-600 to-amber-600' :
                              index % 4 === 2 ? 'from-amber-600 to-primary-600' :
                                'from-primary-600 to-accent-600'
                          }`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <div className={`absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-dark-900 border-2 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs lg:text-sm ${index % 4 === 0 ? 'border-primary-600 text-primary-400' :
                            index % 4 === 1 ? 'border-accent-600 text-accent-400' :
                              index % 4 === 2 ? 'border-amber-600 text-amber-400' :
                                'border-primary-600 text-primary-400'
                          }`}>
                          {index + 1}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base lg:text-xl font-bold text-white mb-2 lg:mb-3 group-hover:text-primary-400 transition-colors">
                        {step.title}
                      </h3>

                      {/* Description - hidden on very small mobile, shown otherwise */}
                      <p className="hidden sm:block text-xs sm:text-sm lg:text-base text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow connectors - desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 -right-3 transform translate-x-1/2">
                      <div className="w-6 h-6 border-t-2 border-r-2 border-primary-600/30 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 sm:mt-8 lg:mt-12 text-center">
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-3 lg:mb-4">
            Ready to elevate your back-office operations?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
            }}
            className="px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-primary-600 via-amber-600 to-accent-600 hover:from-primary-500 hover:via-amber-500 hover:to-accent-500 text-white rounded-lg font-semibold text-sm sm:text-base lg:text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-600/50"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}
