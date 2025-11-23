'use client';

import { Navbar } from '@/components/custom/navbar';
import { CreditCard, ChevronLeft, Plus, Trash2, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface PaymentMethod {
  id: number;
  type: 'card' | 'bank';
  name: string;
  number: string;
  isDefault: boolean;
}

export default function PaymentPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: 'card',
      name: 'Visa Platinum',
      number: '**** **** **** 1234',
      isDefault: true,
    },
    {
      id: 2,
      type: 'card',
      name: 'Mastercard Gold',
      number: '**** **** **** 5678',
      isDefault: false,
    },
    {
      id: 3,
      type: 'bank',
      name: 'Banco do Brasil',
      number: 'Ag: 1234-5 | CC: 12345-6',
      isDefault: false,
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState<'card' | 'bank'>('card');

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este método de pagamento?')) {
      setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
    }
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/settings" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 font-medium">
            <ChevronLeft className="w-5 h-5" />
            Voltar para Configurações
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Formas de Pagamento</h1>
                <p className="text-gray-600">Gerencie cartões e contas bancárias</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Adicionar
            </button>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      method.type === 'card' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {method.type === 'card' ? (
                        <CreditCard className={`w-6 h-6 ${method.type === 'card' ? 'text-blue-600' : 'text-green-600'}`} />
                      ) : (
                        <Building2 className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        {method.name}
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg">
                            Padrão
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">{method.number}</p>
                      {!method.isDefault && (
                        <button
                          onClick={() => handleSetDefault(method.id)}
                          className="text-sm text-purple-600 hover:text-purple-700 font-semibold mt-1"
                        >
                          Definir como padrão
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Payment Method Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Adicionar Método de Pagamento</h2>
              </div>
              
              {/* Type Selection */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex gap-4">
                  <button
                    onClick={() => setFormType('card')}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      formType === 'card'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className={`w-8 h-8 mx-auto mb-2 ${formType === 'card' ? 'text-purple-600' : 'text-gray-400'}`} />
                    <p className={`font-semibold ${formType === 'card' ? 'text-purple-600' : 'text-gray-600'}`}>
                      Cartão de Crédito/Débito
                    </p>
                  </button>
                  <button
                    onClick={() => setFormType('bank')}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      formType === 'bank'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building2 className={`w-8 h-8 mx-auto mb-2 ${formType === 'bank' ? 'text-purple-600' : 'text-gray-400'}`} />
                    <p className={`font-semibold ${formType === 'bank' ? 'text-purple-600' : 'text-gray-600'}`}>
                      Conta Bancária
                    </p>
                  </button>
                </div>
              </div>

              {/* Card Form */}
              {formType === 'card' && (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nome no Cartão</label>
                    <input
                      type="text"
                      placeholder="Como está escrito no cartão"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Form */}
              {formType === 'bank' && (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Banco</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <option>Banco do Brasil</option>
                      <option>Bradesco</option>
                      <option>Itaú</option>
                      <option>Santander</option>
                      <option>Caixa Econômica</option>
                      <option>Nubank</option>
                      <option>Inter</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Conta</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <option>Conta Corrente</option>
                      <option>Conta Poupança</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Agência</label>
                      <input
                        type="text"
                        placeholder="0000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Conta</label>
                      <input
                        type="text"
                        placeholder="00000-0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 border-t border-gray-100 flex gap-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert('Método de pagamento adicionado com sucesso!');
                    setShowAddForm(false);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
