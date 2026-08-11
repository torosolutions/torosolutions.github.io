import React from 'react';
import { ChevronDown } from 'lucide-react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

// Safari renders native <select> with its own menulist box model that ignores
// author padding/border-box sizing, so it never matches a same-styled <input>.
// appearance-none opts out of that; the chevron replaces the arrow it removes.
const Select: React.FC<SelectProps> = ({
  className = '',
  children,
  ...rest
}) => (
  <div className="relative">
    <select
      {...rest}
      className={`appearance-none pr-8 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 ${className}`}
    >
      {children}
    </select>
    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
);

export default Select;
