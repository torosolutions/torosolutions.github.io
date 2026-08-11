import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Code2, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="pt-24 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-blue-50/80 via-indigo-50/30 to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Crafting{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Innovative
          </span>{' '}
          Software Solutions
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Toro Solutions empowers businesses and developers through modern
          technology, custom engineering, and free online web tools.
        </p>

        {/* Feature Tool Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            to="/id-photo"
            className="flex items-center gap-3 px-6 py-3.5 bg-white text-gray-900 font-semibold rounded-xl shadow-md border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all transform hover:-translate-y-0.5 group w-full sm:w-96"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Camera className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">ID Photo Resizer</div>
              <div className="text-xs text-gray-500">
                2x3, 4x6, 3x2 & Passport
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all ml-2" />
          </Link>

          <Link
            to="/dev-tools"
            className="flex items-center gap-3 px-6 py-3.5 bg-white text-gray-900 font-semibold rounded-xl shadow-md border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all transform hover:-translate-y-0.5 group w-full sm:w-96"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Dev Utility Suite</div>
              <div className="text-xs text-gray-500">
                Base64, Strings, UUID & Hashes
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
