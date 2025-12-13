import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import HorizontalSnapFlick from './components/HorizontalSnapFlick';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const slides = [
    { id: 'hero', content: <Hero /> },
    { id: 'stats', content: <Stats /> },
    { id: 'services', content: <Services /> },
    { id: 'why-choose-us', content: <WhyChooseUs /> },
    { id: 'how-it-works', content: <HowItWorks /> },
    { id: 'contact', content: <ContactForm /> },
    { id: 'footer', content: <Footer /> },
  ];

  const handleSlideChange = (_index: number, slideId: string) => {
    setActiveSection(slideId);
  };

  return (
    <div className="relative bg-dark-950" style={{ height: '100vh', overflow: 'hidden' }}>
      <Navigation activeSection={activeSection} />

      <div style={{ height: 'calc(100vh - 80px)', marginTop: '80px' }}>
        <HorizontalSnapFlick
          slides={slides}
          animationMs={500}
          onSlideChange={handleSlideChange}
        />
      </div>
    </div>
  );
}

export default App;
