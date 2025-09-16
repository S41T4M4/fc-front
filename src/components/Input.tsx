import React from 'react';
import { cn } from '../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'default' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', size = 'default', label, error, success, helperText, leftIcon, rightIcon, ...props }, ref) => {
    const inputVariant = error ? 'error' : success ? 'success' : variant;
    
    const baseClasses = 'flex w-full rounded-lg border bg-[#1a2234]/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200';
    
    const variantClasses = {
      default: 'border-[#2a3441] focus-visible:border-[var(--color-accent)]',
      error: 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500',
      success: 'border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500',
    };

    const sizeClasses = {
      sm: 'h-8 px-2 text-xs',
      default: 'h-10 px-3',
      lg: 'h-12 px-4 text-base',
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-white">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            className={cn(
              baseClasses,
              variantClasses[inputVariant],
              sizeClasses[size],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || success || helperText) && (
          <p className={cn(
            'text-xs',
            error && 'text-red-400',
            success && 'text-green-400',
            !error && !success && 'text-gray-400'
          )}>
            {error || success || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };