import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation />
      <Hero />
      <Stats />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
