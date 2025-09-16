import React from 'react';
import { AnimatedCard, FloatingCard, PulseCard } from './AnimatedCard';
import { AnimatedIcon, RotatingIcon, MorphingIcon } from './AnimatedIcon';
import { AnimatedText, GradientText } from './AnimatedText';
import { LoadingSpinner, ProgressBar } from './LoadingSpinner';
import { useScrollAnimation, useParallax, useScrollProgress } from '../hooks/useScrollAnimations';
import { 
  ShieldIcon, 
  ZapIcon, 
  HeadphonesIcon, 
  CreditCardIcon,
  CoinsIcon,
  TrophyIcon,
  GamepadIcon
} from 'lucide-react';

export const AnimationDemo: React.FC = () => {
  const [ref1, isVisible1] = useScrollAnimation({ threshold: 0.2, delay: 100 });
  const [ref2, isVisible2] = useScrollAnimation({ threshold: 0.3, delay: 200 });
  const [parallaxRef, parallaxOffset] = useParallax(0.3);
  const scrollProgress = useScrollProgress();

  const morphingIcons = [CoinsIcon, TrophyIcon, GamepadIcon];

  return (
    <div className="min-h-screen bg-[#0a0e17] p-8 space-y-16">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-secondary)]/20 rounded-full blur-3xl"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />
        <div className="text-center z-10">
          <h1 className="text-6xl font-bold mb-8">
            <GradientText gradient="from-[var(--color-accent)] to-[var(--color-secondary)]">
              Animações Incríveis
            </GradientText>
          </h1>
          <AnimatedText 
            text="Demonstração de todas as animações disponíveis" 
            speed={50}
            className="text-xl text-gray-300"
          />
        </div>
      </section>

      {/* Animated Cards Section */}
      <section className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Cards Animados
        </h2>
        
        <div ref={ref1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedCard 
            delay={100} 
            className="gamer-card p-6 rounded-xl" 
            hoverScale={true} 
            glowEffect={true}
          >
            <div className="text-center">
              <AnimatedIcon 
                icon={ShieldIcon} 
                animation="glow" 
                size={48} 
                className="mx-auto mb-4 text-[var(--color-accent)]" 
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Segurança
              </h3>
              <p className="text-gray-400">
                Sistema 100% seguro e confiável
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard 
            delay={200} 
            className="gamer-card p-6 rounded-xl" 
            hoverScale={true} 
            glowEffect={true}
          >
            <div className="text-center">
              <AnimatedIcon 
                icon={ZapIcon} 
                animation="pulse" 
                size={48} 
                className="mx-auto mb-4 text-[var(--color-accent)]" 
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Velocidade
              </h3>
              <p className="text-gray-400">
                Entrega em até 15 minutos
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard 
            delay={300} 
            className="gamer-card p-6 rounded-xl" 
            hoverScale={true} 
            glowEffect={true}
          >
            <div className="text-center">
              <AnimatedIcon 
                icon={HeadphonesIcon} 
                animation="wiggle" 
                size={48} 
                className="mx-auto mb-4 text-[var(--color-accent)]" 
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Suporte 24/7
              </h3>
              <p className="text-gray-400">
                Atendimento sempre disponível
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard 
            delay={400} 
            className="gamer-card p-6 rounded-xl" 
            hoverScale={true} 
            glowEffect={true}
          >
            <div className="text-center">
              <AnimatedIcon 
                icon={CreditCardIcon} 
                animation="rotate" 
                size={48} 
                className="mx-auto mb-4 text-[var(--color-accent)]" 
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Pagamentos
              </h3>
              <p className="text-gray-400">
                Múltiplas formas de pagamento
              </p>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Floating Elements Section */}
      <section className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Elementos Flutuantes
        </h2>
        
        <div ref={ref2} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FloatingCard floatSpeed="slow" className="gamer-card p-8 rounded-xl">
            <div className="text-center">
              <RotatingIcon 
                icon={CoinsIcon} 
                size={64} 
                className="mx-auto mb-4 text-[var(--color-gold)]" 
                speed="slow"
              />
              <h3 className="text-2xl font-bold text-white mb-2">
                Moedas
              </h3>
              <p className="text-gray-400">
                Rotação suave e contínua
              </p>
            </div>
          </FloatingCard>

          <FloatingCard floatSpeed="medium" className="gamer-card p-8 rounded-xl">
            <div className="text-center">
              <MorphingIcon 
                icons={morphingIcons} 
                size={64} 
                className="mx-auto mb-4 text-[var(--color-accent)]"
                interval={2000}
              />
              <h3 className="text-2xl font-bold text-white mb-2">
                Transformação
              </h3>
              <p className="text-gray-400">
                Ícones que mudam automaticamente
              </p>
            </div>
          </FloatingCard>

          <PulseCard 
            intensity="strong" 
            pulseColor="var(--color-secondary)"
            className="gamer-card p-8 rounded-xl"
          >
            <div className="text-center">
              <TrophyIcon size={64} className="mx-auto mb-4 text-[var(--color-gold)]" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Pulsação
              </h3>
              <p className="text-gray-400">
                Efeito de pulso intenso
              </p>
            </div>
          </PulseCard>
        </div>
      </section>

      {/* Loading Animations Section */}
      <section className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Animações de Loading
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="gamer-card p-6 rounded-xl text-center">
            <LoadingSpinner size="lg" variant="coins" text="Carregando moedas..." />
          </div>
          
          <div className="gamer-card p-6 rounded-xl text-center">
            <LoadingSpinner size="lg" variant="trophy" text="Processando..." />
          </div>
          
          <div className="gamer-card p-6 rounded-xl text-center">
            <LoadingSpinner size="lg" variant="gamepad" text="Conectando..." />
          </div>
          
          <div className="gamer-card p-6 rounded-xl text-center">
            <LoadingSpinner size="lg" variant="default" text="Aguarde..." />
          </div>
        </div>

        {/* Progress Bar Demo */}
        <div className="mt-12 gamer-card p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Barra de Progresso
          </h3>
          <ProgressBar 
            progress={75} 
            showPercentage={true} 
            animated={true}
            className="max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Text Animations Section */}
      <section className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Animações de Texto
        </h2>
        
        <div className="gamer-card p-8 rounded-xl">
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Texto com Gradiente
              </h3>
              <GradientText 
                gradient="from-[var(--color-accent)] to-[var(--color-secondary)]"
                className="text-4xl font-bold"
              >
                EA FC Ultimate Team
              </GradientText>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Texto Animado (Digitação)
              </h3>
              <AnimatedText 
                text="Monte seu time dos sonhos com as melhores cartas do jogo!"
                speed={50}
                className="text-xl text-gray-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for scroll effect */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Fim da Demonstração
          </h2>
          <p className="text-xl text-gray-400">
            Role para cima para ver todas as animações novamente
          </p>
        </div>
      </div>
    </div>
  );
};

