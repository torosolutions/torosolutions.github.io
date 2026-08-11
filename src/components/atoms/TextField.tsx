import React from 'react';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const TextField: React.FC<TextFieldProps> = ({
  className = '',
  type = 'text',
  ...rest
}) => (
  <input
    type={type}
    {...rest}
    className={`bg-white border border-gray-300 rounded-lg focus:ring-blue-500 ${className}`}
  />
);

export default TextField;
