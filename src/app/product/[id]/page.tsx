'use client';

import { Navbar } from '@/components/custom/navbar';
import { ShoppingCart, Heart, Share2, Star, TrendingDown, Truck, Shield, BarChart } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: params.id,
    name: 'Tênis Nike Air Max 270 - Masculino',
    price: 399.90,
    originalPrice: 799.90,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop',
    ],
    store: 'Shein',
    rating: 4.8,
    reviews: 1234,
    cashback: 12,
    description: 'Tênis Nike Air Max 270 com design moderno e confortável. Ideal para corridas e uso casual. Tecnologia Air Max para máximo amortecimento.',
    features: [
      'Tecnologia Air Max',
      'Cabedal em mesh respirável',
      'Solado de borracha durável',
      'Design moderno e versátil',
    ],
    specifications: {
      'Marca': 'Nike',
      'Modelo': 'Air Max 270',
      'Gênero': 'Masculino',
      'Material': 'Mesh e Sintético',
      'Cor': 'Preto/Branco',
    },
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-purple-600' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full aspect-square object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">{product.store}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-sm text-gray-600">({product.reviews} avaliações)</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">
                  <TrendingDown className="w-4 h-4" />
                  -{discount}%
                </div>
                {product.cashback && (
                  <div className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-lg">
                    +{product.cashback}% Cashback
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-500 line-through mb-1">
                R$ {product.originalPrice.toFixed(2)}
              </p>
              <p className="text-4xl font-bold text-purple-600 mb-4">
                R$ {product.price.toFixed(2)}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </button>
                <button className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                  <Heart className="w-6 h-6 text-gray-700" />
                </button>
                <button className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                  <Share2 className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Frete Grátis</p>
                  <p className="text-xs text-gray-600">Entrega em 2-3 dias</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Shield className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Compra Segura</p>
                  <p className="text-xs text-gray-600">Garantia de 30 dias</p>
                </div>
              </div>
            </div>

            {/* Compare */}
            <a href="/compare">
              <button className="w-full px-6 py-3 bg-white hover:bg-gray-50 border-2 border-purple-600 text-purple-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                <BarChart className="w-5 h-5" />
                Comparar Preços em Outros Marketplaces
              </button>
            </a>
          </div>
        </div>

        {/* Description & Details */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">Características</h3>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Especificações</h2>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="font-semibold text-gray-700">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
