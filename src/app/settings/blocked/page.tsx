'use client';

import { Navbar } from '@/components/custom/navbar';
import { UserX, ChevronLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function BlockedUsersPage() {
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 1, name: 'Vendedor Spam', date: '15/11/2024' },
    { id: 2, name: 'Usuário Indesejado', date: '10/11/2024' },
  ]);

  const handleUnblock = (id: number) => {
    if (confirm('Deseja desbloquear este usuário?')) {
      setBlockedUsers(blockedUsers.filter(u => u.id !== id));
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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <UserX className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Usuários Bloqueados</h1>
            <p className="text-gray-600">{blockedUsers.length} usuário(s) bloqueado(s)</p>
          </div>
        </div>

        {blockedUsers.length > 0 ? (
          <div className="space-y-4">
            {blockedUsers.map((user) => (
              <div key={user.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">Bloqueado em {user.date}</p>
                  </div>
                  <button
                    onClick={() => handleUnblock(user.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Desbloquear
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 p-12 text-center">
            <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum usuário bloqueado</h3>
            <p className="text-gray-600">Você não bloqueou nenhum usuário ainda</p>
          </div>
        )}
      </div>
    </div>
  );
}
