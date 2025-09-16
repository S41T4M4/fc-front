# Guia de Animações - EA FC Coins Manager

Este guia explica como usar o sistema de animações implementado no projeto.

## 🎯 Componentes de Animação Disponíveis

### 1. AnimatedCard
Componente para cards com animações de entrada e hover.

```tsx
import { AnimatedCard } from '../components/AnimatedCard';

<AnimatedCard 
  delay={200} 
  className="gamer-card p-6 rounded-xl" 
  hoverScale={true} 
  glowEffect={true}
>
  <h3>Conteúdo do Card</h3>
</AnimatedCard>
```

**Props:**
- `delay`: Delay em ms para a animação de entrada
- `hoverScale`: Ativa escala no hover
- `glowEffect`: Ativa efeito de brilho no hover

### 2. FloatingCard
Card com animação de flutuação contínua.

```tsx
import { FloatingCard } from '../components/AnimatedCard';

<FloatingCard floatSpeed="slow" className="gamer-card p-8">
  <h3>Card Flutuante</h3>
</FloatingCard>
```

**Props:**
- `floatSpeed`: 'slow' | 'medium' | 'fast'
- `direction`: 'up' | 'down' | 'left' | 'right'

### 3. AnimatedIcon
Ícones com animações interativas.

```tsx
import { AnimatedIcon } from '../components/AnimatedIcon';

<AnimatedIcon 
  icon={CoinsIcon} 
  animation="rotate" 
  size={32} 
  className="text-[var(--color-accent)]" 
/>
```

**Props:**
- `animation`: 'rotate' | 'bounce' | 'pulse' | 'wiggle' | 'glow'
- `size`: Tamanho do ícone
- `color`: Cor do ícone
- `hoverColor`: Cor no hover

### 4. AnimatedText
Texto com efeito de digitação.

```tsx
import { AnimatedText } from '../components/AnimatedText';

<AnimatedText 
  text="Texto que aparece letra por letra" 
  speed={50}
  className="text-xl text-white"
/>
```

### 5. GradientText
Texto com gradiente de cores.

```tsx
import { GradientText } from '../components/AnimatedText';

<GradientText 
  gradient="from-[var(--color-accent)] to-[var(--color-secondary)]"
  className="text-4xl font-bold"
>
  Texto com Gradiente
</GradientText>
```

## 🎨 Hooks de Animação

### 1. useScrollAnimation
Anima elementos baseado no scroll.

```tsx
import { useScrollAnimation } from '../hooks/useAnimation';

const [ref, isVisible] = useScrollAnimation({ threshold: 0.2, delay: 100 });

<div ref={ref} className={isVisible ? 'opacity-100' : 'opacity-0'}>
  Conteúdo animado
</div>
```

### 2. useCountAnimation
Anima números incrementando.

```tsx
import { useCountAnimation } from '../hooks/useAnimation';

const count = useCountAnimation(1000, 2000, 0); // (final, duração, inicial)

<span>{count}</span> // 0 → 1000 em 2 segundos
```

### 3. useHoverAnimation
Gerencia estados de hover.

```tsx
import { useHoverAnimation } from '../hooks/useAnimation';

const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverAnimation();

<div 
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  className={isHovered ? 'scale-110' : 'scale-100'}
>
  Elemento com hover
</div>
```

## 🌟 Componentes de Loading

### 1. LoadingSpinner
Spinner de carregamento com ícones.

```tsx
import { LoadingSpinner } from '../components/LoadingSpinner';

<LoadingSpinner 
  size="lg" 
  variant="coins" 
  text="Carregando moedas..." 
/>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'coins' | 'trophy' | 'gamepad' | 'default'
- `text`: Texto opcional

### 2. ProgressBar
Barra de progresso animada.

```tsx
import { ProgressBar } from '../components/LoadingSpinner';

<ProgressBar 
  progress={75} 
  showPercentage={true} 
  animated={true}
