import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { 
  ShieldIcon, 
  ZapIcon, 
  HeadphonesIcon, 
  CreditCardIcon, 
  TrophyIcon, 
  CoinsIcon, 
  StarIcon,
  ArrowRightIcon,
  PlayIcon,
  UsersIcon,
  ClockIcon,
  LockIcon,
  ActivityIcon,
  BarChart3Icon,
  TrendingUpIcon,
  MonitorIcon,
  Gamepad2Icon,
  SmartphoneIcon,
  CheckCircleIcon
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
    { number: "100%", label: "Taxa de Sucesso" },
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
                  className="group btn-gamer bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] hover:from-[var(--color-accent-hover)] hover:to-[#33.9ff] shadow-lg shadow-[var(--color-accent)]/25"
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

            {/* Right Content - Interactive Dashboard */}
            <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                {/* Dashboard Container */}
                <div className="dashboard-container relative glass-morphism p-6 rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-secondary)]/5 rounded-2xl blur-xl"></div>
                  
                  {/* Dashboard Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                          <ActivityIcon className="h-5 w-5 text-[#0a0e17]" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Dashboard em Tempo Real</h3>
                          <p className="text-gray-400 text-sm">Estatísticas ao vivo</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="live-indicator w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-xs font-medium">AO VIVO</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Stats Grid */}
                  <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
                    {/* Today's Sales */}
                    <div className="dashboard-card bg-gradient-to-br from-[#1a2234]/60 to-[#1a2234]/40 p-4 rounded-xl border border-[#2a3441] hover:border-[var(--color-accent)]/40 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <TrendingUpIcon className="h-5 w-5 text-green-400" />
                        <span className="text-xs text-gray-400">Hoje</span>
                      </div>
                      <div className="space-y-1">
                        <p className="stat-counter text-2xl font-bold text-white" style={{ '--delay': '0s' } as React.CSSProperties}>R$ 45.2K</p>
                        <p className="text-xs text-green-400 flex items-center">
                          <TrendingUpIcon className="h-3 w-3 mr-1" />
                          +12.5%
                        </p>
                      </div>
                    </div>

                    {/* Coins Delivered */}
                    <div className="dashboard-card bg-gradient-to-br from-[#1a2234]/60 to-[#1a2234]/40 p-4 rounded-xl border border-[#2a3441] hover:border-[var(--color-accent)]/40 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <CoinsIcon className="h-5 w-5 text-[var(--color-gold)]" />
                        <span className="text-xs text-gray-400">Entregues</span>
                      </div>
                      <div className="space-y-1">
                        <p className="stat-counter text-2xl font-bold text-white" style={{ '--delay': '0.5s' } as React.CSSProperties}>2.8M</p>
                        <p className="text-xs text-[var(--color-gold)] flex items-center">
                          <CoinsIcon className="h-3 w-3 mr-1" />
                          coins hoje
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Platform Chart */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-semibold">Plataformas Populares</h4>
                      <BarChart3Icon className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <div className="space-y-3">
                      {/* PC */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <MonitorIcon className="h-4 w-4 text-blue-400" />
                          </div>
                          <span className="text-white text-sm">PC</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 h-2 bg-[#1a2234] rounded-full overflow-hidden">
                            <div className="chart-bar h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="text-white text-sm font-medium">65%</span>
                        </div>
                      </div>

                      {/* PlayStation */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                            <Gamepad2Icon className="h-4 w-4 text-blue-500" />
                          </div>
                          <span className="text-white text-sm">PlayStation</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 h-2 bg-[#1a2234] rounded-full overflow-hidden">
                            <div className="chart-bar h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full" style={{ width: '25%', animationDelay: '1s' }}></div>
                          </div>
                          <span className="text-white text-sm font-medium">25%</span>
                        </div>
                      </div>

                      {/* Xbox */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                            <SmartphoneIcon className="h-4 w-4 text-green-500" />
                          </div>
                          <span className="text-white text-sm">Xbox</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 h-2 bg-[#1a2234] rounded-full overflow-hidden">
                            <div className="chart-bar h-full bg-gradient-to-r from-green-600 to-green-500 rounded-full" style={{ width: '10%', animationDelay: '1.5s' }}></div>
                          </div>
                          <span className="text-white text-sm font-medium">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Transaction Feed */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-semibold">Transações Recentes</h4>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3 max-h-48 overflow-hidden">
                      {[
                        { platform: 'PC', amount: '500K', time: '2min', status: 'completed' },
                        { platform: 'PS5', amount: '1M', time: '5min', status: 'completed' },
                        { platform: 'Xbox', amount: '250K', time: '8min', status: 'processing' },
                        { platform: 'PC', amount: '750K', time: '12min', status: 'completed' },
                        { platform: 'PS5', amount: '2M', time: '15min', status: 'completed' },
                      ].map((transaction, index) => (
                        <div key={index} className="transaction-item flex items-center justify-between p-3 bg-[#1a2234]/30 rounded-lg border border-[#2a3441]/50 hover:border-[var(--color-accent)]/30 transition-all duration-300">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.platform === 'PC' ? 'bg-blue-500/20' :
                              transaction.platform === 'PS5' ? 'bg-blue-600/20' :
                              'bg-green-600/20'
                            }`}>
                              {transaction.platform === 'PC' ? <MonitorIcon className="h-4 w-4 text-blue-400" /> :
                               transaction.platform === 'PS5' ? <Gamepad2Icon className="h-4 w-4 text-blue-500" /> :
                               <SmartphoneIcon className="h-4 w-4 text-green-500" />}
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{transaction.platform}</p>
                              <p className="text-gray-400 text-xs">{transaction.amount} coins</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="h-4 w-4 text-green-400" />
                              <span className="text-green-400 text-xs font-medium">Concluído</span>
                            </div>
                            <p className="text-gray-400 text-xs">{transaction.time} atrás</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center animate-bounce">
                  <TrendingUpIcon className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-[var(--color-gold)] to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                  <CoinsIcon className="h-5 w-5 text-[#0a0e17]" />
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
