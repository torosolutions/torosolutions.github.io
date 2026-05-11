import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold text-white">
              Toro Solutions
            </span>
            <p className="mt-2 text-sm">
              Innovating the future of software, one solution at a time.
            </p>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Toro Solutions. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
