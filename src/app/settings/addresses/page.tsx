'use client';

import { Navbar } from '@/components/custom/navbar';
import { MapPin, ChevronLeft, Plus, Home, Briefcase, MapPinned, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Address {
  id: number;
  type: 'home' | 'work' | 'other';
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: 'home',
      label: 'Casa',
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Jardim Primavera',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      isDefault: true,
    },
    {
      id: 2,
      type: 'work',
      label: 'Trabalho',
      street: 'Av. Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      isDefault: false,
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home': return Home;
      case 'work': return Briefcase;
      default: return MapPinned;
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este endereço?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
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
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Meus Endereços</h1>
                <p className="text-gray-600">Gerencie seus endereços de entrega</p>
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

        {/* Addresses List */}
        <div className="space-y-4">
          {addresses.map((address) => {
            const Icon = getAddressIcon(address.type);
            return (
              <div key={address.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          {address.label}
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg">
                              Padrão
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {address.street}, {address.number}
                          {address.complement && ` - ${address.complement}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.neighborhood}, {address.city} - {address.state}
                        </p>
                        <p className="text-sm text-gray-600">CEP: {address.zipCode}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors">
                        <Edit className="w-5 h-5 text-purple-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      Definir como padrão
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Address Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Adicionar Novo Endereço</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Endereço</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    <option value="home">Casa</option>
                    <option value="work">Trabalho</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CEP</label>
                  <input
                    type="text"
                    placeholder="00000-000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rua</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Número</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Complemento (opcional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bairro</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                      <option>SP</option>
                      <option>RJ</option>
                      <option>MG</option>
                      {/* Add more states */}
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex gap-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert('Endereço adicionado com sucesso!');
                    setShowAddForm(false);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Salvar Endereço
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
