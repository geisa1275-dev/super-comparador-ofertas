'use client';

import { Navbar } from '@/components/custom/navbar';
import { FileText, ChevronLeft, Shield, Lock, Eye, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function PoliciesPage() {
  const policies = [
    {
      icon: FileText,
      title: 'Termos de Uso',
      desc: 'Condições gerais de uso da plataforma',
      content: 'Ao usar o SuperShop, você concorda com nossos termos...'
    },
    {
      icon: Shield,
      title: 'Política de Privacidade',
      desc: 'Como coletamos e usamos seus dados',
      content: 'Respeitamos sua privacidade e protegemos seus dados...'
    },
    {
      icon: Lock,
      title: 'Política de Segurança',
      desc: 'Como protegemos suas informações',
      content: 'Utilizamos criptografia de ponta a ponta...'
    },
    {
      icon: CreditCard,
      title: 'Política de Pagamento',
      desc: 'Métodos de pagamento e reembolso',
      content: 'Aceitamos diversos métodos de pagamento...'
    },
    {
      icon: Eye,
      title: 'Política de Cookies',
      desc: 'Como usamos cookies no site',
      content: 'Utilizamos cookies para melhorar sua experiência...'
    },
  ];

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
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Políticas do SuperShop</h1>
            <p className="text-gray-600">Termos, privacidade e políticas</p>
          </div>
        </div>

        <div className="space-y-4">
          {policies.map((policy, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <button className="w-full px-6 py-4 flex items-center gap-4 hover:bg-purple-50 transition-colors text-left">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <policy.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{policy.title}</h3>
                  <p className="text-sm text-gray-600">{policy.desc}</p>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-2xl p-6">
          <p className="text-sm text-gray-700">
            <strong>Última atualização:</strong> 15 de novembro de 2024
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Ao continuar usando o SuperShop, você concorda com todas as políticas acima.
          </p>
        </div>
      </div>
    </div>
  );
}
