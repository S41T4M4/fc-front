// Tipos para a API do backend
export interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
  dataRegistro: string;
}

export interface Platform {
  idPlataforma: number;
  descricaoPlataforma: string;
}

export interface Coin {
  idMoeda: number;
  plataformaId: number;
  quantidade: number;
  valor: number;
  plataformaNome: string;
}

export interface CartItem {
  idItem: number;
  idCarrinho: number;
  idMoeda: number;
  quantidade: number;
  moeda: {
    idMoeda: number;
    quantidade: number;
    valor: number;
    plataforma: string;
  };
}

export interface Cart {
  success: boolean;
  idCarrinho: number;
  idUser: number;
  createTime: string;
  usuario: User;
  itens: CartItem[];
  message: string;
}

export interface Order {
  idPedido: number;
  idUser: number;
  dataPedido: string;
  total: number;
  status: string;
}

export interface Payment {
  idPagamento: number;
  idPedido: number;
  dataPag: string;
  valorPago: number;
  metodo: string;
  status: string;
  transactionId: number;
}

// Request/Response types
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
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  role: string;
  userId: number;
  email: string;
  nome: string;
}

export interface CreateCartRequest {
  idUser: number;
}

export interface AddItemRequest {
  idCarrinho: number;
  idMoeda: number;
  quantidade: number;
}

export interface CheckoutRequest {
  idCarrinho: number;
  email: string;
  metodoPagamento: string;
  transactionId?: number;
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  pedido: Order;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}
