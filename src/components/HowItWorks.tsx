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
              }, index * 200);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
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
      className="py-24 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Getting started is simple. Our proven process ensures you're up and running
            quickly with minimal disruption to your operations.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-600/20 via-accent-600/20 to-primary-600/20 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isVisible = visibleSteps.includes(index);

              return (
                <div
                  key={index}
                  className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700 hover:border-primary-600 transition-all hover:transform hover:-translate-y-2 h-full group">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-primary-600/20 rounded-full blur-xl group-hover:bg-primary-600/40 transition-all"></div>
                        <div className="relative p-6 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full group-hover:scale-110 transition-transform">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-dark-900 border-2 border-primary-600 rounded-full flex items-center justify-center text-primary-400 font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 -right-4 transform translate-x-1/2">
                      <div className="w-8 h-8 border-t-2 border-r-2 border-primary-600/30 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-300 text-lg mb-6">
            Ready to elevate your back-office operations?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary-600/50"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}
