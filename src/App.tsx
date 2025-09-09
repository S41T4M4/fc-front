import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CartLoader } from './components/CartLoader';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState('login');
  const openAuthModal = (view = 'login') => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} openAuthModal={openAuthModal} />;
      case 'shop':
        return <Shop setCurrentPage={setCurrentPage} />;
      case 'cart':
        return <Cart setCurrentPage={setCurrentPage} />;
      case 'checkout':
        return <Checkout setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <Profile />;
      default:
        return <Home setCurrentPage={setCurrentPage} openAuthModal={openAuthModal} />;
    }
  };
  return <AuthProvider>
      <CartProvider>
        <CartLoader />
        <div className="flex flex-col min-h-screen bg-[#0a0e17]">
          <Navbar setCurrentPage={setCurrentPage} openAuthModal={openAuthModal} currentPage={currentPage} />
          <main className="flex-grow">{renderPage()}</main>
          <Footer setCurrentPage={setCurrentPage} />
          <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} view={authModalView} setView={setAuthModalView} />
        </div>
      </CartProvider>
    </AuthProvider>;
}