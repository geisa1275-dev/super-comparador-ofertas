'use client';

import { Navbar } from '@/components/custom/navbar';
import { Shield, ChevronLeft, Eye, EyeOff, Lock, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PrivacyPage() {
  const [settings, setSettings] = useState({
    profileVisible: true,
    showOnline: true,
    showPurchases: false,
    allowMessages: true,
  });

  const toggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/settings" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 font-medium">
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </Link>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Privacidade</h1>
            <p className="text-gray-600">Controle suas informações e visibilidade</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100">
          {[
            { key: 'profileVisible', icon: Eye, label: 'Perfil Público', desc: 'Permitir que outros usuários vejam seu perfil' },
            { key: 'showOnline', icon: UserCheck, label: 'Status Online', desc: 'Mostrar quando você está online' },
            { key: 'showPurchases', icon: EyeOff, label: 'Histórico de Compras Público', desc: 'Permitir que outros vejam suas compras' },
            { key: 'allowMessages', icon: Lock, label: 'Receber Mensagens', desc: 'Permitir que vendedores enviem mensagens' },
          ].map((item, idx) => (
            <div key={idx} className={`px-6 py-4 ${idx > 0 ? 'border-t border-gray-100' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.label}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggle(item.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[item.key as keyof typeof settings] ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
