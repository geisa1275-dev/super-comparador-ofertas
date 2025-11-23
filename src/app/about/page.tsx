'use client';

import { Navbar } from '@/components/custom/navbar';
import { Sparkles, Target, Users, TrendingUp, Shield, Heart, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sobre o SuperShop
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Quem Somos
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos o maior comparador de ofertas do Brasil, reunindo os melhores preços de 
            <span className="font-semibold text-purple-600"> Shein, Temu, Shopee, Mercado Livre, AliExpress, Amazon</span> e muito mais em um só lugar.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-12 mb-12 border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Nossa Missão</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Democratizar o acesso às melhores ofertas online, permitindo que qualquer pessoa 
                encontre os menores preços sem precisar navegar por dezenas de sites diferentes. 
                Queremos que você economize tempo e dinheiro, sempre!
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nossos Valores</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Transparência',
                desc: 'Mostramos todos os custos reais, sem taxas escondidas. O que você vê é o que você paga.',
              },
              {
                icon: Heart,
                title: 'Compromisso',
                desc: 'Estamos comprometidos em oferecer a melhor experiência de compra com cashback garantido.',
              },
              {
                icon: Zap,
                title: 'Inovação',
                desc: 'Usamos IA para busca inteligente por texto, voz e imagem. Tecnologia a seu favor!',
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 sm:p-12 mb-12 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">SuperShop em Números</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10+', label: 'Marketplaces' },
              { value: '1M+', label: 'Produtos' },
              { value: '500K+', label: 'Usuários' },
              { value: '15%', label: 'Cashback Médio' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Como Funciona</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Busque o Produto',
                desc: 'Use texto, voz ou foto para encontrar o que procura. Nossa IA entende você!',
              },
              {
                step: '2',
                title: 'Compare Preços',
                desc: 'Veja ofertas de todos os marketplaces lado a lado com cashback e frete.',
              },
              {
                step: '3',
                title: 'Compre e Ganhe',
                desc: 'Finalize tudo em um checkout único e receba cashback em cada compra!',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Nosso Time</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Somos uma equipe apaixonada por tecnologia e e-commerce, dedicada a criar a melhor 
                experiência de compra online do Brasil. Trabalhamos 24/7 para garantir que você 
                sempre encontre os melhores preços e ofertas.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nosso time de desenvolvedores, designers e especialistas em e-commerce está sempre 
                inovando para trazer novas funcionalidades e melhorar sua experiência de compra.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="/login">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Comece a Economizar Agora
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
