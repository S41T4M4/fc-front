import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { 
  ShieldIcon, 
  ZapIcon, 
  HeadphonesIcon, 
  CreditCardIcon, 
  TrophyIcon, 
  CoinsIcon, 
  GamepadIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon,
  UsersIcon,
  ClockIcon,
  LockIcon
} from 'lucide-react';

type LandingProps = {
  openAuthModal: (view?: string) => void;
};

export const Landing: React.FC<LandingProps> = ({ openAuthModal }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const testimonials = [
    {
      name: "Rafael Silva",
      platform: "PS5",
      rating: 5,
      text: "Comprei 500k coins e recebi em menos de 10 minutos! Serviço excelente e confiável, recomendo demais.",
      avatar: "RS"
    },
    {
      name: "Mariana Costa", 
      platform: "XBOX",
      rating: 5,
      text: "Já comprei em vários sites, mas aqui é o mais rápido e seguro. Nunca tive problemas com minha conta.",
      avatar: "MC"
    },
    {
      name: "Lucas Oliveira",
      platform: "PC", 
      rating: 5,
      text: "Preços justos e atendimento nota 10. O suporte me ajudou com uma dúvida às 3 da manhã! Incrível.",
      avatar: "LO"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const features = [
    {
      icon: ShieldIcon,
      title: "100% Seguro",
      description: "Transações criptografadas e sistema anti-detecção para proteger sua conta de banimentos.",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: ZapIcon,
      title: "Entrega Rápida", 
      description: "Receba suas coins em até 15 minutos após a confirmação do pagamento.",
      color: "from-yellow-500 to-orange-400"
    },
    {
      icon: HeadphonesIcon,
      title: "Suporte 24/7",
      description: "Equipe de suporte disponível a qualquer hora para ajudar com suas dúvidas.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: CreditCardIcon,
      title: "Pagamento Flexível",
      description: "Diversas opções de pagamento: PIX, cartão de crédito e boleto.",
      color: "from-purple-500 to-pink-400"
    }
  ];

  const stats = [
    { number: "50K+", label: "Clientes Satisfeitos" },
    { number: "99.9%", label: "Taxa de Sucesso" },
    { number: "< 15min", label: "Tempo de Entrega" },
    { number: "24/7", label: "Suporte Disponível" }
  ];

  return (
    <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[var(--color-accent)]/20 to-[var(--color-secondary)]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-[var(--color-gold)]/15 to-[var(--color-accent)]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[var(--color-accent)]/5 to-[var(--color-secondary)]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className={`lg:w-1/2 space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1a2234] to-[#0d1320] border border-[var(--color-accent)]/30 rounded-full">
                <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
                <span className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-wider">
                  #1 em Segurança e Velocidade
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Coins para</span>
                  <br />
                  <span className="text-[var(--color-gold)] neon-text">EA FC</span>
                  <br />
                  <span className="text-[var(--color-accent)] neon-text">Ultimate</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Monte seu time dos sonhos com as melhores cartas. Entrega rápida, 
                  preços imbatíveis e segurança total para sua conta.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => openAuthModal('register')} 
                  className="group btn-gamer bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] hover:from-[var(--color-accent-hover)] hover:to-[#3399ff] shadow-lg shadow-[var(--color-accent)]/25"
                >
                  <span className="flex items-center">
                    <CoinsIcon className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                    Começar Agora
                    <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => openAuthModal('login')}
                  className="group btn-gamer"
                >
                  <span className="flex items-center">
                    <PlayIcon className="mr-2 h-5 w-5" />
                    Já tenho conta
                  </span>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <UsersIcon className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className="text-sm text-gray-400">50K+ jogadores</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldIcon className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className="text-sm text-gray-400">100% seguro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className="text-sm text-gray-400">Entrega rápida</span>
                </div>
              </div>
            </div>

            {/* Right Content - Gaming Visual */}
            <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                {/* Main Card */}
                <div className="relative gamer-card p-8 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-secondary)]/10"></div>
                  
                  {/* Gaming Stats */}
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-gold)] to-[#ffd700] rounded-full flex items-center justify-center">
                          <TrophyIcon className="h-6 w-6 text-[#0a0e17]" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">Ultimate Team</h3>
                          <p className="text-gray-400 text-sm">Nível Pro</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[var(--color-accent)] font-bold text-2xl">2.5M</p>
                        <p className="text-gray-400 text-sm">Coins</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progresso da Temporada</span>
                        <span className="text-[var(--color-accent)]">85%</span>
                      </div>
                      <div className="w-full bg-[#1a2234] rounded-full h-2">
                        <div className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] h-2 rounded-full w-[85%] transition-all duration-1000"></div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">Atividade Recente</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 p-3 bg-[#1a2234]/50 rounded-lg">
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="h-4 w-4 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm">Coins recebidas</p>
                            <p className="text-gray-400 text-xs">+500.000 coins</p>
                          </div>
                          <span className="text-[var(--color-accent)] text-sm">Agora</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-[#1a2234]/50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <GamepadIcon className="h-4 w-4 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm">Compra realizada</p>
                            <p className="text-gray-400 text-xs">Pacote Premium</p>
                          </div>
                          <span className="text-gray-400 text-sm">2min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[#ffd700] rounded-full flex items-center justify-center animate-bounce">
                  <CoinsIcon className="h-8 w-8 text-[#0a0e17]" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center animate-pulse">
                  <StarIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0d1320] border-y border-[#1a2234]">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[var(--color-accent)] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0a0e17] bg-game-pattern">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Por que escolher nossa loja?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Oferecemos a melhor experiência para compra de coins do EA FC, com 
              segurança e rapidez para você focar apenas em montar seu time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="gamer-card p-6 rounded-xl group">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#0d1320]">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              O que dizem nossos clientes
            </h2>
            <p className="text-xl text-gray-400">
              Veja o que os jogadores estão falando sobre nossas coins
            </p>
          </div>

          <div className="relative">
            <div className="gamer-card p-8 rounded-2xl min-h-[300px] flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="flex text-[var(--color-gold)] mr-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <StarIcon key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {testimonials[currentTestimonial].avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {testimonials[currentTestimonial].platform}
                    </p>
                  </div>
                </div>
              </div>
              <blockquote className="text-xl text-gray-300 leading-relaxed mb-6">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-[var(--color-accent)] scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <TrophyIcon className="h-20 w-20 mx-auto mb-8 text-white" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para dominar o Ultimate Team?
          </h2>
          <p className="text-xl text-white mb-10 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de jogadores que já confiam em nós para potencializar 
            seus times. Comece agora e monte o time dos seus sonhos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => openAuthModal('register')}
              className="bg-white text-[#0a0e17] hover:bg-gray-100 shadow-lg"
            >
              <span className="flex items-center">
                <CoinsIcon className="mr-2 h-5 w-5" />
                Criar Conta Grátis
              </span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => openAuthModal('login')}
              className="border-white text-white hover:bg-white hover:text-[#0a0e17]"
            >
              <span className="flex items-center">
                <LockIcon className="mr-2 h-5 w-5" />
                Já tenho conta
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

