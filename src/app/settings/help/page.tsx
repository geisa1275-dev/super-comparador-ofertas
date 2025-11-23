'use client';

import { Navbar } from '@/components/custom/navbar';
import { HelpCircle, ChevronLeft, Search, MessageCircle, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  const faqs = [
    { q: 'Como faço para rastrear meu pedido?', a: 'Acesse "Meus Pedidos" e clique no pedido desejado para ver o rastreamento.' },
    { q: 'Como funciona o cashback?', a: 'Você recebe até 15% de volta em cada compra, creditado em até 7 dias.' },
    { q: 'Posso cancelar um pedido?', a: 'Sim, você pode cancelar antes do envio em "Meus Pedidos".' },
    { q: 'Como adiciono um cupom de desconto?', a: 'No checkout, há um campo para inserir o código do cupom.' },
    { q: 'Qual o prazo de entrega?', a: 'Varia de 24h a 30 dias dependendo do produto e vendedor.' },
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
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Central de Ajuda</h1>
            <p className="text-gray-600">Encontre respostas para suas dúvidas</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar ajuda..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ainda precisa de ajuda?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition-all">
              <MessageCircle className="w-8 h-8 text-purple-600" />
              <span className="font-semibold text-gray-900">Chat ao Vivo</span>
              <span className="text-sm text-gray-600">Resposta imediata</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition-all">
              <Mail className="w-8 h-8 text-purple-600" />
              <span className="font-semibold text-gray-900">E-mail</span>
              <span className="text-sm text-gray-600">ajuda@supershop.com</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition-all">
              <Phone className="w-8 h-8 text-purple-600" />
              <span className="font-semibold text-gray-900">Telefone</span>
              <span className="text-sm text-gray-600">0800 123 4567</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
