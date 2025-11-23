'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/custom/navbar';
import { getOrderDetails } from '@/lib/cart';
import { CheckCircle, Package, Truck, CreditCard, Sparkles, ArrowRight } from 'lucide-react';

export default function OrderConfirmedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const orderData = await getOrderDetails(orderId!);
      setOrder(orderData);
    } catch (error) {
      console.error('Erro ao carregar pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pedido não encontrado
          </h2>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pedido Confirmado!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Obrigado pela sua compra
          </p>
          <p className="text-gray-500">
            Número do pedido: <span className="font-mono font-semibold">{order.id.slice(0, 8).toUpperCase()}</span>
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Resumo do Pedido
          </h2>

          {/* Items */}
          <div className="space-y-4 mb-6">
            {order.order_items.map((item: any) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                <img
                  src={item.products.image_url}
                  alt={item.products.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.products.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quantidade: {item.quantity}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-bold text-gray-900">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <span className="text-sm text-green-600 font-semibold">
                      +R$ {(item.cashback * item.quantity).toFixed(2)} cashback
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>Total do Pedido</span>
              <span className="font-semibold">R$ {order.total_amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600 bg-green-50 p-3 rounded-xl">
              <span className="font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Cashback Ganho
              </span>
              <span className="font-bold">R$ {order.cashback_earned.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Próximos Passos
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Pagamento Processado
                </h3>
                <p className="text-gray-600 text-sm">
                  Seu pagamento foi confirmado com sucesso
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Preparando Envio
                </h3>
                <p className="text-gray-600 text-sm">
                  Estamos separando seus produtos para envio
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Rastreamento
                </h3>
                <p className="text-gray-600 text-sm">
                  Você receberá o código de rastreamento por e-mail
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/meus-pedidos')}
            className="flex-1 py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
          >
            Ver Meus Pedidos
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continuar Comprando
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
