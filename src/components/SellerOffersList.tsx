import React, { useState } from 'react';
import { Button } from './Button';
import { 
  EyeIcon,
  EditIcon,
  TrashIcon,
  PauseIcon,
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  CoinsIcon,
  DollarSignIcon,
  MonitorIcon,
  Gamepad2Icon,
  SmartphoneIcon
} from 'lucide-react';

interface SellerOffer {
  id: number;
  plataformaId: number;
  plataformaNome: string;
  quantidadeCoins: number;
  precoPor100k: number;
  taxaPlataforma: number;
  precoFinal: number;
  status: 'ativo' | 'pausado' | 'vendido' | 'cancelado';
  dataCriacao: string;
  dataAtualizacao?: string;
  dataVenda?: string;
}

interface SellerOffersListProps {
  offers: SellerOffer[];
  onEdit: (offer: SellerOffer) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
  onView: (offer: SellerOffer) => void;
  isLoading?: boolean;
}

export const SellerOffersList: React.FC<SellerOffersListProps> = ({
  offers,
  onEdit,
  onDelete,
  onStatusChange,
  onView,
  isLoading = false
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');

  const getPlatformIcon = (platformName: string) => {
    switch (platformName.toLowerCase()) {
      case 'pc':
        return <MonitorIcon className="h-4 w-4" />;
      case 'playstation 5':
      case 'playstation 4':
        return <Gamepad2Icon className="h-4 w-4" />;
      case 'xbox series x':
      case 'xbox one':
        return <Gamepad2Icon className="h-4 w-4" />;
      default:
        return <SmartphoneIcon className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo':
        return <CheckCircleIcon className="h-4 w-4 text-green-400" />;
      case 'pausado':
        return <PauseIcon className="h-4 w-4 text-yellow-400" />;
      case 'vendido':
        return <CheckCircleIcon className="h-4 w-4 text-blue-400" />;
      case 'cancelado':
        return <AlertCircleIcon className="h-4 w-4 text-red-400" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pausado':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'vendido':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelado':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'pausado':
        return 'Pausado';
      case 'vendido':
        return 'Vendido';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const filteredOffers = selectedStatus === 'todos' 
    ? offers 
    : offers.filter(offer => offer.status === selectedStatus);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatCoins = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard-container glass-morphism p-6 rounded-2xl">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Suas Ofertas</h3>
          <div className="flex items-center space-x-4">
            {/* Filtro de Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-[#1a2234] border border-[#2a3441] rounded-lg text-white text-sm focus:border-[var(--color-accent)] focus:outline-none"
            >
              <option value="todos">Todos os Status</option>
              <option value="ativo">Ativo</option>
              <option value="pausado">Pausado</option>
              <option value="vendido">Vendido</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-4 rounded-xl border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Ativas</p>
                <p className="text-white text-2xl font-bold">
                  {offers.filter(o => o.status === 'ativo').length}
                </p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Vendidas</p>
                <p className="text-white text-2xl font-bold">
                  {offers.filter(o => o.status === 'vendido').length}
                </p>
              </div>
              <CoinsIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-4 rounded-xl border border-yellow-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">Pausadas</p>
                <p className="text-white text-2xl font-bold">
                  {offers.filter(o => o.status === 'pausado').length}
                </p>
              </div>
              <PauseIcon className="h-8 w-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-secondary)]/20 p-4 rounded-xl border border-[var(--color-accent)]/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-medium">Total</p>
                <p className="text-white text-2xl font-bold">{offers.length}</p>
              </div>
              <DollarSignIcon className="h-8 w-8 text-[var(--color-accent)]" />
            </div>
          </div>
        </div>

        {/* Offers List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent)]"></div>
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="text-center py-12">
              <CoinsIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Nenhuma oferta encontrada</p>
              <p className="text-gray-500 text-sm">Crie sua primeira oferta para começar a vender</p>
            </div>
          ) : (
            filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="transaction-item flex items-center justify-between p-4 bg-[#1a2234]/30 rounded-lg border border-[#2a3441]/50 hover:border-[var(--color-accent)]/30 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  {/* Platform Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                    {getPlatformIcon(offer.plataformaNome)}
                  </div>

                  {/* Offer Details */}
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-white font-medium">{offer.plataformaNome}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(offer.status)}`}>
                        {getStatusIcon(offer.status)}
                        <span className="ml-1">{getStatusText(offer.status)}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <CoinsIcon className="h-3 w-3" />
                        <span>{formatCoins(offer.quantidadeCoins)} coins</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <DollarSignIcon className="h-3 w-3" />
                        <span>R$ {offer.precoPor100k.toFixed(2)}/100k</span>
                      </span>
                      <span>Total: {formatCurrency(offer.precoFinal)}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-1">
                      Criado em {formatDate(offer.dataCriacao)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onView(offer)}
                    className="p-2 rounded-lg bg-[#1a2234]/50 hover:bg-[#1a2234] transition-colors"
                    title="Ver detalhes"
                  >
                    <EyeIcon className="h-4 w-4 text-gray-400 hover:text-white" />
                  </button>

                  {offer.status === 'ativo' && (
                    <>
                      <button
                        onClick={() => onEdit(offer)}
                        className="p-2 rounded-lg bg-[#1a2234]/50 hover:bg-[#1a2234] transition-colors"
                        title="Editar oferta"
                      >
                        <EditIcon className="h-4 w-4 text-gray-400 hover:text-white" />
                      </button>
                      
                      <button
                        onClick={() => onStatusChange(offer.id, 'pausado')}
                        className="p-2 rounded-lg bg-[#1a2234]/50 hover:bg-[#1a2234] transition-colors"
                        title="Pausar oferta"
                      >
                        <PauseIcon className="h-4 w-4 text-gray-400 hover:text-yellow-400" />
                      </button>
                    </>
                  )}

                  {offer.status === 'pausado' && (
                    <button
                      onClick={() => onStatusChange(offer.id, 'ativo')}
                      className="p-2 rounded-lg bg-[#1a2234]/50 hover:bg-[#1a2234] transition-colors"
                      title="Reativar oferta"
                    >
                      <PlayIcon className="h-4 w-4 text-gray-400 hover:text-green-400" />
                    </button>
                  )}

                  <button
                    onClick={() => onDelete(offer.id)}
                    className="p-2 rounded-lg bg-[#1a2234]/50 hover:bg-[#1a2234] transition-colors"
                    title="Deletar oferta"
                  >
                    <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
