import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { 
  MonitorIcon, 
  Gamepad2Icon, 
  SmartphoneIcon, 
  CalculatorIcon,
  InfoIcon,
  CoinsIcon,
  DollarSignIcon,
  PercentIcon
} from 'lucide-react';

interface Platform {
  id: number;
  nome: string;
  taxaPor100k: number;
  ativa: boolean;
}

interface CalculoPreco {
  quantidadeCoins: number;
  precoPor100k: number;
  taxaPlataforma: number;
  totalTaxa: number;
  precoFinal: number;
  lucroVendedor: number;
}

interface SellerOfferFormProps {
  onSubmit: (data: {
    plataformaId: number;
    quantidadeCoins: number;
    precoPor100k: number;
  }) => void;
  onCancel: () => void;
  initialData?: {
    plataformaId?: number;
    quantidadeCoins?: number;
    precoPor100k?: number;
  };
  isLoading?: boolean;
}

export const SellerOfferForm: React.FC<SellerOfferFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [quantidadeCoins, setQuantidadeCoins] = useState(100000);
  const [precoPor100k, setPrecoPor100k] = useState(10.00);
  const [calculoPreco, setCalculoPreco] = useState<CalculoPreco | null>(null);

  // Simular plataformas disponíveis
  const plataformas: Platform[] = [
    { id: 1, nome: 'PC', taxaPor100k: 2.50, ativa: true },
    { id: 2, nome: 'PlayStation 5', taxaPor100k: 3.00, ativa: true },
    { id: 3, nome: 'Xbox Series X', taxaPor100k: 3.00, ativa: true },
    { id: 4, nome: 'PlayStation 4', taxaPor100k: 2.75, ativa: true },
    { id: 5, nome: 'Xbox One', taxaPor100k: 2.75, ativa: true },
  ];

  const getPlatformIcon = (platformName: string) => {
    switch (platformName.toLowerCase()) {
      case 'pc':
        return <MonitorIcon className="h-5 w-5" />;
      case 'playstation 5':
      case 'playstation 4':
        return <Gamepad2Icon className="h-5 w-5" />;
      case 'xbox series x':
      case 'xbox one':
        return <Gamepad2Icon className="h-5 w-5" />;
      default:
        return <SmartphoneIcon className="h-5 w-5" />;
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlatform || !calculoPreco) return;

    onSubmit({
      plataformaId: selectedPlatform.id,
      quantidadeCoins,
      precoPor100k
    });
  };

  // Inicializar dados quando initialData mudar
  useEffect(() => {
    if (initialData) {
      setQuantidadeCoins(initialData.quantidadeCoins || 100000);
      setPrecoPor100k(initialData.precoPor100k || 10.00);
      
      if (initialData.plataformaId) {
        const plataforma = plataformas.find(p => p.id === initialData.plataformaId);
        if (plataforma) {
          setSelectedPlatform(plataforma);
        }
      }
    }
  }, [initialData]);

  // Calcular preço automaticamente quando valores mudam
  useEffect(() => {
    if (selectedPlatform && quantidadeCoins > 0 && precoPor100k > 0) {
      const totalTaxa = (quantidadeCoins * selectedPlatform.taxaPor100k) / 100000;
      const precoBase = (quantidadeCoins * precoPor100k) / 100000;
      const precoFinal = precoBase + totalTaxa;
      const lucroVendedor = precoFinal - totalTaxa;

      setCalculoPreco({
        quantidadeCoins,
        precoPor100k,
        taxaPlataforma: selectedPlatform.taxaPor100k,
        totalTaxa,
        precoFinal,
        lucroVendedor
      });
    }
  }, [selectedPlatform, quantidadeCoins, precoPor100k]);

  return (
    <div className="dashboard-container glass-morphism p-6 rounded-2xl">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">
            {initialData ? 'Editar Oferta' : 'Nova Oferta'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção de Plataforma */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Selecione a Plataforma
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {plataformas.map((plataforma) => (
                <button
                  key={plataforma.id}
                  type="button"
                  onClick={() => setSelectedPlatform(plataforma)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedPlatform?.id === plataforma.id
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                      : 'border-[#2a3441] hover:border-[var(--color-accent)]/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedPlatform?.id === plataforma.id
                        ? 'bg-[var(--color-accent)] text-[#0a0e17]'
                        : 'bg-[#1a2234] text-gray-400'
                    }`}>
                      {getPlatformIcon(plataforma.nome)}
                    </div>
                    <div className="text-left">
                      <p className={`font-medium ${
                        selectedPlatform?.id === plataforma.id ? 'text-white' : 'text-gray-300'
                      }`}>
                        {plataforma.nome}
                      </p>
                      <p className={`text-sm ${
                        selectedPlatform?.id === plataforma.id ? 'text-[var(--color-accent)]' : 'text-gray-400'
                      }`}>
                        Taxa: R$ {plataforma.taxaPor100k.toFixed(2)} por 100k
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade de Coins */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Quantidade de Coins
            </label>
            <div className="relative">
              <input
                type="number"
                value={quantidadeCoins}
                onChange={(e) => setQuantidadeCoins(Number(e.target.value))}
                min="1000"
                step="1000"
                className="w-full px-4 py-3 bg-[#1a2234] border border-[#2a3441] rounded-lg text-white placeholder-gray-400 focus:border-[var(--color-accent)] focus:outline-none"
                placeholder="Ex: 500000"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <CoinsIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Mínimo: 1.000 coins | Recomendado: múltiplos de 100.000
            </p>
          </div>

          {/* Preço por 100k */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Preço por 100.000 Coins (R$)
            </label>
            <div className="relative">
              <input
                type="number"
                value={precoPor100k}
                onChange={(e) => setPrecoPor100k(Number(e.target.value))}
                min="0.01"
                step="0.01"
                className="w-full px-4 py-3 bg-[#1a2234] border border-[#2a3441] rounded-lg text-white placeholder-gray-400 focus:border-[var(--color-accent)] focus:outline-none"
                placeholder="Ex: 15.00"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <DollarSignIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Cálculo do Preço */}
          {calculoPreco && (
            <div className="bg-gradient-to-r from-[#1a2234]/60 to-[#1a2234]/40 p-4 rounded-xl border border-[#2a3441]">
              <div className="flex items-center space-x-2 mb-4">
                <CalculatorIcon className="h-5 w-5 text-[var(--color-accent)]" />
                <h4 className="text-white font-semibold">Cálculo do Preço</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Preço Base:</span>
                    <span className="text-white font-medium">
                      R$ {((quantidadeCoins * precoPor100k) / 100000).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Taxa da Plataforma:</span>
                    <span className="text-yellow-400 font-medium">
                      R$ {calculoPreco.totalTaxa.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Preço Final:</span>
                    <span className="text-[var(--color-accent)] font-bold text-lg">
                      R$ {calculoPreco.precoFinal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Seu Lucro:</span>
                    <span className="text-green-400 font-medium">
                      R$ {calculoPreco.lucroVendedor.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info sobre taxas */}
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <InfoIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-300">
                    <p className="font-medium mb-1">Como funciona:</p>
                    <p>O preço final inclui a taxa da plataforma. Você recebe o valor menos a taxa.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={!selectedPlatform || !calculoPreco || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Criando...' : initialData ? 'Atualizar Oferta' : 'Criar Oferta'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
