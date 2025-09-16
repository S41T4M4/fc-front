import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { useIntersectionObserver } from '../components/Transition';
import { 
  ShieldIcon, 
  ZapIcon, 
  HeadphonesIcon, 
  CreditCardIcon, 
  TrophyIcon, 
  CoinsIcon, 
  GamepadIcon,
  ActivityIcon,
  TrendingUpIcon,
  StarIcon,
  CheckCircleIcon,
  UsersIcon,
  ClockIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
type HomeProps = {
  setCurrentPage: (page: string) => void;
  openAuthModal: (view?: string) => void;
};
export const Home: React.FC<HomeProps> = ({
  setCurrentPage,
  openAuthModal
}) => {
  const {
    isAuthenticated,
    user
  } = useAuth();

  // State for dynamic data and animations
  const [stats, setStats] = useState({
    totalCoins: 0,
    totalSpent: 0,
    ordersCount: 0,
    lastOrder: null as Date | null
  });

  // Intersection observers for scroll animations
  const [heroRef, heroVisible] = useIntersectionObserver(0.1, true);
  const [featuresRef] = useIntersectionObserver(0.2, true);
  const [howItWorksRef] = useIntersectionObserver(0.2, true);
  const [testimonialsRef] = useIntersectionObserver(0.2, true);

  // Simulate loading user stats
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        setStats({
          totalCoins: 2500000,
          totalSpent: 450.50,
          ordersCount: 12,
          lastOrder: new Date()
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  return <div className="w-full bg-[#0a0e17] bg-game-pattern">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00ccff]/10 to-[#00ffaa]/10 pointer-events-none"></div>
        {/* Animated Background Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-[var(--color-gold)]/20 to-transparent rounded-full blur-lg animate-bounce"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className={`lg:w-1/2 space-y-8 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Welcome Message */}
              {isAuthenticated && (
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">
                    Bem-vindo de volta, {user?.nome || 'Jogador'}!
                  </span>
                </div>
              )}
              
          
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => setCurrentPage('shop')} className="group">
                  <span className="flex items-center">
                    <CoinsIcon className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                    Comprar Coins
                  </span>
                </Button>
                {!isAuthenticated && (
                  <Button variant="outline" size="lg" onClick={() => openAuthModal('register')}>
                    <span className="flex items-center">
                      <UsersIcon className="mr-2 h-5 w-5" />
                      Criar Conta
                    </span>
                  </Button>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <UsersIcon className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className="text-gray-400">50K+ jogadores</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldIcon className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className="text-gray-400">100% seguro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className="text-gray-400">Entrega rápida</span>
                </div>
              </div>
            </div>

            {/* Right Content - User Dashboard or Visual */}
            <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {isAuthenticated ? (
                // Personal Dashboard for logged users
                <div className="relative">
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
                            <h3 className="text-white font-semibold text-lg">Seu Dashboard</h3>
                            <p className="text-gray-400 text-sm">Estatísticas pessoais</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="live-indicator w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 text-xs font-medium">ATIVO</span>
                        </div>
                      </div>
                    </div>

                    {/* Personal Stats Grid */}
                    <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
                      {/* Total Coins */}
                      <div className="dashboard-card bg-gradient-to-br from-[#1a2234]/60 to-[#1a2234]/40 p-4 rounded-xl border border-[#2a3441] hover:border-[var(--color-accent)]/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <CoinsIcon className="h-5 w-5 text-[var(--color-gold)]" />
                          <span className="text-xs text-gray-400">Total</span>
                        </div>
                        <div className="space-y-1">
                          <p className="stat-counter text-2xl font-bold text-white" style={{ '--delay': '0s' } as React.CSSProperties}>
                            {stats.totalCoins.toLocaleString()}
                          </p>
                          <p className="text-xs text-[var(--color-gold)] flex items-center">
                            <CoinsIcon className="h-3 w-3 mr-1" />
                            coins compradas
                          </p>
                        </div>
                      </div>

                      {/* Total Spent */}
                      <div className="dashboard-card bg-gradient-to-br from-[#1a2234]/60 to-[#1a2234]/40 p-4 rounded-xl border border-[#2a3441] hover:border-[var(--color-accent)]/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <TrendingUpIcon className="h-5 w-5 text-green-400" />
                          <span className="text-xs text-gray-400">Gasto</span>
                        </div>
                        <div className="space-y-1">
                          <p className="stat-counter text-2xl font-bold text-white" style={{ '--delay': '0.5s' } as React.CSSProperties}>
                            R$ {stats.totalSpent.toFixed(2)}
                          </p>
                          <p className="text-xs text-green-400 flex items-center">
                            <TrendingUpIcon className="h-3 w-3 mr-1" />
                            total investido
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-semibold">Atividade Recente</h4>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-[#1a2234]/30 rounded-lg border border-[#2a3441]/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                              <CheckCircleIcon className="h-4 w-4 text-green-400" />
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">Última Compra</p>
                              <p className="text-gray-400 text-xs">{stats.ordersCount} pedidos realizados</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 text-xs font-medium">Concluído</p>
                            <p className="text-gray-400 text-xs">Hoje</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center animate-bounce">
                    <TrophyIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-[var(--color-gold)] to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                    <StarIcon className="h-5 w-5 text-[#0a0e17]" />
                  </div>
                </div>
              ) : (
                // Gaming Visual for non-logged users
                <div className="relative">
                  <div className="relative glass-morphism p-8 rounded-2xl">
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

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-[#1a2234]/50 rounded-lg">
                          <p className="text-2xl font-bold text-white">1.2M</p>
                          <p className="text-gray-400 text-sm">Coins Hoje</p>
                        </div>
                        <div className="text-center p-3 bg-[#1a2234]/50 rounded-lg">
                          <p className="text-2xl font-bold text-white">98%</p>
                          <p className="text-gray-400 text-sm">Satisfação</p>
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
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      
      {/* How It Works */}
      <section ref={howItWorksRef} className="py-16 bg-[#0a0e17] bg-game-pattern">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-3 text-white">
            Como Funciona
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Comprar coins nunca foi tão fácil. Siga estes passos simples:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/20 animate-pulse"></div>
                <div className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] text-[#0a0e17] rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold relative z-10">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Escolha sua Plataforma
              </h3>
              <p className="text-gray-400">
                Selecione entre PC ou Console para garantir a compatibilidade
                com seu jogo.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/20 animate-pulse"></div>
                <div className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] text-[#0a0e17] rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold relative z-10">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Selecione o Pacote
              </h3>
              <p className="text-gray-400">
                Escolha a quantidade de coins que deseja comprar entre nossas
                opções disponíveis.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/20 animate-pulse"></div>
                <div className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] text-[#0a0e17] rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold relative z-10">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Receba suas Coins
              </h3>
              <p className="text-gray-400">
                Após o pagamento, um dos nossos agentes irá entrar em contato com você para finalizar a compra.
              </p>
              <strong className="text-green-400">
                Transacao 100% segura e confiavel, livre de banimentos.
              </strong>
            </div>
          </div>
        </div>
      </section>
     
     
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[var(--color-accent)] opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <TrophyIcon className="h-16 w-16 mx-auto mb-6 text-white" />
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para dominar o Ultimate Team?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Compre coins agora e monte o time dos seus sonhos com os melhores
            jogadores!
          </p>
          <Button variant="primary" size="lg" onClick={() => setCurrentPage('shop')} className="shadow-lg shadow-[var(--color-accent)]/20">
            <span className="flex items-center">
              <GamepadIcon className="mr-2 h-5 w-5" />
              Ver Pacotes de Coins
            </span>
          </Button>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-[#0a0e17] bg-game-pattern">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            <div className="gamer-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-white">
                É seguro comprar coins?
              </h3>
              <p className="text-gray-300">
                Sim, utilizamos métodos avançados de transferência que minimizam
                riscos. Nosso sistema é testado e aprovado por milhares de
                clientes.
              </p>
            </div>
            <div className="gamer-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Quanto tempo leva para receber as coins?
              </h3>
              <p className="text-gray-300">
                Após a confirmação do pagamento, as coins são entregues em até
                15 minutos na maioria dos casos. Para pagamentos via boleto, o
                prazo começa após a compensação bancária.
              </p>
            </div>
            <div className="gamer-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Preciso fornecer minha senha do jogo?
              </h3>
              <p className="text-gray-300">
                Não! Nunca pedimos sua senha. Utilizamos o método de
                transferência direta que requer apenas seu ID da plataforma e o
                nome de usuário no jogo.
              </p>
            </div>
            <div className="gamer-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Quais métodos de pagamento são aceitos?
              </h3>
              <p className="text-gray-300">
                Aceitamos PIX (com 10% de desconto), cartão de crédito em até
                12x e boleto bancário.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>;
};