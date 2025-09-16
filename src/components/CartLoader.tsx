import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const CartLoader: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { loadCart, cartId } = useCart();

  useEffect(() => {
    if (isAuthenticated && user && !cartId) {
      console.log('Loading cart for user:', user.id);
      loadCart(user.id);
    }
  }, [isAuthenticated, user?.id, cartId]);

  return null; // Este componente não renderiza nada
};
