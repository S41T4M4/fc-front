import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { CheckIcon, CoinsIcon, ShoppingCartIcon, TrophyIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
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
};
export const Shop: React.FC<ShopProps> = ({
  setCurrentPage
}) => {
  const {
    addItem
  } = useCart();
  const {
    user,
    updateUser
  } = useAuth();
  const [platform, setPlatform] = useState<'console' | 'pc' | null>(user?.platform || null);
  // Enhanced coin packages with icons
  const consolePackages: CoinPackage[] = [{
    id: 'console-50k',
    name: 'Pacote Starter',
    amount: '50.000',
    price: 29.9,
    icon: '🥉'
  }, {
    id: 'console-100k',
    name: 'Pacote Bronze',
    amount: '100.000',
    price: 49.9,
    icon: '🥉'
  }, {
    id: 'console-300k',
    name: 'Pacote Prata',
    amount: '300.000',
    price: 129.9,
    popular: true,
    icon: '🥈'
  }, {
    id: 'console-500k',
    name: 'Pacote Ouro',
    amount: '500.000',
    price: 199.9,
    icon: '🥇'
  }, {
    id: 'console-1m',
    name: 'Pacote Diamante',
    amount: '1.000.000',
    price: 379.9,
    icon: '💎'
  }, {
    id: 'console-2m',
    name: 'Pacote Ultimate',
    amount: '2.000.000',
    price: 699.9,
    icon: '👑'
  }];
  const pcPackages: CoinPackage[] = [{
    id: 'pc-50k',
    name: 'Pacote Starter',
    amount: '50.000',
    price: 24.9,
    icon: '🥉'
  }, {
    id: 'pc-100k',
    name: 'Pacote Bronze',
    amount: '100.000',
    price: 39.9,
    icon: '🥉'
  }, {
    id: 'pc-300k',
    name: 'Pacote Prata',
    amount: '300.000',
    price: 109.9,
    popular: true,
    icon: '🥈'
  }, {
    id: 'pc-500k',
    name: 'Pacote Ouro',
    amount: '500.000',
    price: 179.9,
    icon: '🥇'
  }, {
    id: 'pc-1m',
    name: 'Pacote Diamante',
    amount: '1.000.000',
    price: 339.9,
    icon: '💎'
  }, {
    id: 'pc-2m',
    name: 'Pacote Ultimate',
    amount: '2.000.000',
    price: 649.9,
    icon: '👑'
  }];
  const handleAddToCart = (pkg: CoinPackage) => {
    if (!platform) return;
    addItem({
      id: pkg.id,
      name: pkg.name,
      amount: pkg.amount,
      price: pkg.price,
      platform
    });
    // Visual feedback animation
    const element = document.getElementById(pkg.id);
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
  const handleSelectPlatform = (selected: 'console' | 'pc') => {
    setPlatform(selected);
    if (user) {
      updateUser({
        platform: selected
      });
    }
  };
  return <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
          <span className="text-[var(--color-accent)]">FC Coins</span> para seu
          Ultimate Team
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Escolha a plataforma e o pacote ideal para você
        </p>
        {/* Platform Selection */}
        {!platform ? <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8 text-white">
              Selecione sua plataforma
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="platform-console" className="platform-selector gamer-card border-2 border-[#2a3446] hover:border-[var(--color-accent)] rounded-lg p-8 text-center cursor-pointer" onClick={() => handleSelectPlatform('console')}>
                <div className="relative mx-auto mb-4 w-24 h-24 bg-[#1a2234] rounded-full flex items-center justify-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/588/588246.png" alt="Console" className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Console
                </h3>
                <div className="flex justify-center gap-3">
                  <span className="inline-block bg-[#1a2234] px-3 py-1 rounded text-gray-300 text-sm">
                    PlayStation
                  </span>
                  <span className="inline-block bg-[#1a2234] px-3 py-1 rounded text-gray-300 text-sm">
                    Xbox
                  </span>
                </div>
              </div>
              <div id="platform-pc" className="platform-selector gamer-card border-2 border-[#2a3446] hover:border-[var(--color-accent)] rounded-lg p-8 text-center cursor-pointer" onClick={() => handleSelectPlatform('pc')}>
                <div className="relative mx-auto mb-4 w-24 h-24 bg-[#1a2234] rounded-full flex items-center justify-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/3039/3039396.png" alt="PC" className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">PC</h3>
                <div className="flex justify-center gap-3">
                  <span className="inline-block bg-[#1a2234] px-3 py-1 rounded text-gray-300 text-sm">
                    Origin
                  </span>
                  <span className="inline-block bg-[#1a2234] px-3 py-1 rounded text-gray-300 text-sm">
                    Steam
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-6">
              * Os preços e disponibilidade podem variar de acordo com a
              plataforma
            </p>
          </div> : <div>
            <div className="flex flex-col md:flex-row justify-center items-center mb-12 gap-4">
              <button onClick={() => setPlatform(null)} className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium flex items-center">
                ← Alterar Plataforma
              </button>
              <div className="hidden md:block h-6 w-px bg-[#2a3446]"></div>
              <div className="flex items-center">
                <span className="font-medium mr-2 text-gray-300">
                  Plataforma selecionada:
                </span>
                <span className="bg-[#1a2234] border border-[#2a3446] text-[var(--color-accent)] px-3 py-1 rounded-full text-sm font-medium">
                  {platform === 'console' ? 'Console (PlayStation/Xbox)' : 'PC (Origin/Steam)'}
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
                    <span className="font-bold text-[var(--color-gold)]">
                      10% OFF
                    </span>{' '}
                    em todos os pacotes pagando com PIX!
                  </p>
                </div>
                <p className="text-sm text-gray-400 mt-2 md:mt-0">
                  Promoção válida até {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            {/* Coin Packages */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(platform === 'console' ? consolePackages : pcPackages).map(pkg => <div key={pkg.id} id={pkg.id} className={`gamer-card rounded-lg overflow-hidden transition-all duration-300 ${pkg.popular ? 'border-2 border-[var(--color-gold)] relative' : 'border border-[#2a3446]'}`}>
                    {pkg.popular && <div className="absolute top-0 right-0 z-10">
                        <div className="bg-[var(--color-gold)] text-[#0a0e17] text-xs font-bold px-3 py-1 rounded-bl-lg">
                          MAIS POPULAR
                        </div>
                      </div>}
                    <div className="p-6 relative">
                      {pkg.popular && <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold)]/30 opacity-20 blur-sm rounded-lg"></div>}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{pkg.icon}</span>
                            <h3 className="text-lg font-semibold text-white">
                              {pkg.name}
                            </h3>
                          </div>
                          {pkg.popular && <TrophyIcon className="h-5 w-5 text-[var(--color-gold)]" />}
                        </div>
                        <div className="flex items-baseline mb-4">
                          <div className="text-3xl font-bold text-[var(--color-accent)] neon-text">
                            {pkg.amount}
                          </div>
                          <span className="text-sm font-normal text-gray-400 ml-1">
                            coins
                          </span>
                        </div>
                        <div className="price-tag mb-6">
                          R$ {pkg.price.toFixed(2).replace('.', ',')}
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
                        <Button fullWidth onClick={() => handleAddToCart(pkg)} variant={pkg.popular ? 'primary' : 'outline'} className="group">
                          <span className="flex items-center justify-center">
                            <ShoppingCartIcon className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                            Adicionar ao Carrinho
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>)}
            </div>
            <div className="mt-12 gamer-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Informações Importantes
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-[var(--color-accent)] mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">
                    Para receber as coins, você precisará fornecer seu ID da
                    plataforma e nome de usuário no jogo.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-[var(--color-accent)] mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">
                    A entrega é feita através do método de transferência direta,
                    sem necessidade de acesso à sua conta.
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
          </div>}
      </div>
    </div>;
};