import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { useSnapScroll } from './hooks/useSnapScroll';
import { useRef } from 'react';

function App() {
  const NUM_SECTIONS = 7;
  const currentSlide = useSnapScroll(NUM_SECTIONS);
  const contentRef = useRef<HTMLDivElement>(null);
  const translateX = -(currentSlide * 100);

  return (
    <div className="relative bg-dark-950 overflow-hidden" style={{ height: '100vh' }}>
      <Navigation />

      <div className="fixed top-20 left-0 right-0 w-screen overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
        <div
          ref={contentRef}
          className="h-full flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(${translateX}%)`,
            width: `${NUM_SECTIONS * 100}%`,
            willChange: 'transform'
          }}
        >
          <div style={{ width: `${100 / NUM_SECTIONS}%` }} className="h-full flex-shrink-0">
            <Hero />
          </div>

          <div style={{ width: `${100 / NUM_SECTIONS}%` }} className="h-full flex-shrink-0">
            <Stats />
          </div>

          <div style={{ width: `${100 / NUM_SECTIONS}%` }} className="h-full flex-shrink-0">
            <Services />
          </div>

          <div style={{ width: `${100 / NUM_SECTIONS}%` }} className="h-full flex-shrink-0">
            <WhyChooseUs />
          </div>

          <div style={{ width: `${100 / NUM_SECTIONS}%` }} className="h-full flex-shrink-0">
            <HowItWorks />
          </div>

          <div style={{ width: `${100 / NUM_SECTIONS}%` }} className="h-full flex-shrink-0">
            <ContactForm />
          </div>

          <div style={{ width: `${100 / NUM_SECTIONS}%` }} className="h-full flex-shrink-0">
            <Footer />
          </div>
        </div>
      </div>

      {/* Hidden scroll container for maintaining scroll history */}
      <div className="hidden">
        {Array.from({ length: NUM_SECTIONS }).map((_, i) => (
          <div key={i} style={{ height: '100vh' }} />
        ))}
      </div>
    </div>
  );
}

export default App;
