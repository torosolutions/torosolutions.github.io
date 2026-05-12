import React from 'react';
import { contactConfig } from '../../config';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl overflow-hidden relative">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-700 rounded-full opacity-50 blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              We're excited to hear about your ideas and help you bring them to
              life. Get in touch with us today!
            </p>
            <div className="flex flex-col items-center gap-6">
              <div className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-blue-50 transition-colors">
                <a href={`mailto:${contactConfig.email}`}>
                  {contactConfig.email}
                </a>
              </div>
              <div className="inline-block bg-blue-700/50 text-white px-8 py-4 rounded-xl font-bold text-xl border border-blue-400/30 backdrop-blur-sm">
                <a href={`tel:${contactConfig.phone.value}`}>
                  {contactConfig.phone.display}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-blue-50 mt-4 text-lg">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <a
                  href={contactConfig.address.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 transition-all"
                >
                  <address className="not-italic">
                    {contactConfig.address.display}
                  </address>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
