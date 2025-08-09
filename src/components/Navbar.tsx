import React, { useEffect, useState } from 'react';
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
type NavbarProps = {
  setCurrentPage: (page: string) => void;
  openAuthModal: (view?: string) => void;
  currentPage: string;
};
export const Navbar: React.FC<NavbarProps> = ({
  setCurrentPage,
  openAuthModal,
  currentPage
}) => {
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();
  const {
    itemCount
  } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    name: 'Home',
    page: 'home'
  }, {
    name: 'Comprar Coins',
    page: 'shop'
  }, {
    name: 'Meu Perfil',
    page: 'profile',
    authRequired: true
  }];
  return <header className={`fixed w-full z-10 transition-all duration-300 backdrop-blur-md ${scrolled ? 'bg-[#0a0e17]/90 shadow-[0_5px_15px_rgba(0,0,0,0.3)]' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="logo-text text-xl font-bold cursor-pointer flex items-center" onClick={() => setCurrentPage('home')}>
            <span className="text-[var(--color-gold)]">FC</span>
            <span className="ml-1 text-[var(--color-accent)]">Coins</span>
            <span className="ml-1 text-xs bg-[#1a2234] px-2 py-0.5 rounded">
              ULTIMATE
            </span>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => {
            if (link.authRequired && !isAuthenticated) return null;
            return <button key={link.page} onClick={() => setCurrentPage(link.page)} className={`text-sm uppercase tracking-wider font-medium transition-colors hover:text-[var(--color-accent)] ${currentPage === link.page ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]' : 'text-gray-300'}`}>
                  {link.name}
                </button>;
          })}
          </nav>
          {/* User and Cart Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button onClick={() => setCurrentPage('cart')} className="relative p-2 rounded-full hover:bg-[#1a2234] transition-colors glow-effect" aria-label="Carrinho">
              <ShoppingCartIcon className="h-5 w-5 text-gray-300" />
              {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-[#0a0e17] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>}
            </button>
            {/* User Menu */}
            <div className="relative">
              <button onClick={() => {
              if (isAuthenticated) {
                setUserMenuOpen(!userMenuOpen);
              } else {
                openAuthModal('login');
              }
            }} className="p-2 rounded-full hover:bg-[#1a2234] transition-colors glow-effect" aria-label={isAuthenticated ? 'Menu do usuário' : 'Entrar'}>
                <UserIcon className="h-5 w-5 text-gray-300" />
              </button>
              {/* User Dropdown Menu */}
              {userMenuOpen && isAuthenticated && <div className="absolute right-0 mt-2 w-48 bg-[#151c2d] rounded-md shadow-lg py-1 z-20 border border-[#2a3446]">
                  <div className="px-4 py-2 border-b border-[#2a3446]">
                    <p className="text-sm font-medium text-gray-100">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                  <button onClick={() => {
                setCurrentPage('profile');
                setUserMenuOpen(false);
              }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#1a2234] hover:text-[var(--color-accent)]">
                    Meu Perfil
                  </button>
                  <button onClick={() => {
                setCurrentPage('home');
                logout();
                setUserMenuOpen(false);
              }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#1a2234] hover:text-[var(--color-accent)]">
                    Sair
                  </button>
                </div>}
            </div>
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-full hover:bg-[#1a2234] transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}>
              {mobileMenuOpen ? <XIcon className="h-5 w-5 text-gray-300" /> : <MenuIcon className="h-5 w-5 text-gray-300" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && <div className="md:hidden mt-2 pb-4 bg-[#151c2d] rounded-md border border-[#2a3446]">
            {navLinks.map(link => {
          if (link.authRequired && !isAuthenticated) return null;
          return <button key={link.page} onClick={() => {
            setCurrentPage(link.page);
            setMobileMenuOpen(false);
          }} className={`block w-full text-left py-3 px-4 text-sm font-medium uppercase tracking-wider ${currentPage === link.page ? 'text-[var(--color-accent)] bg-[#1a2234]' : 'text-gray-300'}`}>
                  {link.name}
                </button>;
        })}
            {!isAuthenticated && <button onClick={() => {
          openAuthModal('login');
          setMobileMenuOpen(false);
        }} className="block w-full text-left py-3 px-4 text-sm font-medium uppercase tracking-wider text-[var(--color-accent)]">
                Entrar / Cadastrar
              </button>}
          </div>}
      </div>
    </header>;
};