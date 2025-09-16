import React, { useState, useEffect } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isVisible,
  direction = 'up',
  duration = 500,
  className = ''
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  if (!shouldRender) return null;

  const directionClasses = {
    left: isVisible ? 'translate-x-0' : '-translate-x-full',
    right: isVisible ? 'translate-x-0' : 'translate-x-full',
    up: isVisible ? 'translate-y-0' : '-translate-y-full',
    down: isVisible ? 'translate-y-0' : 'translate-y-full'
  };

  return (
    <div
      className={`
        transition-all duration-500 ease-out transform
        ${directionClasses[direction]}
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

interface FadeTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  duration?: number;
  className?: string;
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  isVisible,
  duration = 300,
  className = ''
}) => {
  return (
    <div
      className={`
        transition-opacity duration-300 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

interface ScaleTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  duration?: number;
  className?: string;
  scale?: number;
}

export const ScaleTransition: React.FC<ScaleTransitionProps> = ({
  children,
  isVisible,
  duration = 300,
  className = '',
  scale = 0.95
}) => {
  return (
    <div
      className={`
        transition-all duration-300 ease-out transform
        ${isVisible ? 'scale-100 opacity-100' : `scale-${Math.round(scale * 100)} opacity-0`}
        ${className}
      `}
      style={{ 
        transitionDuration: `${duration}ms`,
        transform: isVisible ? 'scale(1)' : `scale(${scale})`
      }}
    >
      {children}
    </div>
  );
};

interface StaggerTransitionProps {
  children: React.ReactNode[];
  isVisible: boolean;
  staggerDelay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export const StaggerTransition: React.FC<StaggerTransitionProps> = ({
  children,
  isVisible,
  staggerDelay = 100,
  direction = 'up',
  className = ''
}) => {
  const directionClasses = {
    left: 'translate-x-8',
    right: '-translate-x-8',
    up: 'translate-y-8',
    down: '-translate-y-8'
  };

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`
            transition-all duration-500 ease-out transform
            ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directionClasses[direction]}`}
          `}
          style={{ 
            transitionDelay: `${index * staggerDelay}ms`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

