'use client';

import { Search, Mic, Camera, X } from 'lucide-react';
import { useState, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string, type: 'text' | 'voice' | 'image') => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, 'text');
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simular busca por voz
    setTimeout(() => {
      setIsListening(false);
      const voiceQuery = 'Tênis esportivo';
      setQuery(voiceQuery);
      onSearch(voiceQuery, 'voice');
    }, 2000);
  };

  const handleImageSearch = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simular busca por imagem
      const imageQuery = 'Produto similar à imagem';
      setQuery(imageQuery);
      onSearch(imageQuery, 'image');
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('', 'text');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="flex items-center gap-2 bg-white rounded-2xl shadow-lg border-2 border-gray-200 focus-within:border-purple-500 transition-all duration-300">
          <Search className="w-5 h-5 text-gray-400 ml-4" />
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Busque por produto, marca ou categoria..."
            className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
          />

          {query && (
            <button
              onClick={handleClear}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}

          <div className="flex items-center gap-2 pr-2">
            <button
              onClick={handleVoiceSearch}
              disabled={isListening}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'hover:bg-purple-50 text-purple-600'
              }`}
              title="Busca por voz"
            >
              <Mic className="w-5 h-5" />
            </button>

            <button
              onClick={handleImageSearch}
              className="p-3 hover:bg-purple-50 text-purple-600 rounded-xl transition-all duration-300"
              title="Busca por imagem"
            >
              <Camera className="w-5 h-5" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
            >
              Buscar
            </button>
          </div>
        </div>

        {isListening && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
            <p className="text-center text-gray-600">
              🎤 Ouvindo... Fale o que você procura
            </p>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {['Tênis Nike', 'iPhone 15', 'Fone Bluetooth', 'Notebook Gamer', 'Smart TV'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setQuery(suggestion);
              onSearch(suggestion, 'text');
            }}
            className="px-4 py-2 bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
