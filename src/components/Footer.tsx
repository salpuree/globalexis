import { Headphones, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Globalexis</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Elite back-office services tailored exclusively for luxury ground transportation companies.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Services', 'Why Us', 'How It Works', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Call Handling</li>
              <li>Email Management</li>
              <li>Booking Coordination</li>
              <li>Status Updates</li>
              <li>Quote Inquiries</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-1" />
                <div className="text-gray-400 text-sm">
                  <p>4500 Cypresswood Drive</p>
                  <p>Apt 825, Spring, TX 77379</p>
                  <p className="text-accent-400 mt-1 font-medium">Remote services only</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                >
                  Contact us via form
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Globalexis Inc. All rights reserved.
            </p>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-glow"></div>
              <span className="text-gray-400 text-sm">Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
