import React, { useState } from 'react';
import { XIcon, UserIcon, MailIcon, LockIcon } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  view: string;
  setView: (view: string) => void;
};
export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  view,
  setView
}) => {
  const {
    login,
    register
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    remember: false
  });
  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Reset Password form
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  if (!isOpen) return null;
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    // Simple validation
    if (!loginForm.email) newErrors.email = 'Email é obrigatório';
    if (!loginForm.password) newErrors.password = 'Senha é obrigatória';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      await login(loginForm.email, loginForm.password, loginForm.remember);
      onClose();
    } catch (error) {
      setErrors({
        form: 'Credenciais inválidas. Por favor, tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    // Simple validation
    if (!registerForm.name) newErrors.name = 'Nome é obrigatório';
    if (!registerForm.email) newErrors.email = 'Email é obrigatório';
    if (!registerForm.password) newErrors.password = 'Senha é obrigatória';
    if (registerForm.password.length < 8) newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      await register(registerForm.name, registerForm.email, registerForm.password);
      onClose();
    } catch (error) {
      setErrors({
        form: 'Erro ao criar conta. Por favor, tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!resetEmail) newErrors.resetEmail = 'Email é obrigatório';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setResetSent(true);
    } catch (error) {
      setErrors({
        resetEmail: 'Erro ao enviar email. Por favor, tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity" onClick={onClose} />
        {/* Modal content */}
        <div className="relative gamer-card rounded-lg shadow-xl max-w-md w-full p-6 overflow-hidden transform transition-all">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[var(--color-accent)]/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[var(--color-secondary)]/10 to-transparent rounded-full blur-xl"></div>
          {/* Close button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Fechar">
            <XIcon className="h-5 w-5" />
          </button>
          {/* Login View */}
          {view === 'login' && <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[#1a2234] p-3 rounded-full">
                  <UserIcon className="h-8 w-8 text-[var(--color-accent)]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-6 text-white">
                Entrar
              </h2>
              {errors.form && <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-md">
                  {errors.form}
                </div>}
              <form onSubmit={handleLoginSubmit}>
                <div className="relative mb-4">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input type="email" value={loginForm.email} onChange={e => setLoginForm({
                ...loginForm,
                email: e.target.value
              })} placeholder="Seu email" required error={errors.email} autoComplete="email" className="pl-10" />
                </div>
                <div className="relative mb-4">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input type="password" value={loginForm.password} onChange={e => setLoginForm({
                ...loginForm,
                password: e.target.value
              })} placeholder="Sua senha" required error={errors.password} autoComplete="current-password" className="pl-10" />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input id="remember" type="checkbox" className="h-4 w-4 text-[var(--color-accent)] border-gray-700 rounded bg-[#1a2234] focus:ring-[var(--color-accent)]" checked={loginForm.remember} onChange={e => setLoginForm({
                  ...loginForm,
                  remember: e.target.checked
                })} />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                      Lembrar senha
                    </label>
                  </div>
                  <button type="button" className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors" onClick={() => setView('reset')}>
                    Esqueceu a senha?
                  </button>
                </div>
                <Button type="submit" fullWidth isLoading={isLoading}>
                  Entrar
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Não tem uma conta?{' '}
                  <button type="button" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors" onClick={() => setView('register')}>
                    Cadastre-se
                  </button>
                </p>
              </div>
            </div>}
          {/* Register View */}
          {view === 'register' && <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[#1a2234] p-3 rounded-full">
                  <UserIcon className="h-8 w-8 text-[var(--color-accent)]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-6 text-white">
                Criar Conta
              </h2>
              {errors.form && <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-md">
                  {errors.form}
                </div>}
              <form onSubmit={handleRegisterSubmit}>
                <div className="relative mb-4">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input type="text" value={registerForm.name} onChange={e => setRegisterForm({
                ...registerForm,
                name: e.target.value
              })} placeholder="Seu nome" required error={errors.name} className="pl-10" />
                </div>
                <div className="relative mb-4">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input type="email" value={registerForm.email} onChange={e => setRegisterForm({
                ...registerForm,
                email: e.target.value
              })} placeholder="Seu email" required error={errors.email} autoComplete="email" className="pl-10" />
                </div>
                <div className="relative mb-4">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input type="password" value={registerForm.password} onChange={e => setRegisterForm({
                ...registerForm,
                password: e.target.value
              })} placeholder="Crie uma senha" required error={errors.password} className="pl-10" />
                </div>
                <div className="relative mb-6">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input type="password" value={registerForm.confirmPassword} onChange={e => setRegisterForm({
                ...registerForm,
                confirmPassword: e.target.value
              })} placeholder="Confirme sua senha" required error={errors.confirmPassword} className="pl-10" />
                </div>
                <div className="mt-6">
                  <Button type="submit" fullWidth isLoading={isLoading}>
                    Criar Conta
                  </Button>
                </div>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Já tem uma conta?{' '}
                  <button type="button" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors" onClick={() => setView('login')}>
                    Entrar
                  </button>
                </p>
              </div>
            </div>}
          {/* Reset Password View */}
          {view === 'reset' && <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[#1a2234] p-3 rounded-full">
                  <LockIcon className="h-8 w-8 text-[var(--color-accent)]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-6 text-white">
                Recuperar Senha
              </h2>
              {!resetSent ? <form onSubmit={handleResetSubmit}>
                  <p className="text-sm text-gray-300 mb-6">
                    Digite seu email para receber um link de recuperação de
                    senha.
                  </p>
                  <div className="relative mb-6">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="Seu email" required error={errors.resetEmail} className="pl-10" />
                  </div>
                  <div className="mt-6">
                    <Button type="submit" fullWidth isLoading={isLoading}>
                      Enviar Link de Recuperação
                    </Button>
                  </div>
                </form> : <div>
                  <div className="mb-6 p-4 bg-[#0d3320] border border-[var(--color-accent)] text-[var(--color-accent)] rounded-md">
                    <p>
                      Email enviado com sucesso! Verifique sua caixa de entrada.
                    </p>
                  </div>
                  <Button onClick={() => setView('login')} fullWidth>
                    Voltar para Login
                  </Button>
                </div>}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Lembrou sua senha?{' '}
                  <button type="button" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors" onClick={() => setView('login')}>
                    Voltar para Login
                  </button>
                </p>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};