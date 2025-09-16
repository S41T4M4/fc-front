import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface TransitionProps {
  children: React.ReactNode;
  show: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}

// Fade Transition
export const FadeTransition: React.FC<TransitionProps> = ({
  children,
  show,
  duration = 300,
  delay = 0,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, delay]);

  return (
    <div
      className={cn(
        'transition-opacity duration-300 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

// Slide Transition
interface SlideTransitionProps extends TransitionProps {
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  show,
  direction = 'up',
  duration = 300,
  delay = 0,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, delay]);

  const directionClasses = {
    up: isVisible ? 'translate-y-0' : 'translate-y-4',
    down: isVisible ? 'translate-y-0' : '-translate-y-4',
    left: isVisible ? 'translate-x-0' : 'translate-x-4',
    right: isVisible ? 'translate-x-0' : '-translate-x-4',
  };

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out',
        directionClasses[direction],
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

// Scale Transition
export const ScaleTransition: React.FC<TransitionProps> = ({
  children,
  show,
  duration = 300,
  delay = 0,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, delay]);

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out transform',
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

// Stagger Transition
interface StaggerTransitionProps {
  children: React.ReactNode[];
  show: boolean;
  staggerDelay?: number;
  transitionType?: 'fade' | 'slide' | 'scale';
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const StaggerTransition: React.FC<StaggerTransitionProps> = ({
  children,
  show,
  staggerDelay = 100,
  transitionType = 'fade',
  direction = 'up',
  className,
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => {
        const delay = index * staggerDelay;
        
        switch (transitionType) {
          case 'slide':
            return (
              <SlideTransition
                key={index}
                show={show}
                direction={direction}
                delay={delay}
              >
                {child}
              </SlideTransition>
            );
          case 'scale':
            return (
              <ScaleTransition
                key={index}
                show={show}
                delay={delay}
              >
                {child}
              </ScaleTransition>
            );
          default:
            return (
              <FadeTransition
                key={index}
                show={show}
                delay={delay}
              >
                {child}
              </FadeTransition>
            );
        }
      })}
    </div>
  );
};

// Page Transition
interface PageTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isVisible,
  className,
}) => {
  return (
    <div
      className={cn(
        'transition-all duration-500 ease-out transform',
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
};

// Intersection Observer Hook for Scroll Animations
export const useIntersectionObserver = (
  threshold = 0.1,
  triggerOnce = true
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) setHasIntersected(true);
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return [ref, isIntersecting || hasIntersected] as const;
};

