'use client';

import { Navbar } from '@/components/custom/navbar';
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Tênis Nike Air Max 270',
      price: 399.90,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
      store: 'Shein',
    },
    {
      id: '2',
      name: 'Fone JBL Tune 510BT',
      price: 149.90,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      store: 'Amazon',
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15.90;
  const discount = subtotal * 0.1; // 10% desconto
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meu Carrinho</h1>
            <p className="text-gray-600">{cartItems.length} itens</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">Adicione produtos para começar suas compras!</p>
            <Link href="/">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Explorar Produtos
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.store}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xl font-bold text-purple-600">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      Desconto
                    </span>
                    <span>- R$ {discount.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-purple-600">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                    Finalizar Compra
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-sm text-green-700 font-semibold">
                    ✓ Você vai ganhar R$ {(total * 0.12).toFixed(2)} de cashback!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
