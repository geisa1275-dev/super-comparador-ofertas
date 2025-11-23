'use client';

import { Navbar } from '@/components/custom/navbar';
import { CreditCard, MapPin, Truck, Shield, ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  const cartItems = [
    { name: 'Tênis Nike Air Max 270', price: 399.90, quantity: 1 },
    { name: 'Fone JBL Tune 510BT', price: 149.90, quantity: 2 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-4">
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Carrinho
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Endereço', icon: MapPin },
              { num: 2, label: 'Pagamento', icon: CreditCard },
              { num: 3, label: 'Confirmação', icon: Check },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s.num
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-sm mt-2 font-semibold ${step >= s.num ? 'text-purple-600' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`h-1 flex-1 mx-4 ${step > s.num ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-purple-600" />
                  Endereço de Entrega
                </h2>

                <div className="space-y-4">
                  <div className="p-4 border-2 border-purple-500 bg-purple-50 rounded-xl cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">Casa</p>
                        <p className="text-sm text-gray-600">Rua das Flores, 123</p>
                        <p className="text-sm text-gray-600">Centro - São Paulo, SP</p>
                        <p className="text-sm text-gray-600">CEP: 01234-567</p>
                      </div>
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 border-2 border-dashed border-gray-300 hover:border-purple-500 text-gray-600 hover:text-purple-600 font-semibold rounded-xl transition-all">
                    + Adicionar Novo Endereço
                  </button>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  Continuar para Pagamento
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                  Forma de Pagamento
                </h2>

                <div className="space-y-4">
                  <div className="p-4 border-2 border-purple-500 bg-purple-50 rounded-xl cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-purple-600" />
                        <div>
                          <p className="font-bold text-gray-900">Cartão de Crédito</p>
                          <p className="text-sm text-gray-600">**** **** **** 1234</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-gray-200 hover:border-purple-300 rounded-xl cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-green-600">PIX</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">PIX</p>
                        <p className="text-sm text-gray-600">Aprovação instantânea</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    Revisar Pedido
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Check className="w-6 h-6 text-purple-600" />
                  Revisar Pedido
                </h2>

                <div className="space-y-6">
                  {/* Delivery */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-purple-600" />
                      Entrega
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600">Rua das Flores, 123</p>
                      <p className="text-sm text-gray-600">Centro - São Paulo, SP</p>
                      <p className="text-sm font-semibold text-green-600 mt-2">
                        Entrega grátis em 2-3 dias úteis
                      </p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                      Pagamento
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600">Cartão de Crédito **** 1234</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Itens do Pedido</h3>
                    <div className="space-y-2">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-sm text-gray-600">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
                  >
                    Voltar
                  </button>
                  <button className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    Finalizar Compra
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-purple-600">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-200 mb-4">
                <p className="text-sm text-green-700 font-semibold">
                  ✓ Você vai ganhar R$ {(total * 0.12).toFixed(2)} de cashback!
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <p className="text-sm text-purple-700 font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Compra 100% segura e protegida
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
