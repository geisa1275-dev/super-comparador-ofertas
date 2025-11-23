'use client';

import { Navbar } from '@/components/custom/navbar';
import { Store, Package, TrendingUp, DollarSign, Plus, BarChart3, Settings } from 'lucide-react';
import { useState } from 'react';

export default function SellerPage() {
  const [stats] = useState({
    totalSales: 15234.50,
    totalOrders: 87,
    activeProducts: 24,
    rating: 4.8,
  });

  const [products] = useState([
    {
      id: '1',
      name: 'Tênis Nike Air Max 270',
      price: 399.90,
      stock: 15,
      sales: 23,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      status: 'active',
    },
    {
      id: '2',
      name: 'Fone JBL Tune 510BT',
      price: 149.90,
      stock: 8,
      sales: 45,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      status: 'active',
    },
    {
      id: '3',
      name: 'Smart TV Samsung 55"',
      price: 2199.00,
      stock: 0,
      sales: 12,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100&h=100&fit=crop',
      status: 'out_of_stock',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Área do Vendedor</h1>
              <p className="text-gray-600">Gerencie seus produtos e vendas</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Adicionar Produto
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-semibold">+12.5%</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Vendas Totais</p>
            <p className="text-2xl font-bold text-gray-900">R$ {stats.totalSales.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-blue-600 font-semibold">+8.3%</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Pedidos</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Produtos Ativos</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Avaliação</p>
            <p className="text-2xl font-bold text-gray-900">{stats.rating} ⭐</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Meus Produtos</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Produto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Preço</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estoque</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Vendas</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="font-semibold text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      R$ {product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${product.stock === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.stock} un.
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{product.sales}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.status === 'active' ? 'Ativo' : 'Sem Estoque'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <Package className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Gerenciar Estoque</h3>
            <p className="text-white/90 text-sm mb-4">Atualize quantidades e disponibilidade</p>
            <button className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transition-all">
              Acessar
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
            <BarChart3 className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Relatórios</h3>
            <p className="text-white/90 text-sm mb-4">Veja análises detalhadas de vendas</p>
            <button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-lg transition-all">
              Ver Relatórios
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <DollarSign className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Financeiro</h3>
            <p className="text-white/90 text-sm mb-4">Acompanhe receitas e pagamentos</p>
            <button className="px-4 py-2 bg-white text-green-600 font-semibold rounded-lg hover:shadow-lg transition-all">
              Acessar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
