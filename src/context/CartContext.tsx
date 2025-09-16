import React, { useEffect, useState, createContext, useContext } from 'react';
import { apiService } from '../services/api';
import { CartItem as ApiCartItem, Cart as ApiCart } from '../types/api';
import { useAuth } from './AuthContext';

export type CartItem = {
  id: string;
  name: string;
  amount: string;
  price: number;
  platform: 'console' | 'pc';
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, userId?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  cartId: number | null;
  isLoading: boolean;
  error: string | null;
  loadCart: (userId: number) => Promise<void>;
  createCart: (userId: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedCartId = localStorage.getItem('cartId');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    if (savedCartId) {
      setCartId(parseInt(savedCartId));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    if (cartId) {
      localStorage.setItem('cartId', cartId.toString());
    }
  }, [items, cartId]);

  // Clear cart when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('CartContext: User logged out, clearing cart');
      setItems([]);
      setCartId(null);
      setError(null);
    }
  }, [isAuthenticated]);

  const loadCart = async (userId: number) => {
    // Evitar chamadas duplicadas
    if (isLoading) {
      console.log('CartContext: Already loading cart, skipping...');
      return;
    }
    
    console.log('CartContext: Loading cart for user:', userId);
    setIsLoading(true);
    setError(null);
    
    try {
      const cartData: ApiCart = await apiService.getCartByUser(userId);
      console.log('CartContext: Received cart data:', cartData);
      
      if (cartData.success && cartData.itens) {
        console.log('CartContext: Cart has items, setting cartId:', cartData.idCarrinho);
        setCartId(cartData.idCarrinho);
        
        // Convert API cart items to local format
        const convertedItems: CartItem[] = cartData.itens.map(item => ({
          id: item.idItem.toString(),
          name: `${item.moeda.quantidade.toLocaleString()} coins`,
          amount: item.moeda.quantidade.toString(),
          price: item.moeda.valor,
          platform: (item.moeda.plataforma || '').toLowerCase().includes('pc') ? 'pc' : 'console',
          quantity: item.quantidade
        }));
        
        console.log('CartContext: Converted items:', convertedItems);
        setItems(convertedItems);
      } else {
        console.log('CartContext: No cart found, creating new one');
        // Se não há carrinho, criar um novo
        await createCart(userId);
      }
    } catch (error) {
      console.error('CartContext: Error loading cart:', error);
      
      // Se o erro é 404 (carrinho não encontrado), criar um novo
      if (error instanceof Error && error.message.includes('404')) {
        console.log('CartContext: Cart not found (404), creating new one');
        try {
          await createCart(userId);
        } catch (createError) {
          console.error('CartContext: Error creating cart:', createError);
          setError(createError instanceof Error ? createError.message : 'Erro ao criar carrinho');
        }
      } else {
        setError(error instanceof Error ? error.message : 'Erro ao carregar carrinho');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createCart = async (userId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const cartData = await apiService.createCart(userId);
      
      if (cartData.success && cartData.idCarrinho) {
        setCartId(cartData.idCarrinho);
        setItems([]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao criar carrinho');
      console.error('Error creating cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (item: Omit<CartItem, 'quantity'>, userId?: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Se não há cartId, tentar criar um carrinho
      if (!cartId && userId) {
        console.log('CartContext: No cartId, creating cart for user:', userId);
        await createCart(userId);
      }
      
      if (!cartId) {
        setError('Carrinho não encontrado e não foi possível criar um novo');
        return;
      }

      // Parse the coin ID from the item ID
      const coinId = parseInt(item.id);
      
      await apiService.addItemToCart(cartId, coinId, 1);
      
      // Reload cart to get updated data
      const cartData: ApiCart = await apiService.getCart(cartId);
      
      if (cartData.success && cartData.itens) {
        const convertedItems: CartItem[] = cartData.itens.map(cartItem => ({
          id: cartItem.idItem.toString(),
          name: `${cartItem.moeda.quantidade.toLocaleString()} coins`,
          amount: cartItem.moeda.quantidade.toString(),
          price: cartItem.moeda.valor,
          platform: (cartItem.moeda.plataforma || '').toLowerCase().includes('pc') ? 'pc' : 'console',
          quantity: cartItem.quantidade
        }));
        
        setItems(convertedItems);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao adicionar item');
      console.error('Error adding item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const itemId = parseInt(id);
      await apiService.removeItemFromCart(itemId);
      
      // Reload cart to get updated data
      if (cartId) {
        const cartData: ApiCart = await apiService.getCart(cartId);
        
        if (cartData.success && cartData.itens) {
          const convertedItems: CartItem[] = cartData.itens.map(cartItem => ({
            id: cartItem.idItem.toString(),
            name: `${cartItem.moeda.quantidade.toLocaleString()} coins`,
            amount: cartItem.moeda.quantidade.toString(),
            price: cartItem.moeda.valor,
            platform: (cartItem.moeda.plataforma || '').toLowerCase().includes('pc') ? 'pc' : 'console',
            quantity: cartItem.quantidade
          }));
          
          setItems(convertedItems);
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao remover item');
      console.error('Error removing item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const itemId = parseInt(id);
      
      // Use the new update endpoint
      await apiService.updateItemQuantity(itemId, quantity);
      
      // Reload cart to get updated data
      if (cartId) {
        const cartData: ApiCart = await apiService.getCart(cartId);
        
        if (cartData.success && cartData.itens) {
          const convertedItems: CartItem[] = cartData.itens.map(cartItem => ({
            id: cartItem.idItem.toString(),
            name: `${cartItem.moeda.quantidade.toLocaleString()} coins`,
            amount: cartItem.moeda.quantidade.toString(),
            price: cartItem.moeda.valor,
            platform: (cartItem.moeda.plataforma || '').toLowerCase().includes('pc') ? 'pc' : 'console',
            quantity: cartItem.quantidade
          }));
          
          setItems(convertedItems);
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao atualizar quantidade');
      console.error('Error updating quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setItems([]);
    setCartId(null);
    localStorage.removeItem('cart');
    localStorage.removeItem('cartId');
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      total,
      cartId,
      isLoading,
      error,
      loadCart,
      createCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};