import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  autoComplete?: string;
  disabled?: boolean;
};
export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  name,
  id,
  className = '',
  autoComplete,
  disabled = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = type === 'password';
  return <div className={`mb-4 ${className}`}>
      {label && <label htmlFor={id || name} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>}
      <div className="relative">
        <input type={isPasswordInput && showPassword ? 'text' : type} id={id || name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} autoComplete={autoComplete} disabled={disabled} className={`
            w-full px-3 py-2 bg-[#1a2234] border rounded-md shadow-sm placeholder-gray-500 
            focus:outline-none focus:ring-1 focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]
            disabled:bg-[#15192a] disabled:cursor-not-allowed disabled:text-gray-500
            ${error ? 'border-red-800' : 'border-[#2a3446]'}
            ${className}
          `} style={{
        color: disabled ? '#6b7280' : '#e0e0e0'
      }} />
        {isPasswordInput && <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
            {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
          </button>}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>;
};