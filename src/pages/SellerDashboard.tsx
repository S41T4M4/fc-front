import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { SellerOfferForm } from '../components/SellerOfferForm';
import { SellerOffersList } from '../components/SellerOffersList';
import { useIntersectionObserver } from '../components/Transition';
import { 
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  UsersIcon,
  PackageIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  BarChart3Icon,
  ActivityIcon,
  StarIcon,
  CoinsIcon,
  TrophyIcon,
  CalendarIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  PlusIcon,
  FilterIcon,
  SearchIcon,
  ShoppingBagIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type SellerDashboardProps = {
  setCurrentPage: (page: string) => void;
};

interface SellerOffer {
  id: number;
  plataformaId: number;
  plataformaNome: string;
  quantidadeCoins: number;
  precoPor100k: number;
  taxaPlataforma: number;
  precoFinal: number;
  status: 'ativo' | 'pausado' | 'vendido' | 'cancelado';
  dataCriacao: string;
  dataAtualizacao?: string;
  dataVenda?: string;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  setCurrentPage
}) => {
  const { user } = useAuth();

  // State for seller data
  const [sellerStats, setSellerStats] = useState({
    totalEarnings: 0,
    totalSales: 0,
    pendingOrders: 0,
    completedOrders: 0,
    rating: 0,
    totalCoinsSold: 0,
    monthlyEarnings: 0,
    weeklyGrowth: 0
  });

  // State for offers management
  const [offers, setOffers] = useState<SellerOffer[]>([]);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SellerOffer | null>(null);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);

  const [recentOrders, setRecentOrders] = useState([
    {
      id: 1,
      customer: 'João Silva',
      platform: 'PC',
      amount: '500K',
      price: 45.00,
      status: 'completed',
      date: '2024-01-15',
      rating: 5
    },
    {
      id: 2,
      customer: 'Maria Santos',
      platform: 'PS5',
      amount: '1M',
      price: 85.00,
      status: 'pending',
      date: '2024-01-15',
      rating: null
    },
    {
      id: 3,
      customer: 'Pedro Costa',
      platform: 'Xbox',
      amount: '250K',
      price: 25.00,
      status: 'completed',
      date: '2024-01-14',
      rating: 4
    }
  ]);

  // Intersection observers for animations
  const [heroRef, heroVisible] = useIntersectionObserver(0.1, true);
  const [statsRef, statsVisible] = useIntersectionObserver(0.2, true);
  const [ordersRef, ordersVisible] = useIntersectionObserver(0.2, true);

  // Simulate loading seller data
  useEffect(() => {
    const timer = setTimeout(() => {
      setSellerStats({
        totalEarnings: 2450.75,
        totalSales: 28,
        pendingOrders: 3,
        completedOrders: 25,
        rating: 4.8,
        totalCoinsSold: 15000000,
        monthlyEarnings: 1250.50,
        weeklyGrowth: 15.2
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading offers data
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffers([
        {
          id: 1,
          plataformaId: 1,
          plataformaNome: 'PC',
          quantidadeCoins: 500000,
          precoPor100k: 15.00,
          taxaPlataforma: 2.50,
          precoFinal: 87.50,
          status: 'ativo',
          dataCriacao: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          plataformaId: 2,
          plataformaNome: 'PlayStation 5',
          quantidadeCoins: 1000000,
          precoPor100k: 18.00,
          taxaPlataforma: 3.00,
          precoFinal: 210.00,
          status: 'ativo',
          dataCriacao: '2024-01-14T15:45:00Z'
        },
        {
          id: 3,
          plataformaId: 3,
          plataformaNome: 'Xbox Series X',
          quantidadeCoins: 250000,
          precoPor100k: 16.50,
          taxaPlataforma: 3.00,
          precoFinal: 48.75,
          status: 'vendido',
          dataCriacao: '2024-01-13T09:20:00Z',
          dataVenda: '2024-01-13T14:30:00Z'
        },
        {
          id: 4,
          plataformaId: 4,
          plataformaNome: 'PlayStation 4',
          quantidadeCoins: 750000,
          precoPor100k: 12.00,
          taxaPlataforma: 2.75,
          precoFinal: 110.625,
          status: 'pausado',
          dataCriacao: '2024-01-12T11:15:00Z'
        }
      ]);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Functions for offer management
  const handleCreateOffer = async (data: {
    plataformaId: number;
    quantidadeCoins: number;
    precoPor100k: number;
  }) => {
    setIsLoadingOffers(true);
    
    // Simulate API call
    setTimeout(() => {
      const newOffer: SellerOffer = {
        id: Date.now(),
        plataformaId: data.plataformaId,
        plataformaNome: ['PC', 'PlayStation 5', 'Xbox Series X', 'PlayStation 4', 'Xbox One'][data.plataformaId - 1] || 'Unknown',
        quantidadeCoins: data.quantidadeCoins,
        precoPor100k: data.precoPor100k,
        taxaPlataforma: [2.50, 3.00, 3.00, 2.75, 2.75][data.plataformaId - 1] || 2.50,
        precoFinal: ((data.quantidadeCoins * data.precoPor100k) / 100000) + ((data.quantidadeCoins * ([2.50, 3.00, 3.00, 2.75, 2.75][data.plataformaId - 1] || 2.50)) / 100000),
        status: 'ativo',
        dataCriacao: new Date().toISOString()
      };
      
      setOffers(prev => [newOffer, ...prev]);
      setShowOfferForm(false);
      setIsLoadingOffers(false);
    }, 1000);
  };

  const handleEditOffer = (offer: SellerOffer) => {
    setEditingOffer(offer);
    setShowOfferForm(true);
  };

  const handleUpdateOffer = async (data: {
    plataformaId: number;
    quantidadeCoins: number;
    precoPor100k: number;
  }) => {
    if (!editingOffer) return;
    
    setIsLoadingOffers(true);
    
    // Simulate API call
    setTimeout(() => {
      setOffers(prev => prev.map(offer => 
        offer.id === editingOffer.id 
          ? {
              ...offer,
              ...data,
              plataformaNome: ['PC', 'PlayStation 5', 'Xbox Series X', 'PlayStation 4', 'Xbox One'][data.plataformaId - 1] || 'Unknown',
              taxaPlataforma: [2.50, 3.00, 3.00, 2.75, 2.75][data.plataformaId - 1] || 2.50,
              precoFinal: ((data.quantidadeCoins * data.precoPor100k) / 100000) + ((data.quantidadeCoins * ([2.50, 3.00, 3.00, 2.75, 2.75][data.plataformaId - 1] || 2.50)) / 100000),
              dataAtualizacao: new Date().toISOString()
            }
          : offer
      ));
      
      setEditingOffer(null);
      setShowOfferForm(false);
      setIsLoadingOffers(false);
    }, 1000);
  };

  const handleDeleteOffer = async (id: number) => {
    setIsLoadingOffers(true);
    
    // Simulate API call
    setTimeout(() => {
      setOffers(prev => prev.filter(offer => offer.id !== id));
      setIsLoadingOffers(false);
    }, 500);
  };

  const handleStatusChange = async (id: number, status: string) => {
    setIsLoadingOffers(true);
    
    // Simulate API call
    setTimeout(() => {
      setOffers(prev => prev.map(offer => 
        offer.id === id 
          ? {
              ...offer,
              status: status as 'ativo' | 'pausado' | 'vendido' | 'cancelado',
              dataAtualizacao: new Date().toISOString(),
              ...(status === 'vendido' && { dataVenda: new Date().toISOString() })
            }
          : offer
      ));
      setIsLoadingOffers(false);
    }, 500);
  };

  const handleViewOffer = (offer: SellerOffer) => {
    // Implementar visualização de detalhes da oferta
    console.log('View offer:', offer);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'cancelled':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen">
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
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[var(--color-accent)]/20 to-[var(--color-secondary)]/20 border border-[var(--color-accent)]/30 rounded-full">
                <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
                <span className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-wider">
                  Painel do Vendedor
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Bem-vindo,</span>
                  <br />
                  <span className="text-[var(--color-gold)] neon-text">{user?.nome}</span>
                  <br />
                  <span className="text-[var(--color-accent)] neon-text">Ao Painel do Vendedor</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Gerencie suas vendas, acompanhe suas estatísticas e maximize seus lucros na plataforma.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group"
                  onClick={() => setShowOfferForm(true)}
                >
                  <span className="flex items-center">
                    <PlusIcon className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
                    Nova Oferta
                  </span>
                </Button>
                <Button variant="outline" size="lg">
                  <span className="flex items-center">
                    <BarChart3Icon className="mr-2 h-5 w-5" />
                    Relatórios
                  </span>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <StarIcon className="h-5 w-5 text-[var(--color-gold)]" />
                  <span className="text-gray-400">Avaliação: {sellerStats.rating}/5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrophyIcon className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className="text-gray-400">Top Seller</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUpIcon className="h-5 w-5 text-green-400" />
                  <span className="text-gray-400">+{sellerStats.weeklyGrowth}% esta semana</span>
                </div>
              </div>
            </div>

            {/* Right Content - Seller Stats Dashboard */}
            <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
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
                          <h3 className="text-white font-semibold text-lg">Suas Estatísticas</h3>
                          <p className="text-gray-400 text-sm">Performance de vendas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="live-indicator w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-xs font-medium">ATIVO</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
                    {/* Total Earnings */}
                    <div className="dashboard-card bg-gradient-to-br from-[#1a2234]/60 to-[#1a2234]/40 p-4 rounded-xl border border-[#2a3441] hover:border-[var(--color-accent)]/40 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <DollarSignIcon className="h-5 w-5 text-green-400" />
                        <span className="text-xs text-gray-400">Total</span>
                      </div>
                      <div className="space-y-1">
                        <p className="stat-counter text-2xl font-bold text-white" style={{ '--delay': '0s' } as React.CSSProperties}>
                          R$ {sellerStats.totalEarnings.toFixed(2)}
                        </p>
                        <p className="text-xs text-green-400 flex items-center">
                          <TrendingUpIcon className="h-3 w-3 mr-1" />
                          ganhos totais
                        </p>
                      </div>
                    </div>

                    {/* Total Sales */}
                    <div className="dashboard-card bg-gradient-to-br from-[#1a2234]/60 to-[#1a2234]/40 p-4 rounded-xl border border-[#2a3441] hover:border-[var(--color-accent)]/40 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <PackageIcon className="h-5 w-5 text-[var(--color-gold)]" />
                        <span className="text-xs text-gray-400">Vendas</span>
                      </div>
                      <div className="space-y-1">
                        <p className="stat-counter text-2xl font-bold text-white" style={{ '--delay': '0.5s' } as React.CSSProperties}>
                          {sellerStats.totalSales}
                        </p>
                        <p className="text-xs text-[var(--color-gold)] flex items-center">
                          <PackageIcon className="h-3 w-3 mr-1" />
                          pedidos concluídos
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Performance */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-semibold">Performance Mensal</h4>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[#1a2234]/30 rounded-lg border border-[#2a3441]/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CalendarIcon className="h-4 w-4 text-green-400" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">Janeiro 2024</p>
                            <p className="text-gray-400 text-xs">R$ {sellerStats.monthlyEarnings.toFixed(2)} em vendas</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 text-xs font-medium">+{sellerStats.weeklyGrowth}%</p>
                          <p className="text-gray-400 text-xs">vs semana anterior</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center animate-bounce">
                  <TrendingUpIcon className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-[var(--color-gold)] to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                  <DollarSignIcon className="h-5 w-5 text-[#0a0e17]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview Section */}
      <section ref={statsRef} className="py-20 bg-[#0d1320] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)]/5 to-transparent"></div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1a2234] to-[#0d1320] border border-[var(--color-accent)]/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
              <span className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-wider">
                Visão Geral
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Suas{' '}
              <span className="text-[var(--color-accent)] neon-text">Estatísticas</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pending Orders */}
            <div className="group relative">
              <div className="dashboard-container glass-morphism p-8 rounded-2xl border border-[#2a3441]/50 hover:border-[var(--color-accent)]/40 transition-all duration-500 hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1a2234] to-[#101624] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <ClockIcon className="h-8 w-8 text-yellow-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    Pedidos Pendentes
                  </h3>
                  <p className="text-3xl font-bold text-yellow-400 mb-2">{sellerStats.pendingOrders}</p>
                  <p className="text-gray-400 text-sm">Aguardando processamento</p>
                </div>
              </div>
            </div>

            {/* Completed Orders */}
            <div className="group relative">
              <div className="dashboard-container glass-morphism p-8 rounded-2xl border border-[#2a3441]/50 hover:border-[var(--color-accent)]/40 transition-all duration-500 hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1a2234] to-[#101624] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircleIcon className="h-8 w-8 text-green-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    Pedidos Concluídos
                  </h3>
                  <p className="text-3xl font-bold text-green-400 mb-2">{sellerStats.completedOrders}</p>
                  <p className="text-gray-400 text-sm">Vendas finalizadas</p>
                </div>
              </div>
            </div>

            {/* Total Coins Sold */}
            <div className="group relative">
              <div className="dashboard-container glass-morphism p-8 rounded-2xl border border-[#2a3441]/50 hover:border-[var(--color-accent)]/40 transition-all duration-500 hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1a2234] to-[#101624] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <CoinsIcon className="h-8 w-8 text-[var(--color-gold)]" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    Coins Vendidas
                  </h3>
                  <p className="text-3xl font-bold text-[var(--color-gold)] mb-2">{(sellerStats.totalCoinsSold / 1000000).toFixed(1)}M</p>
                  <p className="text-gray-400 text-sm">Total de coins</p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="group relative">
              <div className="dashboard-container glass-morphism p-8 rounded-2xl border border-[#2a3441]/50 hover:border-[var(--color-accent)]/40 transition-all duration-500 hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1a2234] to-[#101624] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <StarIcon className="h-8 w-8 text-[var(--color-accent)]" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    Avaliação
                  </h3>
                  <p className="text-3xl font-bold text-[var(--color-accent)] mb-2">{sellerStats.rating}/5</p>
                  <p className="text-gray-400 text-sm">Média de avaliações</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Management Section */}
      <section ref={ordersRef} className="py-20 bg-[#0a0e17] bg-game-pattern relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1a2234] to-[#0d1320] border border-[var(--color-accent)]/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
              <span className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-wider">
                Gerenciar Ofertas
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Suas{' '}
              <span className="text-[var(--color-accent)] neon-text">Ofertas</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Crie, edite e gerencie suas ofertas de coins. Acompanhe o status e maximize seus lucros.
            </p>
          </div>

          {/* Offer Form Modal */}
          {showOfferForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <SellerOfferForm
                  onSubmit={editingOffer ? handleUpdateOffer : handleCreateOffer}
                  onCancel={() => {
                    setShowOfferForm(false);
                    setEditingOffer(null);
                  }}
                  initialData={editingOffer ? {
                    plataformaId: editingOffer.plataformaId,
                    quantidadeCoins: editingOffer.quantidadeCoins,
                    precoPor100k: editingOffer.precoPor100k
                  } : undefined}
                  isLoading={isLoadingOffers}
                />
              </div>
            </div>
          )}

          {/* Offers List */}
          <SellerOffersList
            offers={offers}
            onEdit={handleEditOffer}
            onDelete={handleDeleteOffer}
            onStatusChange={handleStatusChange}
            onView={handleViewOffer}
            isLoading={isLoadingOffers}
          />
        </div>
      </section>

      {/* Recent Orders Section */}
      <section className="py-20 bg-[#0d1320] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1a2234] to-[#0d1320] border border-[var(--color-accent)]/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
              <span className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-wider">
                Pedidos Recentes
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Histórico de{' '}
              <span className="text-[var(--color-accent)] neon-text">Vendas</span>
            </h2>
          </div>

          {/* Orders Table */}
          <div className="dashboard-container glass-morphism p-6 rounded-2xl">
            <div className="relative z-10">
              {/* Table Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">Pedidos Recentes</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar pedidos..."
                      className="pl-10 pr-4 py-2 bg-[#1a2234]/50 border border-[#2a3441] rounded-lg text-white placeholder-gray-400 focus:border-[var(--color-accent)] focus:outline-none"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#1a2234]/50 border border-[#2a3441] rounded-lg text-gray-300 hover:text-white transition-colors">
                    <FilterIcon className="h-4 w-4" />
                    <span>Filtros</span>
                  </button>
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={order.id} className="transaction-item flex items-center justify-between p-4 bg-[#1a2234]/30 rounded-lg border border-[#2a3441]/50 hover:border-[var(--color-accent)]/30 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                        <span className="text-[#0a0e17] font-bold text-lg">#{order.id}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{order.customer}</p>
                        <p className="text-gray-400 text-sm">{order.platform} • {order.amount} coins</p>
                        <p className="text-gray-500 text-xs">{order.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-white font-semibold">R$ {order.price.toFixed(2)}</p>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg bg-[#1a2234]/50 hover:bg-[#1a2234] transition-colors">
                          <EyeIcon className="h-4 w-4 text-gray-400 hover:text-white" />
                        </button>
                        <button className="p-2 rounded-lg bg-[#1a2234]/50 hover:bg-[#1a2234] transition-colors">
                          <EditIcon className="h-4 w-4 text-gray-400 hover:text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
