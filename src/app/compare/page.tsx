'use client';

import { Navbar } from '@/components/custom/navbar';
import { BarChart3, TrendingDown, Store, Package, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ComparePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [compareProducts] = useState([
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      stores: [
        { name: 'Amazon', price: 7499.00, shipping: 0, rating: 4.9, cashback: 8 },
        { name: 'Mercado Livre', price: 7699.00, shipping: 0, rating: 4.8, cashback: 10 },
        { name: 'Shopee', price: 7899.00, shipping: 15.90, rating: 4.7, cashback: 12 },
      ],
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop',
    },
    {
      id: '2',
      name: 'Tênis Nike Air Max 270',
      stores: [
        { name: 'Shein', price: 399.90, shipping: 0, rating: 4.8, cashback: 12 },
        { name: 'AliExpress', price: 429.00, shipping: 0, rating: 4.6, cashback: 15 },
        { name: 'Temu', price: 379.90, shipping: 0, rating: 4.7, cashback: 10 },
      ],
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Comparador de Preços</h1>
              <p className="text-gray-600">Compare preços entre diferentes marketplaces</p>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Digite o nome do produto para comparar preços..."
              className="w-full px-6 py-4 bg-white border-2 border-gray-200 focus:border-purple-500 rounded-2xl outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Comparison Results */}
        <div className="space-y-8">
          {compareProducts.map((product) => {
            const bestPrice = Math.min(...product.stores.map(s => s.price + s.shipping));
            
            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                {/* Product Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Melhor preço: <span className="font-bold text-green-600">R$ {bestPrice.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Store Comparison */}
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    {product.stores.map((store, idx) => {
                      const totalPrice = store.price + store.shipping;
                      const isBestPrice = totalPrice === bestPrice;
                      
                      return (
                        <div
                          key={idx}
                          className={`relative p-6 rounded-2xl border-2 transition-all ${
                            isBestPrice
                              ? 'border-green-500 bg-green-50 shadow-lg'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          {isBestPrice && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                              <TrendingDown className="w-3 h-3" />
                              Melhor Oferta
                            </div>
                          )}

                          {/* Store Name */}
                          <div className="flex items-center gap-2 mb-4">
                            <Store className="w-5 h-5 text-purple-600" />
                            <h3 className="font-bold text-gray-900">{store.name}</h3>
                          </div>

                          {/* Price */}
                          <div className="mb-4">
                            <p className="text-3xl font-bold text-purple-600 mb-1">
                              R$ {store.price.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              Frete: {store.shipping === 0 ? (
                                <span className="text-green-600 font-semibold">Grátis</span>
                              ) : (
                                `R$ ${store.shipping.toFixed(2)}`
                              )}
                            </p>
                            <p className="text-sm font-bold text-gray-900 mt-2">
                              Total: R$ {totalPrice.toFixed(2)}
                            </p>
                          </div>

                          {/* Benefits */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-yellow-500">★</span>
                              <span className="text-gray-600">Avaliação: {store.rating}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-green-600">✓</span>
                              <span className="text-gray-600">Cashback: {store.cashback}%</span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <button className={`w-full px-4 py-3 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                            isBestPrice
                              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg'
                              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                          }`}>
                            Comprar Agora
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {compareProducts.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nenhum produto para comparar</h2>
            <p className="text-gray-600 mb-6">Busque por produtos para ver a comparação de preços</p>
          </div>
        )}
      </div>
    </div>
  );
}
