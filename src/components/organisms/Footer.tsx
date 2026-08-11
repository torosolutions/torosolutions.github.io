import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="text-2xl font-bold text-white">
              Toro Solutions
            </span>
            <p className="mt-2 text-sm text-gray-400">
              Innovating the future of software, empowering developers &
              individuals with smart web tools.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-3">
              Free Web Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/id-photo"
                  className="hover:text-white transition-colors"
                >
                  People ID Photo Cropper (2x3, 4x6, 3x2)
                </Link>
              </li>
              <li>
                <Link
                  to="/dev-tools"
                  className="hover:text-white transition-colors"
                >
                  Developer Utilities (Base64, Random String, Email...)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Toro Solutions. All rights
            reserved.
          </p>
          <p className="mt-2 md:mt-0 text-gray-500 text-xs">
            Free online tools for personal & professional use. No data stored on
            server.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
