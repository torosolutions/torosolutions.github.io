import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl overflow-hidden relative">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-700 rounded-full opacity-50 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              We're excited to hear about your ideas and help you bring them to life. Get in touch with us today!
            </p>
            <div className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-blue-50 transition-colors">
              <a href="mailto:toro.solutions.89@gmail.com">
                toro.solutions.89@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
