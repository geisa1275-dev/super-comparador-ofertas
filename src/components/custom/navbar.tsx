'use client';

import { ShoppingCart, User, Menu, X, Home, Tag, Heart, Package, Store, Sparkles, BarChart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [cartCount] = useState(4);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
            
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SuperShop
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Melhores Ofertas</p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors font-medium">
              <Home className="w-4 h-4" />
              Início
            </Link>
            <Link href="/#ofertas" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors font-medium">
              <Tag className="w-4 h-4" />
              Ofertas
            </Link>
            <Link href="/compare" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors font-medium">
              <BarChart className="w-4 h-4" />
              Comparar
            </Link>
            <Link href="/suggestions" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors font-medium">
              <Sparkles className="w-4 h-4" />
              Sugestões
            </Link>
            <Link href="/favorites" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors font-medium">
              <Heart className="w-4 h-4" />
              Favoritos
            </Link>
            <Link href="/orders" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors font-medium">
              <Package className="w-4 h-4" />
              Pedidos
            </Link>
            <Link href="/seller" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors font-medium">
              <Store className="w-4 h-4" />
              Vender
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/cart">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
            <Link href="/login">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Entrar</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors font-medium">
                <Home className="w-5 h-5" />
                Início
              </Link>
              <Link href="/#ofertas" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors font-medium">
                <Tag className="w-5 h-5" />
                Ofertas
              </Link>
              <Link href="/compare" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors font-medium">
                <BarChart className="w-5 h-5" />
                Comparar Preços
              </Link>
              <Link href="/suggestions" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors font-medium">
                <Sparkles className="w-5 h-5" />
                Sugestões
              </Link>
              <Link href="/favorites" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors font-medium">
                <Heart className="w-5 h-5" />
                Favoritos
              </Link>
              <Link href="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors font-medium">
                <Package className="w-5 h-5" />
                Pedidos
              </Link>
              <Link href="/seller" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors font-medium">
                <Store className="w-5 h-5" />
                Área do Vendedor
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
