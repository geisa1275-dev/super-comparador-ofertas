'use client';

import { Navbar } from '@/components/custom/navbar';
import { Mail, Phone, ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function RecoverPasswordPage() {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-100">
          <Link href="/login" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-6">
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Login
          </Link>

          {!sent ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Recuperar Senha</h1>
                <p className="text-gray-600">
                  Escolha como deseja receber o código de recuperação
                </p>
              </div>

              {/* Method Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setMethod('email')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    method === 'email'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Mail className={`w-6 h-6 mx-auto mb-2 ${method === 'email' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <p className={`text-sm font-semibold ${method === 'email' ? 'text-purple-600' : 'text-gray-600'}`}>
                    E-mail
                  </p>
                </button>

                <button
                  onClick={() => setMethod('phone')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    method === 'phone'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Phone className={`w-6 h-6 mx-auto mb-2 ${method === 'phone' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <p className={`text-sm font-semibold ${method === 'phone' ? 'text-purple-600' : 'text-gray-600'}`}>
                    Telefone
                  </p>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {method === 'email' ? 'E-mail' : 'Telefone'}
                  </label>
                  <div className="relative">
                    {method === 'email' ? (
                      <>
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="seu@email.com"
                          required
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                      </>
                    ) : (
                      <>
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          required
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Enviar Código
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Código Enviado!</h2>
              <p className="text-gray-600 mb-6">
                Enviamos um código de recuperação para seu {method === 'email' ? 'e-mail' : 'telefone'}.
                Verifique sua caixa de entrada.
              </p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Digite o código"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-center text-2xl font-bold tracking-widest"
                  maxLength={6}
                />
                
                <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg">
                  Verificar Código
                </button>

                <button
                  onClick={() => setSent(false)}
                  className="w-full text-sm text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Não recebeu? Enviar novamente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
