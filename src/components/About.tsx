import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Toro Solutions
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Toro Solutions, we believe that software should be more than just code; it should be a catalyst for growth and efficiency. Our team of expert developers and designers work closely with clients to transform complex challenges into elegant, scalable solutions.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With years of experience in the industry, we specialize in building robust web applications, mobile experiences, and specialized enterprise systems that stand the test of time.
            </p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-8 rounded-2xl text-center">
              <span className="block text-4xl font-bold text-blue-600 mb-2">5+</span>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Years Experience</span>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl text-center">
              <span className="block text-4xl font-bold text-blue-600 mb-2">50+</span>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Projects Delivered</span>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl text-center">
              <span className="block text-4xl font-bold text-blue-600 mb-2">100%</span>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Client Satisfaction</span>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl text-center">
              <span className="block text-4xl font-bold text-blue-600 mb-2">24/7</span>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
