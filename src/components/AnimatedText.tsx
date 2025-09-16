import React from 'react';
import { useTypingAnimation } from '../hooks/useAnimation';

interface AnimatedTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  speed = 50, 
  className = '',
  onComplete 
}) => {
  const { displayedText, isComplete } = useTypingAnimation(text, speed);

  React.useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <span className="animate-pulse text-[var(--color-accent)]">|</span>
      )}
    </span>
  );
};

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({ 
  children, 
  className = '',
  gradient = 'from-[var(--color-accent)] to-[var(--color-secondary)]'
}) => {
  return (
    <span 
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
};

interface FloatingTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingText: React.FC<FloatingTextProps> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

