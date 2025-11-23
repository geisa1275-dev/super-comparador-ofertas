'use client';

import { Navbar } from '@/components/custom/navbar';
import { Heart, Trash2, ShoppingCart, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Tênis Nike Air Max 270',
      price: 399.90,
      originalPrice: 799.90,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      store: 'Shein',
      inStock: true,
    },
    {
      id: '2',
      name: 'iPhone 15 Pro Max 256GB',
      price: 7499.00,
      originalPrice: 8999.00,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
      store: 'Amazon',
      inStock: true,
    },
    {
      id: '3',
      name: 'Smart TV Samsung 55" 4K',
      price: 2199.00,
      originalPrice: 3499.00,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
      store: 'Shopee',
      inStock: false,
    },
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
            <p className="text-gray-600">{favorites.length} produtos salvos</p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nenhum favorito ainda</h2>
            <p className="text-gray-600 mb-6">Adicione produtos aos favoritos para acompanhar preços!</p>
            <Link href="/">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Explorar Produtos
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((item) => {
              const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
              
              return (
                <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-lg">
                        <TrendingDown className="w-3 h-3" />
                        -{discount}%
                      </div>
                    )}

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>

                    {/* Stock Status */}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <p className="text-white font-bold text-lg">Indisponível</p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{item.store}</p>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                      {item.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 line-through">
                        R$ {item.originalPrice.toFixed(2)}
                      </p>
                      <p className="text-2xl font-bold text-purple-600">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Action Button */}
                    {item.inStock ? (
                      <button className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Adicionar ao Carrinho
                      </button>
                    ) : (
                      <button disabled className="w-full px-4 py-2.5 bg-gray-200 text-gray-500 font-semibold rounded-xl cursor-not-allowed">
                        Indisponível
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
