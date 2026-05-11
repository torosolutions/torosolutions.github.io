import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Crafting <span className="text-blue-600">Innovative</span> Software Solutions
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Toro Solutions empowers businesses through cutting-edge technology and custom software engineering tailored to your unique needs.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#contact"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
          >
            Get Started
          </a>
          <a
            href="#services"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-md border border-blue-100 hover:bg-blue-50 transition-all transform hover:-translate-y-1"
          >
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
