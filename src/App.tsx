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
  const translateX = -(scrollProgress / 100) * (7 * 100 - 100);

  return (
    <div className="relative bg-dark-950">
      <Navigation />

      <div className="relative overflow-hidden h-screen w-screen fixed top-20">
        <div
          ref={contentRef}
          className="h-screen flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${translateX}%)`,
            width: 'max-content'
          }}
        >
          <div className="w-screen h-screen flex-shrink-0">
            <Hero />
          </div>

          <div className="w-screen h-screen flex-shrink-0">
            <Stats />
          </div>

          <div className="w-screen h-screen flex-shrink-0">
            <Services />
          </div>

          <div className="w-screen h-screen flex-shrink-0">
            <WhyChooseUs />
          </div>

          <div className="w-screen h-screen flex-shrink-0">
            <HowItWorks />
          </div>

          <div className="w-screen h-screen flex-shrink-0">
            <ContactForm />
          </div>

          <div className="w-screen h-screen flex-shrink-0">
            <Footer />
          </div>
        </div>
      </div>

      <div className="h-screen" />
      <div className="h-screen" />
      <div className="h-screen" />
      <div className="h-screen" />
      <div className="h-screen" />
      <div className="h-screen" />
      <div className="h-screen" />
    </div>
  );
}

export default App;
