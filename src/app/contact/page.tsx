'use client';

import { Navbar } from '@/components/custom/navbar';
import { Mail, MessageSquare, Phone, MapPin, Send, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envio (pode integrar com API de e-mail ou IA depois)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fale Conosco
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tem dúvidas, sugestões ou precisa de ajuda? Estamos aqui para você! 
            Nossa equipe responde em até 24 horas.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">E-mail</h3>
                  <p className="text-gray-600">contato@supershop.com.br</p>
                  <p className="text-sm text-gray-500 mt-1">Resposta em até 24h</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Telefone</h3>
                  <p className="text-gray-600">(11) 4002-8922</p>
                  <p className="text-sm text-gray-500 mt-1">Seg-Sex: 9h às 18h</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Chat ao Vivo</h3>
                  <p className="text-gray-600">Disponível no app</p>
                  <p className="text-sm text-gray-500 mt-1">Resposta imediata</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Endereço</h3>
                  <p className="text-gray-600">
                    Av. Paulista, 1000<br />
                    São Paulo - SP<br />
                    CEP: 01310-100
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie sua Mensagem</h2>

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800">Mensagem enviada com sucesso!</p>
                    <p className="text-sm text-green-700 mt-1">
                      Recebemos sua mensagem e responderemos em breve. Obrigado!
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="duvida">Dúvida sobre Produto</option>
                    <option value="pedido">Problema com Pedido</option>
                    <option value="cashback">Cashback</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Descreva sua dúvida ou sugestão..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Ao enviar esta mensagem, você concorda com nossa{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Quick Links */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Perguntas Frequentes</h2>
          <p className="text-center text-white/90 mb-6">
            Antes de entrar em contato, veja se sua dúvida já foi respondida:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'Como funciona o cashback?',
              'Quanto tempo leva a entrega?',
              'Como rastrear meu pedido?',
            ].map((faq, idx) => (
              <a
                key={idx}
                href="/settings/help"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
              >
                {faq}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
