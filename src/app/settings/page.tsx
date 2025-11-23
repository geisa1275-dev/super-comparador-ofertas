'use client';

import { Navbar } from '@/components/custom/navbar';
import { 
  User, 
  Lock, 
  MapPin, 
  CreditCard, 
  MessageSquare, 
  Shield, 
  UserX, 
  Globe, 
  HelpCircle, 
  FileText, 
  Star, 
  Trash2, 
  LogOut,
  ChevronRight,
  Bell,
  Settings as SettingsIcon
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const settingsSections = [
    {
      title: 'Conta',
      items: [
        { icon: User, label: 'Conta e Segurança', href: '/settings/account', desc: 'Gerencie suas informações pessoais' },
        { icon: Bell, label: 'Notificações', href: '/settings/notifications', desc: 'Configure suas preferências de notificação' },
        { icon: MapPin, label: 'Meus Endereços', href: '/settings/addresses', desc: 'Gerencie seus endereços de entrega' },
        { icon: CreditCard, label: 'Formas de Pagamento', href: '/settings/payment', desc: 'Cartões e contas bancárias' },
      ]
    },
    {
      title: 'Comunicação',
      items: [
        { icon: MessageSquare, label: 'Configuração do Chat', href: '/settings/chat', desc: 'Preferências de mensagens e notificações' },
      ]
    },
    {
      title: 'Privacidade e Segurança',
      items: [
        { icon: Shield, label: 'Privacidade', href: '/settings/privacy', desc: 'Controle quem pode ver suas informações' },
        { icon: UserX, label: 'Usuários Bloqueados', href: '/settings/blocked', desc: 'Gerencie usuários bloqueados' },
        { icon: Lock, label: 'Recuperar Senha', href: '/settings/recover-password', desc: 'Altere ou recupere sua senha' },
      ]
    },
    {
      title: 'Preferências',
      items: [
        { icon: Globe, label: 'Linguagem e Idioma', href: '/settings/language', desc: 'Escolha seu idioma preferido' },
      ]
    },
    {
      title: 'Suporte',
      items: [
        { icon: HelpCircle, label: 'Central de Ajuda', href: '/settings/help', desc: 'Encontre respostas para suas dúvidas' },
        { icon: FileText, label: 'Políticas do SuperShop', href: '/settings/policies', desc: 'Termos de uso e políticas' },
        { icon: Star, label: 'Avalie-nos!', href: '/settings/rate', desc: 'Compartilhe sua experiência' },
      ]
    },
    {
      title: 'Gerenciar Conta',
      items: [
        { icon: Trash2, label: 'Solicitar Exclusão da Conta', href: '/settings/delete-account', desc: 'Exclua permanentemente sua conta', danger: true },
        { icon: LogOut, label: 'Sair da Conta', href: '/logout', desc: 'Desconecte-se do SuperShop', danger: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
              <p className="text-gray-600">Gerencie suas preferências e conta</p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {section.items.map((item, itemIdx) => (
                  <Link key={itemIdx} href={item.href}>
                    <div className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group ${item.danger ? 'hover:bg-red-50' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.danger ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={`font-semibold ${item.danger ? 'text-red-600' : 'text-gray-900'}`}>
                              {item.label}
                            </h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 ${item.danger ? 'text-red-400' : 'text-gray-400'} group-hover:translate-x-1 transition-transform`} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* App Version */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>SuperShop v1.0.0</p>
          <p className="mt-1">© 2024 SuperShop. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
