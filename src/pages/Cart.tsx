import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { Trash2Icon, ShoppingCartIcon, ArrowRightIcon } from 'lucide-react';
type CartProps = {
  setCurrentPage: (page: string) => void;
};
export const Cart: React.FC<CartProps> = ({
  setCurrentPage
}) => {
  const {
    items,
    removeItem,
    updateQuantity,
    total,
    itemCount
  } = useCart();
  return <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
          Seu Carrinho
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Revise seus itens antes de finalizar a compra
        </p>
        {items.length === 0 ? <div className="gamer-card rounded-lg p-8 text-center">
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
          </div> : <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="gamer-card rounded-lg overflow-hidden">
                <div className="p-6 border-b border-[#2a3446]">
                  <h2 className="text-xl font-semibold text-white">
                    Itens do Carrinho ({itemCount})
                  </h2>
                </div>
                {items.map(item => <div key={item.id} className="p-6 border-b border-[#2a3446] hover:bg-[#151c2d] transition-colors">
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
                            <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-[#2a3446] transition-colors" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Diminuir quantidade">
                              -
                            </button>
                            <span className="px-3 py-1 border-x border-[#2a3446] text-white font-medium">
                              {item.quantity}
                            </span>
                            <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-[#2a3446] transition-colors" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Aumentar quantidade">
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg text-[var(--color-gold)]">
                            R${' '}
                            {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-red-400 text-sm flex items-center hover:text-red-300 mt-1 transition-colors" aria-label="Remover item">
                            <Trash2Icon className="h-4 w-4 mr-1" />
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>)}
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
                <Button fullWidth size="lg" onClick={() => setCurrentPage('checkout')} className="shadow-lg shadow-[var(--color-accent)]/10">
                  <span className="flex items-center justify-center">
                    Finalizar Compra
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </span>
                </Button>
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Pagamento 100% seguro e criptografado
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};