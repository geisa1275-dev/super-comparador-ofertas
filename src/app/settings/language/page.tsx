'use client';

import { Navbar } from '@/components/custom/navbar';
import { Globe, ChevronLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('pt-BR');

  const languages = [
    { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
    { code: 'en-US', name: 'English (United States)', flag: '🇺🇸' },
    { code: 'es-ES', name: 'Español (España)', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'Français (France)', flag: '🇫🇷' },
    { code: 'de-DE', name: 'Deutsch (Deutschland)', flag: '🇩🇪' },
    { code: 'it-IT', name: 'Italiano (Italia)', flag: '🇮🇹' },
    { code: 'ja-JP', name: '日本語 (日本)', flag: '🇯🇵' },
    { code: 'zh-CN', name: '中文 (中国)', flag: '🇨🇳' },
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
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Linguagem e Idioma</h1>
            <p className="text-gray-600">Escolha seu idioma preferido</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {languages.map((lang, idx) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`w-full px-6 py-4 flex items-center justify-between hover:bg-purple-50 transition-colors ${
                idx > 0 ? 'border-t border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{lang.flag}</span>
                <span className="font-semibold text-gray-900">{lang.name}</span>
              </div>
              {selectedLanguage === lang.code && (
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Salvar Idioma
          </button>
        </div>
      </div>
    </div>
  );
}
