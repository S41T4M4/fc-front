import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { CheckIcon, CreditCardIcon, BarcodeIcon } from 'lucide-react';
type CheckoutProps = {
  setCurrentPage: (page: string) => void;
};
type PaymentMethod = 'pix' | 'credit_card' | 'boleto';
export const Checkout: React.FC<CheckoutProps> = ({
  setCurrentPage
}) => {
  const {
    items,
    total,
    clearCart
  } = useCart();
  const {
    user,
    isAuthenticated
  } = useAuth();
  const [currentStep, setCurrentStep] = useState<'info' | 'payment' | 'confirmation'>('info');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameInfo, setGameInfo] = useState({
    username: '',
    platform: user?.platform || 'console'
  });
  // Apply 10% discount for PIX payments
  const discountAmount = paymentMethod === 'pix' ? total * 0.1 : 0;
  const finalTotal = total - discountAmount;
  if (items.length === 0) {
    setCurrentPage('cart');
    return null;
  }
  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setCurrentStep('confirmation');
  };
  const handleFinish = () => {
    clearCart();
    setCurrentPage('home');
  };
  const renderStepIndicator = () => <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
          1
        </div>
        <div className={`h-1 w-16 ${currentStep !== 'info' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
      </div>
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep !== 'info' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          2
        </div>
        <div className={`h-1 w-16 ${currentStep === 'confirmation' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
      </div>
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          3
        </div>
      </div>
    </div>;
  return <div className="w-full bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Checkout
        </h1>
        <p className="text-gray-600 text-center mb-8">
          {currentStep === 'info' && 'Forneça suas informações para entrega'}
          {currentStep === 'payment' && 'Escolha sua forma de pagamento'}
          {currentStep === 'confirmation' && 'Pedido confirmado com sucesso!'}
        </p>
        {renderStepIndicator()}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Step 1: Game Information */}
          {currentStep === 'info' && <div>
              <h2 className="text-xl font-semibold mb-6">
                Informações para Entrega
              </h2>
              <form onSubmit={handleSubmitInfo}>
                {!isAuthenticated && <div className="mb-6 p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                    <p className="text-yellow-700 text-sm">
                      Você não está logado. Recomendamos criar uma conta ou
                      fazer login para acompanhar seus pedidos.
                    </p>
                  </div>}
                <div className="mb-6">
                  <Input label="Nome de Usuário no Jogo" placeholder="Seu nome de usuário no EA FC" value={gameInfo.username} onChange={e => setGameInfo({
                ...gameInfo,
                username: e.target.value
              })} required />
                  <p className="text-xs text-gray-500 mt-1">
                    Este é o nome exato que aparece no seu perfil do EA FC
                  </p>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plataforma
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input type="radio" name="platform" value="console" checked={gameInfo.platform === 'console'} onChange={() => setGameInfo({
                    ...gameInfo,
                    platform: 'console'
                  })} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700">
                        PlayStation / Xbox
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="platform" value="pc" checked={gameInfo.platform === 'pc'} onChange={() => setGameInfo({
                    ...gameInfo,
                    platform: 'pc'
                  })} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700">
                        PC (Origin / Steam)
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentPage('cart')}>
                    Voltar para o Carrinho
                  </Button>
                  <Button type="submit">Continuar para Pagamento</Button>
                </div>
              </form>
            </div>}
          {/* Step 2: Payment */}
          {currentStep === 'payment' && <div>
              <h2 className="text-xl font-semibold mb-6">Forma de Pagamento</h2>
              <form onSubmit={handleSubmitPayment}>
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'pix' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`} onClick={() => setPaymentMethod('pix')}>
                      <div className="flex items-center mb-2">
                        <input type="radio" name="paymentMethod" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} className="h-4 w-4 text-blue-600" />
                        <span className="ml-2 font-medium">PIX</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pagamento instantâneo
                      </p>
                      <div className="mt-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        10% de desconto
                      </div>
                    </div>
                    <div className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`} onClick={() => setPaymentMethod('credit_card')}>
                      <div className="flex items-center mb-2">
                        <input type="radio" name="paymentMethod" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} className="h-4 w-4 text-blue-600" />
                        <span className="ml-2 font-medium">
                          Cartão de Crédito
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Em até 12x sem juros
                      </p>
                      <div className="mt-2 flex">
                        <CreditCardIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'boleto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`} onClick={() => setPaymentMethod('boleto')}>
                      <div className="flex items-center mb-2">
                        <input type="radio" name="paymentMethod" checked={paymentMethod === 'boleto'} onChange={() => setPaymentMethod('boleto')} className="h-4 w-4 text-blue-600" />
                        <span className="ml-2 font-medium">
                          Boleto Bancário
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Prazo de 1-3 dias úteis
                      </p>
                      <div className="mt-2 flex">
                        <BarcodeIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                {paymentMethod === 'credit_card' && <div className="mb-8 border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Dados do Cartão
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Nome no Cartão" placeholder="Como aparece no cartão" value="" onChange={() => {}} required />
                      <Input label="Número do Cartão" placeholder="0000 0000 0000 0000" value="" onChange={() => {}} required />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <Input label="Mês" placeholder="MM" value="" onChange={() => {}} required />
                      <Input label="Ano" placeholder="AA" value="" onChange={() => {}} required />
                      <Input label="CVV" placeholder="123" value="" onChange={() => {}} required />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Parcelas
                        </label>
                        <select className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500 border-gray-300">
                          <option>
                            1x de R$ {finalTotal.toFixed(2).replace('.', ',')}
                          </option>
                          <option>
                            2x de R${' '}
                            {(finalTotal / 2).toFixed(2).replace('.', ',')}
                          </option>
                          <option>
                            3x de R${' '}
                            {(finalTotal / 3).toFixed(2).replace('.', ',')}
                          </option>
                          <option>
                            6x de R${' '}
                            {(finalTotal / 6).toFixed(2).replace('.', ',')}
                          </option>
                          <option>
                            12x de R${' '}
                            {(finalTotal / 12).toFixed(2).replace('.', ',')}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>}
                {paymentMethod === 'pix' && <div className="mb-8 border rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold mb-4">
                      Pagamento via PIX
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Após confirmar o pedido, você receberá um QR Code para
                      pagamento.
                    </p>
                    <div className="bg-green-50 text-green-800 p-3 rounded-md inline-block">
                      10% de desconto aplicado!
                    </div>
                  </div>}
                {paymentMethod === 'boleto' && <div className="mb-8 border rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold mb-4">
                      Pagamento via Boleto
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Após confirmar o pedido, você receberá o boleto para
                      pagamento.
                    </p>
                    <p className="text-yellow-600 text-sm">
                      Atenção: A entrega só será realizada após a compensação do
                      boleto (1-3 dias úteis).
                    </p>
                  </div>}
                {/* Order Summary */}
                <div className="mb-8 border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Resumo do Pedido
                  </h3>
                  {items.map(item => <div key={item.id} className="flex justify-between mb-2">
                      <span className="text-gray-600">
                        {item.quantity}x {item.name} ({item.amount} coins)
                      </span>
                      <span>
                        R${' '}
                        {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>)}
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    {discountAmount > 0 && <div className="flex justify-between mb-2 text-green-600">
                        <span>Desconto PIX (10%)</span>
                        <span>
                          - R$ {discountAmount.toFixed(2).replace('.', ',')}
                        </span>
                      </div>}
                    <div className="flex justify-between font-semibold text-lg mt-2">
                      <span>Total</span>
                      <span>R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep('info')} disabled={isProcessing}>
                    Voltar
                  </Button>
                  <Button type="submit" isLoading={isProcessing}>
                    Finalizar Pedido
                  </Button>
                </div>
              </form>
            </div>}
          {/* Step 3: Confirmation */}
          {currentStep === 'confirmation' && <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 rounded-full p-4">
                  <CheckIcon className="h-16 w-16 text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Pedido Confirmado!
              </h2>
              <p className="text-lg mb-6">
                Obrigado pela sua compra. Seu pedido foi recebido com sucesso.
              </p>
              <div className="max-w-md mx-auto mb-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-4">Detalhes do Pedido</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Número do Pedido:</span>
                  <span className="font-medium">
                    #FC{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">
                    {paymentMethod === 'pix' ? 'Aguardando pagamento PIX' : paymentMethod === 'credit_card' ? 'Processando pagamento' : 'Aguardando pagamento do boleto'}
                  </span>
                </div>
              </div>
              {paymentMethod === 'pix' && <div className="max-w-md mx-auto mb-8 p-6 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold mb-4">
                    Instruções de Pagamento PIX
                  </h3>
                  <div className="bg-white p-4 rounded-lg mb-4 flex justify-center">
                    {/* Placeholder for QR Code */}
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                      QR Code PIX
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Escaneie o QR Code acima com o aplicativo do seu banco ou
                    copie a chave PIX abaixo:
                  </p>
                  <div className="flex items-center justify-between bg-white p-2 rounded border">
                    <code className="text-xs truncate">
                      fc1234567890abcdef1234567890abcdef
                    </code>
                    <button className="text-blue-600 text-sm">Copiar</button>
                  </div>
                </div>}
              <p className="text-gray-600 mb-8">
                Você receberá um e-mail com os detalhes do seu pedido.
                <br />
                Em caso de dúvidas, entre em contato com nosso suporte.
              </p>
              <Button onClick={handleFinish}>
                Voltar para a Página Inicial
              </Button>
            </div>}
        </div>
      </div>
    </div>;
};