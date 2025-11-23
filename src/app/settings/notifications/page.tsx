'use client';

import { Navbar } from '@/components/custom/navbar';
import { Bell, ChevronLeft, ShoppingBag, Tag, MessageSquare, TrendingUp, Mail, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    priceAlerts: true,
    newOffers: false,
    chatMessages: true,
    recommendations: true,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
  });

  const toggleNotification = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const notificationGroups = [
    {
      title: 'Compras e Pedidos',
      items: [
        { key: 'orderUpdates', icon: ShoppingBag, label: 'Atualizações de Pedidos', desc: 'Receba notificações sobre status dos seus pedidos' },
        { key: 'priceAlerts', icon: TrendingUp, label: 'Alertas de Preço', desc: 'Seja avisado quando produtos favoritos baixarem de preço' },
        { key: 'newOffers', icon: Tag, label: 'Novas Ofertas', desc: 'Receba notificações sobre ofertas e promoções' },
      ]
    },
    {
      title: 'Comunicação',
      items: [
        { key: 'chatMessages', icon: MessageSquare, label: 'Mensagens do Chat', desc: 'Notificações de novas mensagens' },
        { key: 'recommendations', icon: TrendingUp, label: 'Recomendações Personalizadas', desc: 'Sugestões de produtos baseadas no seu perfil' },
      ]
    },
    {
      title: 'Canais de Notificação',
      items: [
        { key: 'emailNotifications', icon: Mail, label: 'Notificações por E-mail', desc: 'Receba atualizações no seu e-mail' },
        { key: 'pushNotifications', icon: Bell, label: 'Notificações Push', desc: 'Notificações no navegador e app' },
        { key: 'smsNotifications', icon: Smartphone, label: 'Notificações por SMS', desc: 'Receba SMS para atualizações importantes' },
      ]
    }
  ];

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
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
              <p className="text-gray-600">Gerencie suas preferências de notificação</p>
            </div>
          </div>
        </div>

        {/* Notification Groups */}
        <div className="space-y-6">
          {notificationGroups.map((group, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">{group.title}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {group.items.map((item) => (
                  <div key={item.key} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.label}</h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                            : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications[item.key as keyof typeof notifications]
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Salvar Preferências
          </button>
        </div>
      </div>
    </div>
  );
}
