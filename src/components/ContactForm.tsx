import { useState, FormEvent } from 'react';
import { Mail, User, Building, Phone, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please add your EmailJS credentials to the .env file.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          company_name: formData.company_name,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          service_interest: formData.service_interest,
          message: formData.message,
          to_email: 'info@globalexisinc.com',
        },
        publicKey
      );

      setStatus('success');
      setFormData({
        name: '',
        company_name: '',
        email: '',
        phone: '',
        service_interest: '',
        message: '',
      });

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  const services = [
    'Call Handling',
    'Email Management',
    'Booking Coordination',
    'Changes & Modifications',
    'Status Updates',
    'Quote Inquiries',
    'Full Service Package',
  ];

  return (
    <section id="contact" className="h-full w-full py-6 sm:py-8 lg:py-12 bg-gradient-to-b from-dark-950 to-dark-900 relative overflow-hidden border-b border-amber-600/10 flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left side - Info */}
          <div className="hidden lg:flex animate-fade-in-up flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
              Let's Start the Conversation
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 lg:mb-8 leading-relaxed">
              Ready to transform your back-office operations? Fill out the form and our team
              will reach out to discuss how we can support your luxury transport business.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 lg:p-6 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-amber-600/20 hover:border-amber-600/50 transition-colors">
                <div className="p-2 lg:p-3 bg-amber-600/10 rounded-lg flex-shrink-0">
                  <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-white mb-1">Email Response</h3>
                  <p className="text-sm lg:text-base text-gray-400">
                    You'll receive a confirmation email immediately after submission
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="lg:hidden text-xl sm:text-2xl font-bold text-white mb-4">
              Let's Start the Conversation
            </h2>
            <form onSubmit={handleSubmit} className="bg-dark-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-dark-700 p-4 sm:p-6 lg:p-8">
              {status === 'success' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-600/10 border border-green-600/30 rounded-lg flex items-center gap-2 sm:gap-3 animate-scale-in">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                  <p className="text-green-400 font-medium text-sm sm:text-base">
                    Thank you! We'll be in touch soon.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-600/10 border border-red-600/30 rounded-lg flex items-center gap-2 sm:gap-3 animate-scale-in">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 font-medium text-sm sm:text-base">
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                </div>
              )}

              <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 lg:py-3 bg-dark-900/50 border border-dark-600 rounded-lg text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company_name" className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1.5">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <input
                      type="text"
                      id="company_name"
                      required
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 lg:py-3 bg-dark-900/50 border border-dark-600 rounded-lg text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 lg:py-3 bg-dark-900/50 border border-dark-600 rounded-lg text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 lg:py-3 bg-dark-900/50 border border-dark-600 rounded-lg text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="service_interest" className="block text-xs sm:text-sm lg:text-base font-medium text-gray-300 mb-1.5">
                    Service Interest *
                  </label>
                  <select
                    id="service_interest"
                    required
                    value={formData.service_interest}
                    onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                    className="w-full px-4 py-2 sm:py-2.5 lg:py-3 bg-dark-900/50 border border-dark-600 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm lg:text-base font-medium text-gray-300 mb-1.5">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <textarea
                      id="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-12 pr-4 py-2.5 lg:py-3 bg-dark-900/50 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all resize-none text-sm lg:text-base"
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full px-6 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-primary-600 via-amber-600 to-accent-600 hover:from-primary-500 hover:via-amber-500 hover:to-accent-500 text-white rounded-lg font-semibold text-sm sm:text-base lg:text-lg transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-600/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
