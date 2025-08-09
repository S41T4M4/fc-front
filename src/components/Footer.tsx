import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
type FooterProps = {
  setCurrentPage: (page: string) => void;
};
export const Footer: React.FC<FooterProps> = ({
  setCurrentPage
}) => {
  return <footer className="bg-[#0d1320] text-gray-300 border-t border-[#1a2234]">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="logo-text text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-[var(--color-gold)]">FC</span>
              <span className="ml-1 text-[var(--color-accent)]">Coins</span>
              <span className="ml-1 text-xs bg-[#1a2234] px-2 py-0.5 rounded">
                ULTIMATE
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              A maneira mais rápida e segura de comprar coins para EA FC.
              Entrega rápida, preços competitivos e suporte 24/7.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[var(--color-accent)] transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[var(--color-accent)] transition-colors" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[var(--color-accent)] transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[var(--color-accent)] transition-colors" aria-label="YouTube">
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')} className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                  Comprar Coins
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('cart')} className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                  Carrinho
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('profile')} className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                  Minha Conta
                </button>
              </li>
            </ul>
          </div>
          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              Ajuda
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                  Suporte
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                  Termos de Serviço
                </a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: suporte@fccoins.com</li>
              <li className="text-gray-400">WhatsApp: +55 (11) 99999-9999</li>
              <li className="text-gray-400">
                Horário: 24 horas, 7 dias por semana
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1a2234] mt-12 pt-8 text-sm text-gray-500 text-center">
          <p>
            © {new Date().getFullYear()} FC Coins. Todos os direitos
            reservados.
          </p>
          <p className="mt-2">
            FC Coins não é afiliada à EA Sports ou FIFA. EA FC é uma marca
            registrada de Electronic Arts Inc.
          </p>
        </div>
      </div>
    </footer>;
};