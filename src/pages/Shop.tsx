import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { CheckIcon, CoinsIcon, ShoppingCartIcon, TrophyIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { Platform, Coin } from '../types/api';

type ShopProps = {
  setCurrentPage: (page: string) => void;
};

type CoinPackage = {
  id: string;
  name: string;
  amount: string;
  price: number;
  popular?: boolean;
  icon?: string;
  plataformaId: number;
};

export const Shop: React.FC<ShopProps> = ({ setCurrentPage }) => {
  const { addItem, createCart, cartId } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPlatforms();
  }, []);

  useEffect(() => {
    if (selectedPlatform) {
      loadCoins(selectedPlatform.idPlataforma);
    }
  }, [selectedPlatform]);

  const loadPlatforms = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getPlatforms();
      if (response.success && response.plataformas) {
        setPlatforms(response.plataformas);
      }
    } catch (error) {
      setError('Erro ao carregar plataformas');
      console.error('Error loading platforms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCoins = async (platformId: number) => {
    try {
      setIsLoading(true);
      const response = await apiService.getCoinsByPlatform(platformId);
      if (response.success && response.moedas) {
        setCoins(response.moedas);
      }
    } catch (error) {
      setError('Erro ao carregar moedas');
      console.error('Error loading coins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (coin: Coin) => {
    if (!isAuthenticated) {
      setCurrentPage('home');
      return;
    }

    const coinPackage: Omit<CoinPackage, 'quantity'> = {
      id: coin.idMoeda.toString(),
      name: `${coin.quantidade.toLocaleString()} coins`,
      amount: coin.quantidade.toString(),
      price: coin.valor,
      plataformaId: coin.plataformaId,
      platform: (coin.plataformaNome || '').toLowerCase().includes('pc') ? 'pc' : 'console',
      icon: getCoinIcon(coin.quantidade)
    };

    // Pass userId to addItem so it can create cart if needed
    await addItem(coinPackage, user?.id);

    // Visual feedback animation
    const element = document.getElementById(`coin-${coin.idMoeda}`);
    if (element) {
      element.classList.add('animate-pulse', 'border-[var(--color-accent)]');
      setTimeout(() => {
        element.classList.remove('animate-pulse', 'border-[var(--color-accent)]');
      }, 700);
    }

    // Delay navigation to show animation
    setTimeout(() => {
      setCurrentPage('cart');
    }, 300);
  };

  const getCoinIcon = (amount: number): string => {
    if (amount >= 2000000) return '👑';
    if (amount >= 1000000) return '💎';
    if (amount >= 500000) return '🥇';
    if (amount >= 300000) return '🥈';
    if (amount >= 100000) return '🥉';
    return '🪙';
  };

  const isPopular = (coin: Coin): boolean => {
    return coin.quantidade === 500000 || coin.quantidade === 1000000;
  };

  if (isLoading && platforms.length === 0) {
    return (
      <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)] mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando plataformas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={loadPlatforms}>Tentar Novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
          <span className="text-[var(--color-accent)]">FC Coins</span> para seu Ultimate Team
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Escolha a plataforma e o pacote ideal para você
        </p>

        {/* Platform Selection */}
        {!selectedPlatform ? (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8 text-white">
              Selecione sua plataforma
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map(platform => (
                <div
                  key={platform.idPlataforma}
                  className="platform-selector gamer-card border-2 border-[#2a3446] hover:border-[var(--color-accent)] rounded-lg p-8 text-center cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedPlatform(platform)}
                >
                  <div className="relative mx-auto mb-4 w-24 h-24 bg-[#1a2234] rounded-full flex items-center justify-center">
                    <CoinsIcon className="h-12 w-12 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {platform.descricaoPlataforma}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Clique para ver os pacotes disponíveis
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center mb-12 gap-4">
              <button
                onClick={() => setSelectedPlatform(null)}
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium flex items-center"
              >
                ← Alterar Plataforma
              </button>
              <div className="hidden md:block h-6 w-px bg-[#2a3446]"></div>
              <div className="flex items-center">
                <span className="font-medium mr-2 text-gray-300">
                  Plataforma selecionada:
                </span>
                <span className="bg-[#1a2234] border border-[#2a3446] text-[var(--color-accent)] px-3 py-1 rounded-full text-sm font-medium">
                  {selectedPlatform.descricaoPlataforma}
                </span>
              </div>
            </div>

            {/* Banner Promotion */}
            <div className="gamer-card rounded-lg p-4 mb-12 overflow-hidden relative">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-tr from-[var(--color-gold)]/20 to-transparent rounded-full blur-3xl"></div>
              <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="flex items-center">
                  <span className="bg-[#1a2234] p-2 rounded-full mr-3">
                    <CoinsIcon className="h-6 w-6 text-[var(--color-gold)]" />
                  </span>
                  <p className="font-medium text-white">
                    <span className="font-bold text-[var(--color-gold)]">10% OFF</span> em todos os pacotes pagando com PIX!
                  </p>
                </div>
                <p className="text-sm text-gray-400 mt-2 md:mt-0">
                  Promoção válida até {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Coin Packages */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)] mx-auto mb-4"></div>
                <p className="text-gray-400">Carregando pacotes...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coins.map(coin => (
                  <div
                    key={coin.idMoeda}
                    id={`coin-${coin.idMoeda}`}
                    className={`gamer-card rounded-lg overflow-hidden transition-all duration-300 ${
                      isPopular(coin) ? 'border-2 border-[var(--color-gold)] relative' : 'border border-[#2a3446]'
                    }`}
                  >
                    {isPopular(coin) && (
                      <div className="absolute top-0 right-0 z-10">
                        <div className="bg-[var(--color-gold)] text-[#0a0e17] text-xs font-bold px-3 py-1 rounded-bl-lg">
                          MAIS POPULAR
                        </div>
                      </div>
                    )}
                    <div className="p-6 relative">
                      {isPopular(coin) && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold)]/30 opacity-20 blur-sm rounded-lg"></div>
                      )}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{getCoinIcon(coin.quantidade)}</span>
                            <h3 className="text-lg font-semibold text-white">
                              {coin.quantidade >= 1000000 ? 'Pacote Diamante' : 
                               coin.quantidade >= 500000 ? 'Pacote Ouro' :
                               coin.quantidade >= 300000 ? 'Pacote Prata' :
                               coin.quantidade >= 100000 ? 'Pacote Bronze' : 'Pacote Starter'}
                            </h3>
                          </div>
                          {isPopular(coin) && <TrophyIcon className="h-5 w-5 text-[var(--color-gold)]" />}
                        </div>
                        <div className="flex items-baseline mb-4">
                          <div className="text-3xl font-bold text-[var(--color-accent)] neon-text">
                            {coin.quantidade.toLocaleString()}
                          </div>
                          <span className="text-sm font-normal text-gray-400 ml-1">coins</span>
                        </div>
                        <div className="price-tag mb-6">
                          R$ {coin.valor.toFixed(2).replace('.', ',')}
                        </div>
                        <ul className="mb-6 space-y-2">
                          <li className="flex items-center text-sm text-gray-300">
                            <CheckIcon className="h-4 w-4 text-[var(--color-accent)] mr-2" />
                            Entrega em até 15 minutos
                          </li>
                          <li className="flex items-center text-sm text-gray-300">
                            <CheckIcon className="h-4 w-4 text-[var(--color-accent)] mr-2" />
                            Transferência segura
                          </li>
                          <li className="flex items-center text-sm text-gray-300">
                            <CheckIcon className="h-4 w-4 text-[var(--color-accent)] mr-2" />
                            Suporte 24/7
                          </li>
                        </ul>
                        <Button
                          fullWidth
                          onClick={() => handleAddToCart(coin)}
                          variant={isPopular(coin) ? 'primary' : 'outline'}
                          className="group"
                        >
                          <span className="flex items-center justify-center">
                            <ShoppingCartIcon className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                            Adicionar ao Carrinho
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 gamer-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Informações Importantes
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-[var(--color-accent)] mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">
                    Para receber as coins, você precisará fornecer seu ID da plataforma e nome de usuário no jogo.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-[var(--color-accent)] mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">
                    A entrega é feita através do método de transferência direta, sem necessidade de acesso à sua conta.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-[var(--color-accent)] mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">
                    Pagamentos via PIX têm 10% de desconto e entrega priorizada.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};