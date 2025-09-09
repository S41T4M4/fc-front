import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { UserIcon, PackageIcon, SettingsIcon, KeyIcon, LogOutIcon } from 'lucide-react';
export const Profile: React.FC = () => {
  const {
    user,
    logout,
    updateUser,
    isAuthenticated
  } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.nome || '',
    email: user?.email || '',
    platform: user?.platform || null
  });
  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  // Mock orders data
  const orders = [{
    id: 'FC123456',
    date: '15/06/2023',
    total: 129.9,
    status: 'Entregue',
    items: [{
      name: 'Pacote Padrão',
      amount: '300.000',
      platform: 'console'
    }]
  }, {
    id: 'FC123123',
    date: '02/05/2023',
    total: 49.9,
    status: 'Entregue',
    items: [{
      name: 'Pacote Inicial',
      amount: '100.000',
      platform: 'console'
    }]
  }];
  // Form handlers
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        nome: profileForm.name,
        platform: profileForm.platform as 'console' | 'pc' | null
      });
      // Show success message (would be implemented with a toast in a real app)
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar perfil. Tente novamente.');
    }
  };
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('As senhas não conferem');
      return;
    }
    // Would call API to update password in a real app
    // Reset form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    // Show success message
    alert('Senha atualizada com sucesso!');
  };
  if (!isAuthenticated) {
    return <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Acesso Restrito
          </h1>
          <p className="text-gray-400 mb-8">
            Você precisa estar logado para acessar esta página.
          </p>
        </div>
      </div>;
  }
  return <div className="w-full bg-[#0a0e17] bg-game-pattern min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Meu Perfil</h1>
        <p className="text-gray-400 mb-12">
          Gerencie suas informações e acompanhe seus pedidos
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="gamer-card rounded-lg p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-[#1a2234] border border-[var(--color-accent)] rounded-full p-4 mb-4">
                  <UserIcon className="h-12 w-12 text-[var(--color-accent)]" />
                </div>
                <h2 className="text-xl font-semibold text-white">{user?.nome}</h2>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
              <nav className="space-y-1">
                <button onClick={() => setActiveTab('profile')} className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${activeTab === 'profile' ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-gray-300 hover:bg-[#1a2234]'}`}>
                  <UserIcon className="h-5 w-5 mr-3" />
                  Dados Pessoais
                </button>
                <button onClick={() => setActiveTab('orders')} className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${activeTab === 'orders' ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-gray-300 hover:bg-[#1a2234]'}`}>
                  <PackageIcon className="h-5 w-5 mr-3" />
                  Pedidos
                </button>
                <button onClick={() => setActiveTab('settings')} className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${activeTab === 'settings' ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-gray-300 hover:bg-[#1a2234]'}`}>
                  <SettingsIcon className="h-5 w-5 mr-3" />
                  Preferências
                </button>
                <button onClick={() => setActiveTab('password')} className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${activeTab === 'password' ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-gray-300 hover:bg-[#1a2234]'}`}>
                  <KeyIcon className="h-5 w-5 mr-3" />
                  Alterar Senha
                </button>
                <button onClick={logout} className="flex items-center w-full px-4 py-2 rounded-md text-red-400 hover:bg-red-900/30 transition-colors">
                  <LogOutIcon className="h-5 w-5 mr-3" />
                  Sair
                </button>
              </nav>
            </div>
          </div>
          {/* Main content */}
          <div className="md:w-3/4">
            <div className="gamer-card rounded-lg p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && <div>
                  <h2 className="text-xl font-semibold mb-6 text-white">Dados Pessoais</h2>
                  <form onSubmit={handleProfileSubmit}>
                    <Input label="Nome" value={profileForm.name} onChange={e => setProfileForm({
                  ...profileForm,
                  name: e.target.value
                })} required />
                    <Input label="Email" type="email" value={profileForm.email} onChange={e => setProfileForm({
                  ...profileForm,
                  email: e.target.value
                })} disabled />
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Plataforma Padrão
                      </label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center">
                          <input type="radio" name="platform" value="console" checked={profileForm.platform === 'console'} onChange={() => setProfileForm({
                        ...profileForm,
                        platform: 'console'
                      })} className="h-4 w-4 text-[var(--color-accent)] border-gray-600 bg-[#1a2234] focus:ring-[var(--color-accent)]" />
                          <span className="ml-2 text-gray-300">
                            PlayStation / Xbox
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="platform" value="pc" checked={profileForm.platform === 'pc'} onChange={() => setProfileForm({
                        ...profileForm,
                        platform: 'pc'
                      })} className="h-4 w-4 text-[var(--color-accent)] border-gray-600 bg-[#1a2234] focus:ring-[var(--color-accent)]" />
                          <span className="ml-2 text-gray-300">
                            PC (Origin / Steam)
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="platform" value="" checked={profileForm.platform === null} onChange={() => setProfileForm({
                        ...profileForm,
                        platform: null
                      })} className="h-4 w-4 text-[var(--color-accent)] border-gray-600 bg-[#1a2234] focus:ring-[var(--color-accent)]" />
                          <span className="ml-2 text-gray-300">
                            Não definir padrão
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit">Salvar Alterações</Button>
                    </div>
                  </form>
                </div>}
              {/* Orders Tab */}
              {activeTab === 'orders' && <div>
                  <h2 className="text-xl font-semibold mb-6 text-white">Meus Pedidos</h2>
                  {orders.length === 0 ? <p className="text-gray-400">
                      Você ainda não fez nenhum pedido.
                    </p> : <div className="space-y-4">
                      {orders.map(order => <div key={order.id} className="border border-gray-600 rounded-lg overflow-hidden">
                          <div className="bg-[#1a2234] p-4 flex justify-between items-center">
                            <div>
                              <div className="font-medium text-white">
                                Pedido #{order.id}
                              </div>
                              <div className="text-sm text-gray-400">
                                {order.date}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-white">
                                R$ {order.total.toFixed(2).replace('.', ',')}
                              </div>
                              <div className="text-sm text-green-400">
                                {order.status}
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-[#0a0e17]">
                            <h3 className="font-medium mb-2 text-white">Itens</h3>
                            {order.items.map((item, idx) => <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-300">
                                  {item.name} ({item.amount} coins)
                                </span>
                                <span className="text-gray-400">
                                  {item.platform === 'console' ? 'Console' : 'PC'}
                                </span>
                              </div>)}
                          </div>
                        </div>)}
                    </div>}
                </div>}
              {/* Settings Tab */}
              {activeTab === 'settings' && <div>
                  <h2 className="text-xl font-semibold mb-6 text-white">Preferências</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2 text-white">Notificações</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-[var(--color-accent)] border-gray-600 bg-[#1a2234] rounded focus:ring-[var(--color-accent)]" defaultChecked />
                          <span className="ml-2 text-gray-300">
                            Receber emails sobre o status dos pedidos
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-[var(--color-accent)] border-gray-600 bg-[#1a2234] rounded focus:ring-[var(--color-accent)]" defaultChecked />
                          <span className="ml-2 text-gray-300">
                            Receber emails sobre promoções e novidades
                          </span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-white">Privacidade</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-[var(--color-accent)] border-gray-600 bg-[#1a2234] rounded focus:ring-[var(--color-accent)]" defaultChecked />
                          <span className="ml-2 text-gray-300">
                            Salvar histórico de pedidos
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button>Salvar Preferências</Button>
                    </div>
                  </div>
                </div>}
              {/* Password Tab */}
              {activeTab === 'password' && <div>
                  <h2 className="text-xl font-semibold mb-6 text-white">Alterar Senha</h2>
                  <form onSubmit={handlePasswordSubmit}>
                    <Input label="Senha Atual" type="password" value={passwordForm.currentPassword} onChange={e => setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value
                })} required />
                    <Input label="Nova Senha" type="password" value={passwordForm.newPassword} onChange={e => setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value
                })} required />
                    <Input label="Confirmar Nova Senha" type="password" value={passwordForm.confirmPassword} onChange={e => setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value
                })} required />
                    <div className="mt-6">
                      <Button type="submit">Atualizar Senha</Button>
                    </div>
                  </form>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};