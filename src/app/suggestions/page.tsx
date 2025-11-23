'use client';

import { Navbar } from '@/components/custom/navbar';
import { Sparkles, TrendingUp, Zap, Heart, ShoppingBag } from 'lucide-react';
import { ProductCard } from '@/components/custom/product-card';
import { trendingProducts } from '@/lib/mock-data';

export default function SuggestionsPage() {
  const suggestions = [
    {
      title: 'Baseado no seu histórico',
      icon: TrendingUp,
      products: trendingProducts.slice(0, 4),
    },
    {
      title: 'Produtos em alta',
      icon: Zap,
      products: trendingProducts.slice(2, 6),
    },
    {
      title: 'Você pode gostar',
      icon: Heart,
      products: trendingProducts.slice(4, 8),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sugestões para Você</h1>
              <p className="text-gray-600">Produtos selecionados especialmente para você</p>
            </div>
          </div>
        </div>

        {/* Suggestion Sections */}
        <div className="space-y-12">
          {suggestions.map((section, idx) => (
            <div key={idx}>
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {section.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Quer sugestões ainda mais personalizadas?
          </h2>
          <p className="text-lg mb-6 text-white/90">
            Faça login para receber recomendações baseadas no seu perfil de compras!
          </p>
          <a href="/login">
            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Fazer Login
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
