import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { useHorizontalScroll } from './hooks/useHorizontalScroll';
import { useRef } from 'react';

function App() {
  const scrollProgress = useHorizontalScroll();
  const contentRef = useRef<HTMLDivElement>(null);
  const NUM_SECTIONS = 7;
  const translateX = -(scrollProgress / 100) * ((NUM_SECTIONS - 1) * 100);

  return (
    <div className="relative bg-dark-950 overflow-x-hidden">
      <Navigation />

      <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-screen overflow-hidden">
        <div
          ref={contentRef}
          className="h-full flex transition-transform duration-300 ease-out"
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

      <div style={{ height: '100vh' }} />
      <div style={{ height: '100vh' }} />
      <div style={{ height: '100vh' }} />
      <div style={{ height: '100vh' }} />
      <div style={{ height: '100vh' }} />
      <div style={{ height: '100vh' }} />
      <div style={{ height: '100vh' }} />
    </div>
  );
}

export default App;
