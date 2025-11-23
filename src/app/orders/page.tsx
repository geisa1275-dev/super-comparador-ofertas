'use client';

import { Navbar } from '@/components/custom/navbar';
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function OrdersPage() {
  const [orders] = useState([
    {
      id: 'PED-2024-001',
      date: '15/01/2024',
      status: 'delivered',
      total: 699.80,
      items: [
        { name: 'Tênis Nike Air Max 270', quantity: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
        { name: 'Fone JBL Tune 510BT', quantity: 2, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
      ],
    },
    {
      id: 'PED-2024-002',
      date: '18/01/2024',
      status: 'shipped',
      total: 7499.00,
      items: [
        { name: 'iPhone 15 Pro Max 256GB', quantity: 1, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&h=100&fit=crop' },
      ],
    },
    {
      id: 'PED-2024-003',
      date: '20/01/2024',
      status: 'pending',
      total: 2199.00,
      items: [
        { name: 'Smart TV Samsung 55" 4K', quantity: 1, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100&h=100&fit=crop' },
      ],
    },
  ]);

  const statusConfig = {
    pending: { label: 'Aguardando Pagamento', icon: Clock, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    confirmed: { label: 'Confirmado', icon: CheckCircle, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    shipped: { label: 'Em Transporte', icon: Truck, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    delivered: { label: 'Entregue', icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
    cancelled: { label: 'Cancelado', icon: XCircle, color: 'text-red-600 bg-red-50 border-red-200' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
            <p className="text-gray-600">{orders.length} pedidos realizados</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-purple-50/30">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Pedido {order.id}</h3>
                      <p className="text-sm text-gray-600">Realizado em {order.date}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-semibold ${status.color}`}>
                      <StatusIcon className="w-5 h-5" />
                      {status.label}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total do Pedido</p>
                      <p className="text-2xl font-bold text-purple-600">R$ {order.total.toFixed(2)}</p>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center gap-2">
                      Ver Detalhes
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nenhum pedido ainda</h2>
            <p className="text-gray-600 mb-6">Comece a comprar para ver seus pedidos aqui!</p>
            <a href="/">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Explorar Produtos
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
