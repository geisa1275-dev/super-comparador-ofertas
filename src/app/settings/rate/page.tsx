'use client';

import { Navbar } from '@/components/custom/navbar';
import { Star, ChevronLeft, Heart, ThumbsUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function RatePage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Por favor, selecione uma avaliação');
      return;
    }
    alert('Obrigado pela sua avaliação! Seu feedback é muito importante para nós.');
    setRating(0);
    setFeedback('');
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
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Avalie o SuperShop</h1>
            <p className="text-gray-600">Sua opinião é muito importante para nós!</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 p-8">
          {/* Rating Stars */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Como você avalia sua experiência?</h2>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="mt-4 text-lg font-semibold text-purple-600">
                {rating === 5 && '🎉 Excelente!'}
                {rating === 4 && '😊 Muito Bom!'}
                {rating === 3 && '👍 Bom!'}
                {rating === 2 && '😐 Regular'}
                {rating === 1 && '😞 Precisa Melhorar'}
              </p>
            )}
          </div>

          {/* Quick Feedback */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4">O que você mais gostou?</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Heart, label: 'Facilidade de uso' },
                { icon: ThumbsUp, label: 'Preços baixos' },
                { icon: Star, label: 'Variedade de produtos' },
                { icon: MessageSquare, label: 'Atendimento' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition-all"
                >
                  <item.icon className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div className="mb-6">
            <label className="block font-bold text-gray-900 mb-2">
              Conte-nos mais sobre sua experiência (opcional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              placeholder="Compartilhe seus comentários, sugestões ou elogios..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Enviar Avaliação
          </button>
        </div>

        {/* Share */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Adorou o SuperShop?</h3>
          <p className="mb-4">Compartilhe com seus amigos e ganhe R$ 20 de cashback!</p>
          <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:shadow-xl transition-all">
            Compartilhar Agora
          </button>
        </div>
      </div>
    </div>
  );
}
