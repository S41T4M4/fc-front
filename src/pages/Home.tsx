import React from 'react';
import { Button } from '../components/Button';
import { ShieldIcon, ZapIcon, HeadphonesIcon, CreditCardIcon, TrophyIcon, CoinsIcon, GamepadIcon } from 'lucide-react';
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
    isAuthenticated
  } = useAuth();
  return <div className="w-full bg-[#0a0e17] bg-game-pattern">
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00ccff]/10 to-[#00ffaa]/10 pointer-events-none"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <span className="inline-block px-4 py-1 bg-[#1a2234] text-[var(--color-accent)] rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
                Potencialize seu Ultimate Team
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Coins para{' '}
                <span className="text-[var(--color-gold)] neon-text">
                  EA FC
                </span>{' '}
                do jeito{' '}
                <span className="text-[var(--color-accent)] neon-text">
                  PRO
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Monte seu time dos sonhos com as melhores cartas. Entrega
                rápida, preços imbatíveis e segurança total para sua conta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => setCurrentPage('shop')} className="group">
                  <span className="flex items-center">
                    Comprar Coins
                    <CoinsIcon className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                  </span>
                </Button>
                {!isAuthenticated && <Button variant="outline" size="lg" onClick={() => openAuthModal('register')}>
                    Criar Conta
                  </Button>}
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] rounded-lg blur-lg opacity-75"></div>
                <img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80" alt="EA FC Gaming" className="relative rounded-lg shadow-xl w-full h-auto object-cover z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-[#0d1320]">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-3 text-white">
            Por que escolher nossa loja?
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Oferecemos a melhor experiência para compra de coins do EA FC, com
            segurança e rapidez para você focar apenas em montar seu time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="gamer-card p-6 rounded-lg">
              <div className="bg-gradient-to-br from-[#1a2234] to-[#101624] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ShieldIcon className="h-6 w-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                100% Seguro
              </h3>
              <p className="text-gray-400">
                Transações criptografadas e sistema anti-detecção para proteger
                sua conta de banimentos.
              </p>
            </div>
            <div className="gamer-card p-6 rounded-lg">
              <div className="bg-gradient-to-br from-[#1a2234] to-[#101624] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ZapIcon className="h-6 w-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Entrega Rápida
              </h3>
              <p className="text-gray-400">
                Receba suas coins em até 15 minutos após a confirmação do
                pagamento.
              </p>
            </div>
            <div className="gamer-card p-6 rounded-lg">
              <div className="bg-gradient-to-br from-[#1a2234] to-[#101624] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <HeadphonesIcon className="h-6 w-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Suporte 24/7
              </h3>
              <p className="text-gray-400">
                Equipe de suporte disponível a qualquer hora para ajudar com
                suas dúvidas.
              </p>
            </div>
            <div className="gamer-card p-6 rounded-lg">
              <div className="bg-gradient-to-br from-[#1a2234] to-[#101624] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CreditCardIcon className="h-6 w-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Pagamento Flexível
              </h3>
              <p className="text-gray-400">
                Diversas opções de pagamento: PIX, cartão de crédito e boleto.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-16 bg-[#0a0e17] bg-game-pattern">
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
     
      <section className="py-16 bg-[#0d1320]">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-3 text-white">
            O que dizem nossos clientes
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Veja o que os jogadores estão falando sobre nossas coins:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gamer-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-[var(--color-gold)]">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Comprei 500k coins e recebi em menos de 10 minutos! Serviço
                excelente e confiável, recomendo demais."
              </p>
              <div className="flex items-center">
                <div className="font-medium text-[var(--color-accent)]">
                  Rafael Silva
                </div>
                <div className="ml-2 px-2 py-0.5 bg-[#1a2234] text-gray-400 text-xs rounded">
                  PS5
                </div>
              </div>
            </div>
            <div className="gamer-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-[var(--color-gold)]">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Já comprei em vários sites, mas aqui é o mais rápido e seguro.
                Nunca tive problemas com minha conta."
              </p>
              <div className="flex items-center">
                <div className="font-medium text-[var(--color-accent)]">
                  Mariana Costa
                </div>
                <div className="ml-2 px-2 py-0.5 bg-[#1a2234] text-gray-400 text-xs rounded">
                  XBOX
                </div>
              </div>
            </div>
            <div className="gamer-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-[var(--color-gold)]">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Preços justos e atendimento nota 10. O suporte me ajudou com
                uma dúvida às 3 da manhã! Incrível."
              </p>
              <div className="flex items-center">
                <div className="font-medium text-[var(--color-accent)]">
                  Lucas Oliveira
                </div>
                <div className="ml-2 px-2 py-0.5 bg-[#1a2234] text-gray-400 text-xs rounded">
                  PC
                </div>
              </div>
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