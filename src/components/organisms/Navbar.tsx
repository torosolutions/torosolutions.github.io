import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Camera,
  Code2,
  Menu,
  X,
  Home as HomeIcon,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { TAB_LIST } from '../../constants/devTools';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [photoDropdownOpen, setPhotoDropdownOpen] = useState(false);
  const [devDropdownOpen, setDevDropdownOpen] = useState(false);
  const location = useLocation();

  const isCurrent = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '';
    }
    return location.pathname.startsWith(path);
  };

  const isTabActive = (toolParam: string) => {
    return (
      location.pathname === '/dev-tools' &&
      location.search.includes(`tool=${toolParam}`)
    );
  };

  const isSizeActive = (sizeParam: string) => {
    return (
      location.pathname === '/id-photo' &&
      location.search.includes(`size=${sizeParam}`)
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              <span>Toro Solutions</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCurrent('/')
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <div className="h-4 w-px bg-gray-200 mx-1" />

            {/* ID Photo Tool Dropdown */}
            <div className="relative group">
              <Link
                to="/id-photo"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent('/id-photo')
                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <Camera className="w-4 h-4 text-indigo-500" />
                <span>ID Photo Resizer</span>
                <span className="ml-0.5 px-1.5 py-0.5 text-[10px] uppercase font-bold bg-indigo-100 text-indigo-700 rounded-full">
                  Tool
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-600 transition-transform group-hover:rotate-180" />
              </Link>

              {/* Dropdown Menu Panel */}
              <div className="absolute left-0 top-full pt-1.5 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 transform group-hover:translate-y-0 translate-y-1 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Popular ID Photo Sizes
                  </div>

                  <Link
                    to="/id-photo?size=2x3"
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isSizeActive('2x3')
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-gray-700 hover:bg-indigo-50/60 hover:text-indigo-600'
                    }`}
                  >
                    <span>2 x 3 cm Photo</span>
                    <span className="text-[10px] text-gray-400 font-normal">
                      Asian Standard
                    </span>
                  </Link>

                  <Link
                    to="/id-photo?size=3x4"
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isSizeActive('3x4')
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-gray-700 hover:bg-indigo-50/60 hover:text-indigo-600'
                    }`}
                  >
                    <span>3 x 4 cm Photo</span>
                    <span className="text-[10px] text-gray-400 font-normal">
                      Asian Standard
                    </span>
                  </Link>

                  <Link
                    to="/id-photo?size=4x6"
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isSizeActive('4x6')
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-gray-700 hover:bg-indigo-50/60 hover:text-indigo-600'
                    }`}
                  >
                    <span>4 x 6 cm Photo</span>
                    <span className="text-[10px] text-gray-400 font-normal">
                      Asian Standard
                    </span>
                  </Link>

                  <Link
                    to="/id-photo?size=3.5x4.5"
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isSizeActive('3.5x4.5')
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-gray-700 hover:bg-indigo-50/60 hover:text-indigo-600'
                    }`}
                  >
                    <span>3.5 x 4.5 cm Passport</span>
                    <span className="text-[10px] text-indigo-600 font-medium">
                      Schengen / VN
                    </span>
                  </Link>

                  <Link
                    to="/id-photo?size=5x5"
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isSizeActive('5x5')
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-gray-700 hover:bg-indigo-50/60 hover:text-indigo-600'
                    }`}
                  >
                    <span>5 x 5 cm (2x2") Visa</span>
                    <span className="text-[10px] text-indigo-600 font-medium">
                      US / Passport
                    </span>
                  </Link>

                  <div className="border-t border-gray-100 pt-1.5">
                    <Link
                      to="/id-photo"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> All Photo Sizes &
                      Templates →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dev Utilities Dropdown */}
            <div className="relative group">
              <Link
                to="/dev-tools"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent('/dev-tools')
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Code2 className="w-4 h-4 text-blue-500" />
                <span>Dev Utilities</span>
                <span className="ml-0.5 px-1.5 py-0.5 text-[10px] uppercase font-bold bg-blue-100 text-blue-700 rounded-full">
                  Tool
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:rotate-180" />
              </Link>

              {/* Dropdown Menu Panel */}
              <div className="absolute right-0 top-full pt-1.5 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 transform group-hover:translate-y-0 translate-y-1 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Developer Tools
                  </div>

                  {TAB_LIST.map(({ id, label, icon: Icon }) => (
                    <Link
                      key={id}
                      to={`/dev-tools?tool=${id}`}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isTabActive(id)
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-gray-700 hover:bg-blue-50/60 hover:text-blue-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-blue-500" />
                      <span>{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-5 space-y-3 shadow-lg max-h-[85vh] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium ${
              isCurrent('/')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>

          {/* ID Photo Section in Mobile */}
          <div className="space-y-1 pt-1 border-t border-gray-100">
            <button
              onClick={() => setPhotoDropdownOpen(!photoDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium text-gray-800 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-indigo-500" />
                <span>ID Photo Resizer</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  photoDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {photoDropdownOpen && (
              <div className="pl-8 space-y-1 text-xs">
                <Link
                  to="/id-photo?size=2x3"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-indigo-600 font-medium"
                >
                  2 x 3 cm Photo
                </Link>
                <Link
                  to="/id-photo?size=3x4"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-indigo-600 font-medium"
                >
                  3 x 4 cm Photo
                </Link>
                <Link
                  to="/id-photo?size=4x6"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-indigo-600 font-medium"
                >
                  4 x 6 cm Photo
                </Link>
                <Link
                  to="/id-photo?size=3.5x4.5"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-indigo-600 font-medium"
                >
                  3.5 x 4.5 cm Passport
                </Link>
                <Link
                  to="/id-photo?size=5x5"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-indigo-600 font-medium"
                >
                  5 x 5 cm (2x2") US Visa
                </Link>
              </div>
            )}
          </div>

          {/* Dev Tools Section in Mobile */}
          <div className="space-y-1 pt-1 border-t border-gray-100">
            <button
              onClick={() => setDevDropdownOpen(!devDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium text-gray-800 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-blue-500" />
                <span>Developer Utilities</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  devDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {devDropdownOpen && (
              <div className="pl-8 space-y-1 text-xs">
                {TAB_LIST.map(({ id, label }) => (
                  <Link
                    key={id}
                    to={`/dev-tools?tool=${id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
