'use client';

import { Navbar } from '@/components/custom/navbar';
import { Trash2, ChevronLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DeleteAccountPage() {
  const [reason, setReason] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleDelete = () => {
    if (confirmText !== 'EXCLUIR') {
      alert('Digite "EXCLUIR" para confirmar');
      return;
    }
    if (!agreed) {
      alert('Você precisa concordar com os termos');
      return;
    }
    if (confirm('Tem certeza absoluta? Esta ação é IRREVERSÍVEL!')) {
      alert('Sua solicitação de exclusão foi enviada. Processaremos em até 30 dias.');
    }
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
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Trash2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Excluir Conta</h1>
            <p className="text-gray-600">Esta ação é permanente e irreversível</p>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-900 mb-2">Atenção! Esta ação é irreversível</h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Todos os seus dados serão permanentemente excluídos</li>
                <li>• Você perderá todo o histórico de compras</li>
                <li>• Seu cashback acumulado será perdido</li>
                <li>• Pedidos em andamento serão cancelados</li>
                <li>• Não será possível recuperar sua conta</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 p-6">
          {/* Reason */}
          <div className="mb-6">
            <label className="block font-bold text-gray-900 mb-2">
              Por que você quer excluir sua conta? (opcional)
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="">Selecione um motivo</option>
              <option value="privacy">Preocupações com privacidade</option>
              <option value="not-using">Não uso mais o serviço</option>
              <option value="found-alternative">Encontrei uma alternativa melhor</option>
              <option value="too-expensive">Muito caro</option>
              <option value="bad-experience">Experiência ruim</option>
              <option value="other">Outro motivo</option>
            </select>
          </div>

          {/* Confirmation */}
          <div className="mb-6">
            <label className="block font-bold text-gray-900 mb-2">
              Digite "EXCLUIR" para confirmar
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="EXCLUIR"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          {/* Agreement */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-600"
              />
              <span className="text-sm text-gray-700">
                Eu entendo que esta ação é permanente e que todos os meus dados, incluindo histórico de compras, 
                cashback acumulado e pedidos em andamento serão perdidos e não poderão ser recuperados.
              </span>
            </label>
          </div>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={confirmText !== 'EXCLUIR' || !agreed}
            className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Excluir Minha Conta Permanentemente
          </button>
        </div>

        {/* Alternative */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-gray-900 mb-2">Não quer excluir? Que tal pausar?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Você pode desativar temporariamente sua conta sem perder seus dados
          </p>
          <button className="px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-all">
            Desativar Temporariamente
          </button>
        </div>
      </div>
    </div>
  );
}
