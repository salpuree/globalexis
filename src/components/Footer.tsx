import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-full w-full bg-dark-950 border-t border-amber-600/20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fde044ef8cfe842358fb55730203f5e75%2Fa8d3493eb96d480eaf9257873ded0fd1"
                alt="Globalexis Logo"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Elite back-office services tailored exclusively for luxury ground transportation companies.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Services', 'Why Us', 'How It Works', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Call Handling</li>
              <li>Email Management</li>
              <li>Booking Coordination</li>
              <li>Status Updates</li>
              <li>Quote Inquiries</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="tel:+17035206130" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  (703) 520-6130
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@globalexisinc.com" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                  info@globalexisinc.com
                </a>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                <div className="text-gray-400 text-sm">
                  <p>4500 Cypresswood Drive</p>
                  <p>Apt 825, Spring, TX 77379</p>
                  <p className="text-amber-400 mt-2 font-medium">Remote services only</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Globalexis Inc. All rights reserved.
            </p>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-glow"></div>
              <span className="text-gray-400 text-sm">Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
