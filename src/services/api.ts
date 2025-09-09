// API Service para comunicação com o backend
const API_BASE_URL = 'http://localhost:5041/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: {
    token: string;
  };
  userId?: number;
  email?: string;
  nome?: string;
  role?: string;
  message?: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  userId?: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/Auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return this.request<RegisterResponse>('/Auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async validateToken(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/Auth/validate');
  }

  // Platform endpoints
  async getPlatforms(): Promise<any> {
    return this.request('/Plataforma');
  }

  async getPlatformById(id: number): Promise<any> {
    return this.request(`/Plataforma/${id}`);
  }

  // Coins endpoints
  async getCoins(): Promise<any> {
    return this.request('/Moeda');
  }

  async getCoinsByPlatform(platformId: number): Promise<any> {
    return this.request(`/Moeda/plataforma/${platformId}`);
  }

  // Cart endpoints
  async createCart(userId: number): Promise<any> {
    return this.request('/Carrinho/criar', {
      method: 'POST',
      body: JSON.stringify({ idUser: userId }),
    });
  }

  async getCart(cartId: number): Promise<any> {
    return this.request(`/Carrinho/${cartId}`);
  }

  async getCartByUser(userId: number): Promise<any> {
    return this.request(`/Carrinho/usuario/${userId}`);
  }

  async addItemToCart(cartId: number, coinId: number, quantity: number): Promise<any> {
    return this.request('/Carrinho/adicionar-item', {
      method: 'POST',
      body: JSON.stringify({
        idCarrinho: cartId,
        idMoeda: coinId,
        quantidade: quantity,
      }),
    });
  }

  async removeItemFromCart(itemId: number): Promise<any> {
    return this.request(`/Carrinho/remover-item/${itemId}`, {
      method: 'DELETE',
    });
  }

  // Checkout endpoints
  async finalizePurchase(data: {
    idCarrinho: number;
    email: string;
    metodoPagamento: string;
    transactionId?: number;
  }): Promise<any> {
    return this.request('/Checkout/finalizar-compra', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();
