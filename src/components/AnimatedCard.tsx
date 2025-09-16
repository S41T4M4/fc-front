import React from 'react';
import { useScrollAnimation, useHoverAnimation } from '../hooks/useAnimation';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: boolean;
  glowEffect?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '',
  delay = 0,
  hoverScale = true,
  glowEffect = false
}) => {
  const [ref, isVisible] = useScrollAnimation();
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverAnimation();

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        transition-all duration-700 ease-out transform
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
        ${hoverScale && isHovered ? 'scale-105' : 'scale-100'}
        ${glowEffect && isHovered ? 'shadow-2xl shadow-[var(--color-accent)]/25' : ''}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  floatSpeed?: 'slow' | 'medium' | 'fast';
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const FloatingCard: React.FC<FloatingCardProps> = ({ 
  children, 
  className = '',
  floatSpeed = 'medium',
  direction = 'up'
}) => {
  const speedClasses = {
    slow: 'animate-float-slow',
    medium: 'animate-float',
    fast: 'animate-float-fast'
  };

  const directionClasses = {
    up: 'animate-float',
    down: 'animate-float-down',
    left: 'animate-float-left',
    right: 'animate-float-right'
  };

  return (
    <div 
      className={`
        ${speedClasses[floatSpeed]} 
        ${directionClasses[direction]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface PulseCardProps {
  children: React.ReactNode;
  className?: string;
  pulseColor?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

export const PulseCard: React.FC<PulseCardProps> = ({ 
  children, 
  className = '',
  pulseColor = 'var(--color-accent)',
  intensity = 'medium'
}) => {
  const intensityClasses = {
    light: 'animate-pulse-light',
    medium: 'animate-pulse',
    strong: 'animate-pulse-strong'
  };

  return (
    <div 
      className={`
        ${intensityClasses[intensity]}
        ${className}
      `}
      style={{ '--pulse-color': pulseColor } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

