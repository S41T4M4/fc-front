import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
import { SellerDashboard } from './pages/SellerDashboard';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CartLoader } from './components/CartLoader';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
// Internal component that has access to auth context
const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState('login');

  // Helper function to check if user is a seller
  const isSeller = () => {
    return user?.role === 'seller' || user?.role === 'admin';
  };

  // Helper function to check if user is a buyer
  const isBuyer = () => {
    return user?.role === 'buyer' || user?.role === 'user';
  };
  
  const openAuthModal = (view = 'login') => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        if (!isAuthenticated) {
          return <Landing openAuthModal={openAuthModal} />;
        }
        // Route based on user role
        if (isSeller()) {
          return <SellerDashboard setCurrentPage={setCurrentPage} />;
        } else {
          return <Home setCurrentPage={setCurrentPage} openAuthModal={openAuthModal} />;
        }
      case 'shop':
        return (
          <ProtectedRoute 
            fallback={
              <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Acesso à Loja Restrito
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Faça login para acessar nossa loja de coins e começar a comprar.
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-[#0a0e17] font-semibold py-3 px-6 rounded-lg hover:from-[var(--color-accent-hover)] hover:to-[#3399ff] transition-all duration-300"
                    >
                      Fazer Login
                    </button>
                    <button 
                      onClick={() => openAuthModal('register')}
                      className="w-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-semibold py-3 px-6 rounded-lg hover:bg-[var(--color-accent)] hover:text-[#0a0e17] transition-all duration-300"
                    >
                      Criar Conta
                    </button>
                  </div>
                </div>
              </div>
            }
          >
            <Shop setCurrentPage={setCurrentPage} />
          </ProtectedRoute>
        );
      case 'cart':
        return (
          <ProtectedRoute 
            fallback={
              <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Carrinho Vazio
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Faça login para acessar seu carrinho de compras.
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-[#0a0e17] font-semibold py-3 px-6 rounded-lg hover:from-[var(--color-accent-hover)] hover:to-[#3399ff] transition-all duration-300"
                    >
                      Fazer Login
                    </button>
                    <button 
                      onClick={() => setCurrentPage('home')}
                      className="w-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-semibold py-3 px-6 rounded-lg hover:bg-[var(--color-accent)] hover:text-[#0a0e17] transition-all duration-300"
                    >
                      Voltar ao Início
                    </button>
                  </div>
                </div>
              </div>
            }
          >
            <Cart setCurrentPage={setCurrentPage} />
          </ProtectedRoute>
        );
      case 'checkout':
        return (
          <ProtectedRoute 
            fallback={
              <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Finalizar Compra
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Faça login para finalizar sua compra de coins.
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-[#0a0e17] font-semibold py-3 px-6 rounded-lg hover:from-[var(--color-accent-hover)] hover:to-[#3399ff] transition-all duration-300"
                    >
                      Fazer Login
                    </button>
                    <button 
                      onClick={() => setCurrentPage('home')}
                      className="w-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-semibold py-3 px-6 rounded-lg hover:bg-[var(--color-accent)] hover:text-[#0a0e17] transition-all duration-300"
                    >
                      Voltar ao Início
                    </button>
                  </div>
                </div>
              </div>
            }
          >
            <Checkout setCurrentPage={setCurrentPage} />
          </ProtectedRoute>
        );
      case 'seller-dashboard':
        return (
          <ProtectedRoute 
            fallback={
              <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Painel do Vendedor
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Faça login como vendedor para acessar o painel de vendas.
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-[#0a0e17] font-semibold py-3 px-6 rounded-lg hover:from-[var(--color-accent-hover)] hover:to-[#3399ff] transition-all duration-300"
                    >
                      Fazer Login
                    </button>
                    <button 
                      onClick={() => openAuthModal('register')}
                      className="w-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-semibold py-3 px-6 rounded-lg hover:bg-[var(--color-accent)] hover:text-[#0a0e17] transition-all duration-300"
                    >
                      Criar Conta
                    </button>
                  </div>
                </div>
              </div>
            }
          >
            {isSeller() ? (
              <SellerDashboard setCurrentPage={setCurrentPage} />
            ) : (
              <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Acesso Restrito
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Você precisa ser um vendedor para acessar este painel.
                  </p>
                  <button 
                    onClick={() => setCurrentPage('home')}
                    className="w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-[#0a0e17] font-semibold py-3 px-6 rounded-lg hover:from-[var(--color-accent-hover)] hover:to-[#3399ff] transition-all duration-300"
                  >
                    Voltar ao Início
                  </button>
                </div>
              </div>
            )}
          </ProtectedRoute>
        );
      case 'profile':
        return (
          <ProtectedRoute 
            fallback={
              <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Meu Perfil
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Faça login para acessar seu perfil e histórico de compras.
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-[#0a0e17] font-semibold py-3 px-6 rounded-lg hover:from-[var(--color-accent-hover)] hover:to-[#3399ff] transition-all duration-300"
                    >
                      Fazer Login
                    </button>
                    <button 
                      onClick={() => openAuthModal('register')}
                      className="w-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-semibold py-3 px-6 rounded-lg hover:bg-[var(--color-accent)] hover:text-[#0a0e17] transition-all duration-300"
                    >
                      Criar Conta
                    </button>
                  </div>
                </div>
              </div>
            }
          >
            <Profile />
          </ProtectedRoute>
        );
      default:
        if (!isAuthenticated) {
          return <Landing openAuthModal={openAuthModal} />;
        }
        // Route based on user role
        if (isSeller()) {
          return <SellerDashboard setCurrentPage={setCurrentPage} />;
        } else {
          return <Home setCurrentPage={setCurrentPage} openAuthModal={openAuthModal} />;
        }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0e17]">
      <Navbar setCurrentPage={setCurrentPage} openAuthModal={openAuthModal} currentPage={currentPage} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} view={authModalView} setView={setAuthModalView} />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CartLoader />
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}