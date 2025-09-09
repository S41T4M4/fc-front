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

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen && !(event.target as Element).closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);
  const navLinks = [{
    name: 'Home',
    page: 'home'
  }, {
    name: 'Comprar Coins',
    page: 'shop',
    authRequired: true
  }, {
    name: 'Meu Perfil',
    page: 'profile',
    authRequired: true
  }];
  return <header className={`fixed w-full z-[10000] transition-all duration-300 backdrop-blur-md ${scrolled ? 'bg-[#0a0e17]/90 shadow-[0_5px_15px_rgba(0,0,0,0.3)]' : 'bg-transparent'}`}>
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
            return <button 
              key={link.page} 
              onClick={() => {
                if (link.authRequired && !isAuthenticated) {
                  openAuthModal('login');
                } else {
                  setCurrentPage(link.page);
                }
              }} 
              className={`text-sm uppercase tracking-wider font-medium transition-colors hover:text-[var(--color-accent)] ${currentPage === link.page ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]' : 'text-gray-300'}`}
            >
              {link.name}
            </button>;
          })}
          </nav>
          {/* User and Cart Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  openAuthModal('login');
                } else {
                  setCurrentPage('cart');
                }
              }} 
              className="relative p-2 rounded-full hover:bg-[#1a2234] transition-colors glow-effect" 
              aria-label="Carrinho"
            >
              <ShoppingCartIcon className="h-5 w-5 text-gray-300" />
              {itemCount > 0 && isAuthenticated && (
                <span className="absolute top-0 right-0 bg-[var(--color-accent)] text-[#0a0e17] text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg border border-[#0a0e17]">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
            {/* User Menu */}
            <div className="relative user-menu-container z-[10001]">
              <button onClick={() => {
              if (isAuthenticated) {
                setUserMenuOpen(!userMenuOpen);
              } else {
                openAuthModal('login');
              }
            }} className="p-1 rounded-full hover:bg-[#1a2234] transition-colors glow-effect" aria-label={isAuthenticated ? 'Menu do usuário' : 'Entrar'}>
                {isAuthenticated ? (
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-gold)] rounded-full flex items-center justify-center border-2 border-[#1a2234] shadow-lg">
                    <span className="text-[#0a0e17] font-bold text-sm">
                      {user?.nome?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                ) : (
                  <UserIcon className="h-5 w-5 text-gray-300" />
                )}
              </button>
              {/* User Dropdown Menu */}
              {userMenuOpen && isAuthenticated && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#151c2d] rounded-lg shadow-xl py-2 z-[99999] border border-[#2a3446] backdrop-blur-sm">
                  <div className="px-4 py-3 border-b border-[#2a3446]">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-gold)] rounded-full flex items-center justify-center border-2 border-[#2a3446] shadow-lg">
                        <span className="text-[#0a0e17] font-bold text-lg">
                          {user?.nome?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-100">
                          {user?.nome}
                        </p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => {
                    setCurrentPage('profile');
                    setUserMenuOpen(false);
                  }} className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#1a2234] hover:text-[var(--color-accent)] transition-colors">
                    <UserIcon className="h-4 w-4 mr-3" />
                    Meu Perfil
                  </button>
                  <button onClick={() => {
                    setCurrentPage('home');
                    logout();
                    setUserMenuOpen(false);
                  }} className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#1a2234] hover:text-red-400 transition-colors">
                    <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sair
                  </button>
                </div>
              )}
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
          return <button 
            key={link.page} 
            onClick={() => {
              if (link.authRequired && !isAuthenticated) {
                openAuthModal('login');
                setMobileMenuOpen(false);
              } else {
                setCurrentPage(link.page);
                setMobileMenuOpen(false);
              }
            }} 
            className={`block w-full text-left py-3 px-4 text-sm font-medium uppercase tracking-wider ${currentPage === link.page ? 'text-[var(--color-accent)] bg-[#1a2234]' : 'text-gray-300'}`}
          >
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