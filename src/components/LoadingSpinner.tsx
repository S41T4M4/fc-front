import React from 'react';
import { RotatingIcon } from './AnimatedIcon';
import { CoinsIcon, TrophyIcon, GamepadIcon } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'coins' | 'trophy' | 'gamepad' | 'default';
  text?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  variant = 'coins',
  text,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const iconSize = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64
  };

  const icons = {
    coins: CoinsIcon,
    trophy: TrophyIcon,
    gamepad: GamepadIcon,
    default: CoinsIcon
  };

  const Icon = icons[variant];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-700 border-t-[var(--color-accent)] rounded-full animate-spin`}></div>
        {/* Inner icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <RotatingIcon 
            icon={Icon} 
            size={iconSize[size] / 2} 
            className="text-[var(--color-accent)]" 
            speed="slow"
          />
        </div>
      </div>
      {text && (
        <p className="mt-4 text-gray-400 text-center animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
  text?: string;
  variant?: 'coins' | 'trophy' | 'gamepad' | 'default';
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  text = 'Carregando...',
  variant = 'coins'
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-[#0a0e17]/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#1a2234] rounded-2xl p-8 shadow-2xl border border-[var(--color-accent)]/20">
        <LoadingSpinner size="xl" variant={variant} text={text} />
      </div>
    </div>
  );
};

interface LoadingDotsProps {
  className?: string;
  color?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ 
  className = '',
  color = 'var(--color-accent)'
}) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ 
            backgroundColor: color,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  className = '',
  showPercentage = true,
  animated = true
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Progresso</span>
        {showPercentage && (
          <span className="text-sm text-[var(--color-accent)] font-semibold">
            {Math.round(progress)}%
          </span>
        )}
      </div>
      <div className="w-full bg-[#1a2234] rounded-full h-2 overflow-hidden">
        <div 
          className={`h-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full transition-all duration-500 ease-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

