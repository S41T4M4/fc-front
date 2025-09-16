import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-[#1a2234] border border-[#2a3441]',
    elevated: 'bg-[#1a2234] border border-[#2a3441] shadow-lg shadow-[var(--color-accent)]/10',
    outlined: 'bg-transparent border border-[var(--color-accent)]'
  };

  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-300',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};
