import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 99, suffix: '%', label: 'Client Satisfaction Rate' },
  { value: 24, suffix: '/7', label: 'Hours of Support' },
  { value: 15, suffix: '+', label: 'Years Experience' },
];

export function Stats() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [counters, setCounters] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate counters
            stats.forEach((stat, index) => {
              const duration = 2000;
              const steps = 60;
              const increment = stat.value / steps;
              let current = 0;

              const interval = setInterval(() => {
                current += increment;
                if (current >= stat.value) {
                  setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[index] = stat.value;
                    return newCounters;
                  });
                  clearInterval(interval);
                } else {
                  setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[index] = Math.floor(current);
                    return newCounters;
                  });
                }
              }, duration / steps);

              // Show items
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index]);
              }, index * 100);
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="h-screen w-screen py-20 bg-gradient-to-r from-dark-900 via-dark-950 to-dark-900 relative overflow-hidden border-y border-amber-600/10 flex items-center justify-center"
    >
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-600/10 to-amber-600/5 rounded-full blur-3xl opacity-40 animate-float-enhanced"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-600/10 to-amber-600/5 rounded-full blur-3xl opacity-40 animate-float-enhanced" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative text-center transition-all duration-500 ${
                visibleItems.includes(index) ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-accent-600/0 group-hover:from-primary-600/10 group-hover:to-accent-600/10 rounded-lg transition-all duration-500 blur-xl -z-10"></div>

              {/* Card */}
              <div className={`relative p-10 rounded-lg transition-all duration-500 glass-pulse`}>
                {/* Number with animation */}
                <div className="mb-6">
                  <span className={`text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                    index % 4 === 0 ? 'from-primary-400 to-amber-400' :
                    index % 4 === 1 ? 'from-accent-400 to-amber-400' :
                    index % 4 === 2 ? 'from-amber-400 to-primary-400' :
                    'from-primary-400 to-accent-400'
                  }`}>
                    {counters[index] || 0}
                  </span>
                  <span className={`text-3xl font-bold ml-1 ${
                    index % 4 === 0 ? 'text-primary-400' :
                    index % 4 === 1 ? 'text-accent-400' :
                    index % 4 === 2 ? 'text-amber-400' :
                    'text-primary-400'
                  }`}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-gray-300 font-medium text-sm lg:text-base group-hover:text-white transition-colors duration-500">
                  {stat.label}
                </p>

                {/* Top accent line */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 group-hover:w-12 transition-all duration-500 ${
                  index % 4 === 0 ? 'bg-gradient-to-r from-primary-600 to-amber-400' :
                  index % 4 === 1 ? 'bg-gradient-to-r from-accent-600 to-amber-400' :
                  index % 4 === 2 ? 'bg-gradient-to-r from-amber-600 to-primary-400' :
                  'bg-gradient-to-r from-primary-600 to-accent-400'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
