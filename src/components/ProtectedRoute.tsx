import React from 'react';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback,
  redirectTo = 'home'
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show fallback or redirect
  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Default fallback - redirect to home (which will show landing page)
    return (
      <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Acesso Restrito
          </h2>
          <p className="text-gray-400 mb-6">
            Esta página requer autenticação. Faça login ou crie uma conta para continuar.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} // This will trigger the auth modal
              className="w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-[#0a0e17] font-semibold py-3 px-6 rounded-lg hover:from-[var(--color-accent-hover)] hover:to-[#3399ff] transition-all duration-300"
            >
              Fazer Login
            </button>
            <button 
              onClick={() => window.location.reload()} // This will trigger the auth modal
              className="w-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-semibold py-3 px-6 rounded-lg hover:bg-[var(--color-accent)] hover:text-[#0a0e17] transition-all duration-300"
            >
              Criar Conta
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

