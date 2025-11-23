'use client';

import { Navbar } from '@/components/custom/navbar';
import { SearchBar } from '@/components/custom/search-bar';
import { ProductCard } from '@/components/custom/product-card';
import { trendingProducts } from '@/lib/mock-data';
import { TrendingUp, Zap, Shield, Truck, Sparkles, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProducts, searchProducts } from '@/lib/supabase-actions';
import { Product } from '@/lib/types';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(trendingProducts);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [useSupabase, setUseSupabase] = useState(false);
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Carregar produtos iniciais
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { products: supabaseProducts, hasMore: more } = await getProducts(1, 12);
        if (supabaseProducts.length > 0) {
          setProducts(supabaseProducts);
          setHasMore(more);
          setUseSupabase(true);
        } else {
          setProducts(trendingProducts);
          setHasMore(false);
          setUseSupabase(false);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setProducts(trendingProducts);
        setHasMore(false);
        setUseSupabase(false);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Carregar mais produtos
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const { products: moreProducts, hasMore: more } = await getProducts(nextPage, 12);
      
      if (moreProducts.length > 0) {
        setProducts(prev => [...prev, ...moreProducts]);
        setCurrentPage(nextPage);
        setHasMore(more);
      }
    } catch (error) {
      console.error('Erro ao carregar mais produtos:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Buscar produtos
  const handleSearch = async (query: string, type: 'text' | 'voice' | 'image') => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      // Se busca vazia, recarregar produtos originais
      setLoading(true);
      const { products: supabaseProducts, hasMore: more } = await getProducts(1, 12);
      setProducts(supabaseProducts.length > 0 ? supabaseProducts : trendingProducts);
      setHasMore(more);
      setCurrentPage(1);
      setLoading(false);
      return;
    }

    setSearching(true);
    try {
      const results = await searchProducts(query);
      if (results.length > 0) {
        setProducts(results);
        setHasMore(false); // Busca não tem paginação
      } else {
        // Fallback para busca local nos dados mockados
        const localResults = trendingProducts.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category?.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(localResults.length > 0 ? localResults : []);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      // Busca local como fallback
      const localResults = trendingProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category?.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(localResults.length > 0 ? localResults : []);
      setHasMore(false);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-orange-600/10 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Super Comparador de Ofertas
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Encontre os{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                melhores preços
              </span>
              <br />
              em um só lugar
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Comparamos Shein, Temu, Shopee, Mercado Livre, AliExpress, Amazon e mais.
              <br />
              <span className="font-semibold text-purple-600">Compre tudo em um checkout + Cashback garantido!</span>
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />

          {/* Features */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {[
              { icon: Zap, title: 'Busca com IA', desc: 'Texto, voz ou foto' },
              { icon: TrendingUp, title: 'Melhor Preço', desc: 'Comparação em tempo real' },
              { icon: Shield, title: 'Cashback', desc: 'Até 15% de volta' },
              { icon: Truck, title: 'Entrega Rápida', desc: 'A partir de 24h' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <feature.icon className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="ofertas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Produtos em Alta'}
            </h2>
            <p className="text-gray-600 mt-2">
              {searchQuery ? `${products.length} produtos encontrados` : 'As melhores ofertas dos maiores marketplaces do Brasil'}
              {useSupabase && (
                <span className="ml-2 text-green-600 font-semibold">
                  • Conectado ao Supabase ✓
                </span>
              )}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button className="px-4 py-2 bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200">
              Menor Preço
            </button>
            <button className="px-4 py-2 bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200">
              Maior Cashback
            </button>
            <button className="px-4 py-2 bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200">
              Entrega Rápida
            </button>
          </div>
        </div>

        {/* Loading State */}
        {(loading || searching) ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 mb-4">Nenhum produto encontrado</p>
                <button 
                  onClick={() => handleSearch('', 'text')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  Ver Todos os Produtos
                </button>
              </div>
            )}

            {/* Load More */}
            {products.length > 0 && !searchQuery && hasMore && (
              <div className="text-center mt-12">
                <button 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Carregando...
                    </>
                  ) : (
                    'Carregar Mais Ofertas'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pronto para economizar de verdade?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white/90">
            Cadastre-se agora e ganhe R$ 50 de cashback no primeiro pedido!
          </p>
          <a href="/login">
            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Criar Conta Grátis
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Sobre</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">Quem Somos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Parceiros</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Ajuda</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contact" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Entregas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Devoluções</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Marketplaces</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Shein • Temu</li>
                <li>Shopee • Mercado Livre</li>
                <li>AliExpress • Amazon</li>
                <li>Meliuz • E mais...</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 SuperShop. Todos os direitos reservados.</p>
            <p className="text-sm mt-2">Comparador inteligente de ofertas com cashback garantido.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