/>
```

## 🎭 Partículas e Efeitos

### 1. FloatingParticles
Partículas flutuantes no fundo.

```tsx
import { FloatingParticles } from '../components/FloatingParticles';

<FloatingParticles 
  count={25} 
  colors={['#00ccff', '#00ffaa']} 
  speed={1}
/>
```

### 2. CoinParticles
Partículas de moedas animadas.

```tsx
import { CoinParticles } from '../components/FloatingParticles';

<CoinParticles count={12} />
```

### 3. FloatingElements
Elementos de texto flutuantes.

```tsx
import { FloatingElements } from '../components/FloatingParticles';

<FloatingElements 
  elements={['EA FC', 'COINS', 'ULTIMATE TEAM']} 
  count={8} 
/>
```

## 🎪 Animações CSS Customizadas

O Tailwind foi estendido com animações customizadas:

### Animações de Movimento
- `animate-float`: Flutuação suave
- `animate-float-slow`: Flutuação lenta
- `animate-float-fast`: Flutuação rápida
- `animate-wiggle`: Balanço lateral

### Animações de Rotação
- `animate-spin-slow`: Rotação lenta
- `animate-spin-fast`: Rotação rápida
- `animate-reverse-spin`: Rotação reversa

### Animações de Efeito
- `animate-pulse-light`: Pulso suave
- `animate-pulse-strong`: Pulso intenso
- `animate-glow`: Brilho pulsante
- `animate-morph`: Transformação

### Animações de Entrada
- `animate-slide-in-left`: Desliza da esquerda
- `animate-slide-in-right`: Desliza da direita
- `animate-slide-in-up`: Desliza de baixo
- `animate-fade-in`: Aparece gradualmente
- `animate-scale-in`: Cresce gradualmente
- `animate-bounce-in`: Entra com bounce

## 📝 Exemplos Práticos

### Card com Múltiplas Animações
```tsx
<AnimatedCard delay={200} hoverScale={true} glowEffect={true}>
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
```

### Seção com Contadores Animados
```tsx
const clientCount = useCountAnimation(50000, 3000, 0);
const successRate = useCountAnimation(100, 2000, 0);

<div className="stats-section">
  <div className="stat">
    <span className="text-4xl font-bold text-[var(--color-accent)]">
      {clientCount.toLocaleString()}K+
    </span>
    <p>Clientes Satisfeitos</p>
  </div>
  <div className="stat">
    <span className="text-4xl font-bold text-[var(--color-accent)]">
      {successRate}%
    </span>
    <p>Taxa de Sucesso</p>
  </div>
</div>
```

### Hero Section com Texto Animado
```tsx
<section className="hero">
  <h1 className="text-6xl font-bold">
    <AnimatedText text="Coins para " speed={100} />
    <GradientText gradient="from-[var(--color-gold)] to-[#ffd700]">
      EA FC
    </GradientText>
    <AnimatedText text=" Ultimate Team" speed={100} />
  </h1>
</section>
```

## 🚀 Dicas de Performance

1. **Use `triggerOnce={true}`** em animações de scroll para elementos que só devem animar uma vez
2. **Limite o número de partículas** para manter boa performance
3. **Use `will-change`** em elementos que serão animados frequentemente
4. **Prefira transformações CSS** (translate, scale, rotate) em vez de mudanças de layout

## 🎨 Personalização

Para criar animações customizadas, adicione novas keyframes no `tailwind.config.js`:

```js
keyframes: {
  'custom-animation': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' },
  },
},
animation: {
  'custom': 'custom-animation 2s ease-in-out infinite',
}
```

E use no componente:
```tsx
<div className="animate-custom">
  Elemento com animação customizada
</div>
```

---

Este sistema de animações foi projetado para criar uma experiência visual rica e interativa, mantendo boa performance e usabilidade. Use com moderação para não sobrecarregar a interface!

