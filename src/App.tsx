import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { useHorizontalScroll } from './hooks/useHorizontalScroll';

function App() {
  const scrollProgress = useHorizontalScroll();
  const translateX = -(scrollProgress / 100) * 85;

  return (
    <div className="relative overflow-hidden bg-dark-950">
      <Navigation />

      <div className="fixed inset-0 top-[80px] overflow-hidden">
        <div
          className="h-full flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${translateX}%)`,
            width: '100%'
          }}
        >
          <section className="w-screen flex-shrink-0">
            <Hero />
          </section>

          <section className="w-screen flex-shrink-0">
            <Stats />
          </section>

          <section className="w-screen flex-shrink-0">
            <Services />
          </section>

          <section className="w-screen flex-shrink-0">
            <WhyChooseUs />
          </section>

          <section className="w-screen flex-shrink-0">
            <HowItWorks />
          </section>

          <section className="w-screen flex-shrink-0">
            <ContactForm />
          </section>

          <section className="w-screen flex-shrink-0">
            <Footer />
          </section>
        </div>
      </div>

      <div className="relative h-screen" />
      <div className="relative h-screen" />
      <div className="relative h-screen" />
      <div className="relative h-screen" />
      <div className="relative h-screen" />
      <div className="relative h-screen" />
      <div className="relative h-screen" />
    </div>
  );
}

export default App;
