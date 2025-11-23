'use client';

import { Heart, ShoppingCart, TrendingDown, Star, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/lib/types';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-lg">
              <TrendingDown className="w-3 h-3" />
              -{discount}%
            </div>
          )}
          {product.cashback && (
            <div className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg shadow-lg">
              +{product.cashback}% Cashback
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Store Badge */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
          <p className="text-xs font-semibold text-gray-700">{product.store}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-3">
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              R$ {product.originalPrice.toFixed(2)}
            </p>
          )}
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-purple-600">
              R$ {product.price.toFixed(2)}
            </p>
            {product.installments && (
              <p className="text-xs text-gray-600">
                ou {product.installments}x
              </p>
            )}
          </div>
        </div>

        {/* Shipping */}
        {product.freeShipping && (
          <p className="text-sm text-green-600 font-semibold mb-3">
            ✓ Frete Grátis
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/product/${product.id}`} className="flex-1">
            <button className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Comprar
            </button>
          </Link>
          <button className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
