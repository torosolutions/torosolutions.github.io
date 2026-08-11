import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Code2, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'AI & Machine Learning',
    description:
      'Integrating intelligent features and predictive models into your software to drive automation and insights.',
    icon: (
      <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: 'Custom Web Apps',
    description:
      'Scalable, performant, and secure web applications built with modern frameworks like React and Node.js.',
    icon: (
      <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Mobile Development',
    description:
      'Native and cross-platform mobile apps that provide seamless experiences across iOS and Android devices.',
    icon: (
      <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    description:
      'User-centric design that focuses on usability, accessibility, and visual appeal to delight your users.',
    icon: (
      <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    title: 'Cloud Solutions',
    description:
      'Cloud infrastructure setup, migration, and management to ensure your applications are always available.',
    icon: (
      <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
  },
  {
    title: 'API Integration',
    description:
      'Connecting your software with third-party services to expand functionality and streamline workflows.',
    icon: (
      <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Free Tools Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              Free Utilities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Explore Our Free Web Tools
            </h2>
            <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed">
              We build client-side web tools designed for maximum efficiency,
              speed, and privacy. No installation or data upload required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/id-photo"
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 p-6 rounded-2xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-white text-indigo-600 rounded-xl flex items-center justify-center mb-4 font-bold shadow-md">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  People ID Photo Cropper
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  Crop personal ID photos for 2x3, 4x6, 3x2, and Passport.
                  Change background colors (White/Blue) and generate 4x6"
                  printable sheets.
                </p>
              </div>
              <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                Launch ID Photo Tool <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              to="/dev-tools"
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 p-6 rounded-2xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-white text-blue-600 rounded-xl flex items-center justify-center mb-4 font-bold shadow-md">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Developer Utilities Suite
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  Generate random strings, realistic emails, UUID v4, calculate
                  MD5/SHA hashes, encode/decode Base64 & URL, and format JSON.
                </p>
              </div>
              <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                Launch Dev Tools <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>

        {/* Regular Services Grid */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Software Engineering Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a wide range of software development services to help
              you build, launch, and scale your digital products.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
