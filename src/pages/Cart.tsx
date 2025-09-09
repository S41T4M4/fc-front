import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Trash2Icon, ShoppingCartIcon, ArrowRightIcon, LoaderIcon, AlertCircleIcon } from 'lucide-react';

type CartProps = {
  setCurrentPage: (page: string) => void;
};

export const Cart: React.FC<CartProps> = ({ setCurrentPage }) => {
  const {
    items,
    removeItem,
    updateQuantity,
    total,
    itemCount,
    isLoading,
    error,
    loadCart,
    cartId
  } = useCart();
  
  const { user, isAuthenticated } = useAuth();
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user && !cartId) {
      console.log('Cart page: Loading cart for user:', user.id);
      loadUserCart();
    }
  }, [isAuthenticated, user, cartId]);

  const loadUserCart = async () => {
    if (!user) return;
    
    console.log('Cart page: Starting to load cart for user:', user.id);
    setIsLoadingCart(true);
    setCartError(null);
    
    try {
      await loadCart(user.id);
      console.log('Cart page: Cart loaded successfully');
    } catch (error) {
      console.error('Cart page: Error loading cart:', error);
      setCartError('Erro ao carregar carrinho');
    } finally {
      setIsLoadingCart(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItem(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      await updateQuantity(itemId, quantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      setCurrentPage('home');
      return;
    }
    
    if (items.length === 0) {
      setCurrentPage('shop');
      return;
    }
    
    setCurrentPage('checkout');
  };
  // Show loading state
  if (isLoadingCart || (isAuthenticated && !cartId && !cartError)) {
    return (
      <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)] mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando carrinho...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (cartError || error) {
    return (
      <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
            <AlertCircleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Erro ao carregar carrinho</h2>
            <p className="text-gray-400 mb-6">{cartError || error}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={loadUserCart}>
                Tentar Novamente
              </Button>
              <Button onClick={() => setCurrentPage('shop')}>
                Ir para Loja
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty cart for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="gamer-card rounded-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-[#1a2234] p-4 rounded-full">
                <ShoppingCartIcon className="h-16 w-16 text-gray-500" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Faça login para acessar seu carrinho
            </h2>
            <p className="text-gray-400 mb-8">
              Entre com sua conta para ver os itens do seu carrinho
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setCurrentPage('home')}>
                Fazer Login
              </Button>
              <Button variant="outline" onClick={() => setCurrentPage('shop')}>
                Ver Produtos
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
          Seu Carrinho
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Revise seus itens antes de finalizar a compra
        </p>

        {items.length === 0 ? (
          <div className="gamer-card rounded-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-[#1a2234] p-4 rounded-full">
                <ShoppingCartIcon className="h-16 w-16 text-gray-500" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-400 mb-8">
              Adicione pacotes de coins para continuar com sua compra
            </p>
            <Button onClick={() => setCurrentPage('shop')}>
              <span className="flex items-center">
                Ver Pacotes Disponíveis
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="gamer-card rounded-lg overflow-hidden">
                <div className="p-6 border-b border-[#2a3446]">
                  <h2 className="text-xl font-semibold text-white">
                    Itens do Carrinho ({itemCount})
                  </h2>
                </div>
                {items.map(item => (
                  <div key={item.id} className="p-6 border-b border-[#2a3446] hover:bg-[#151c2d] transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="font-medium text-lg text-white">
                          {item.name}
                        </h3>
                        <div className="flex items-center">
                          <span className="text-[var(--color-accent)] font-semibold mr-2">
                            {item.amount} coins
                          </span>
                          <span className="text-gray-400 text-sm">
                            • {item.platform === 'console' ? 'Console' : 'PC'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-6">
                          <div className="flex items-center border border-[#2a3446] rounded bg-[#1a2234]">
                            <button 
                              className="px-3 py-1 text-gray-300 hover:text-white hover:bg-[#2a3446] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} 
                              disabled={isLoading}
                              aria-label="Diminuir quantidade"
                            >
                              {isLoading ? <LoaderIcon className="h-4 w-4 animate-spin" /> : '-'}
                            </button>
                            <span className="px-3 py-1 border-x border-[#2a3446] text-white font-medium">
                              {item.quantity}
                            </span>
                            <button 
                              className="px-3 py-1 text-gray-300 hover:text-white hover:bg-[#2a3446] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} 
                              disabled={isLoading}
                              aria-label="Aumentar quantidade"
                            >
                              {isLoading ? <LoaderIcon className="h-4 w-4 animate-spin" /> : '+'}
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg text-[var(--color-gold)]">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.id)} 
                            className="text-red-400 text-sm flex items-center hover:text-red-300 mt-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                            disabled={isLoading}
                            aria-label="Remover item"
                          >
                            {isLoading ? <LoaderIcon className="h-4 w-4 animate-spin mr-1" /> : <Trash2Icon className="h-4 w-4 mr-1" />}
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentPage('shop')}>
                  <span className="flex items-center">
                    ← Continuar Comprando
                  </span>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="gamer-card rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6 text-white">
                  Resumo do Pedido
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Desconto</span>
                    <span>R$ 0,00</span>
                  </div>
                  <div className="border-t border-[#2a3446] pt-4 flex justify-between font-bold text-lg">
                    <span className="text-white">Total</span>
                    <span className="text-[var(--color-gold)]">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
                <Button 
                  fullWidth 
                  size="lg" 
                  onClick={handleProceedToCheckout} 
                  className="shadow-lg shadow-[var(--color-accent)]/10"
                  disabled={isLoading}
                >
                  <span className="flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        Finalizar Compra
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </span>
                </Button>
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Pagamento 100% seguro e criptografado
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};