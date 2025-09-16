import React from 'react';
import { useHoverAnimation } from '../hooks/useAnimation';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  animation?: 'rotate' | 'bounce' | 'pulse' | 'wiggle' | 'glow';
  color?: string;
  hoverColor?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  icon: Icon, 
  size = 24,
  className = '',
  animation = 'pulse',
  color = 'currentColor',
  hoverColor = 'var(--color-accent)'
}) => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverAnimation();

  const animationClasses = {
    rotate: isHovered ? 'animate-spin' : '',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    wiggle: isHovered ? 'animate-wiggle' : '',
    glow: isHovered ? 'drop-shadow-lg drop-shadow-[var(--color-accent)]' : ''
  };

  return (
    <Icon
      size={size}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        transition-all duration-300 ease-in-out
        ${animationClasses[animation]}
        ${className}
      `}
      style={{ 
        color: isHovered ? hoverColor : color,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
      }}
    />
  );
};

interface RotatingIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
  reverse?: boolean;
}

export const RotatingIcon: React.FC<RotatingIconProps> = ({ 
  icon: Icon, 
  size = 24,
  className = '',
  speed = 'medium',
  reverse = false
}) => {
  const speedClasses = {
    slow: 'animate-spin-slow',
    medium: 'animate-spin',
    fast: 'animate-spin-fast'
  };

  return (
    <Icon
      size={size}
      className={`
        ${speedClasses[speed]}
        ${reverse ? 'animate-reverse-spin' : ''}
        ${className}
      `}
    />
  );
};

interface MorphingIconProps {
  icons: LucideIcon[];
  size?: number;
  className?: string;
  interval?: number;
  startIndex?: number;
}

export const MorphingIcon: React.FC<MorphingIconProps> = ({ 
  icons, 
  size = 24,
  className = '',
  interval = 2000,
  startIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(startIndex);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % icons.length);
    }, interval);

    return () => clearInterval(timer);
  }, [icons.length, interval]);

  const CurrentIcon = icons[currentIndex];

  return (
    <CurrentIcon
      size={size}
      className={`
        transition-all duration-500 ease-in-out
        ${className}
      `}
      style={{
        animation: 'morph 0.5s ease-in-out'
      }}
    />
  );
};

