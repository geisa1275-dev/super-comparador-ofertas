'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Navbar } from '@/components/custom/navbar';
import { 
  User, 
  Package, 
  Heart, 
  Wallet, 
  TrendingUp, 
  ShoppingBag,
  Star,
  Clock,
  Gift,
  Settings,
  LogOut
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth');
        return;
      }

      setUser(user);

      // Buscar perfil do usuário
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setProfile(profile);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Você saiu da sua conta');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Olá, {profile?.full_name || user?.email?.split('@')[0] || 'Usuário'}! 👋
              </h1>
              <p className="text-white/90">
                Bem-vindo ao seu painel de controle
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              R$ {profile?.cashback_balance?.toFixed(2) || '0.00'}
            </h3>
            <p className="text-gray-600 text-sm">Saldo de Cashback</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-600">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              R$ {profile?.total_saved?.toFixed(2) || '0.00'}
            </h3>
            <p className="text-gray-600 text-sm">Economia Total</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">Ativo</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">0</h3>
            <p className="text-gray-600 text-sm">Pedidos Ativos</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <span className="text-sm font-medium text-pink-600">Lista</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">0</h3>
            <p className="text-gray-600 text-sm">Favoritos</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-6 h-6 text-purple-600" />
                Pedidos Recentes
              </h2>
              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Ver todos
              </button>
            </div>

            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Você ainda não fez nenhum pedido</p>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Começar a Comprar
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 text-left">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Meu Perfil</p>
                  <p className="text-sm text-gray-600">Editar informações</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 text-left">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Favoritos</p>
                  <p className="text-sm text-gray-600">Ver lista de desejos</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 text-left">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Resgatar Cashback</p>
                  <p className="text-sm text-gray-600">Usar saldo acumulado</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 text-left">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Configurações</p>
                  <p className="text-sm text-gray-600">Preferências da conta</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-6 h-6 text-purple-600" />
              Recomendações Personalizadas
            </h2>
            <span className="text-sm text-purple-600 font-medium">Powered by IA</span>
          </div>

          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Estamos analisando suas preferências</p>
            <p className="text-sm text-gray-500">
              Faça algumas compras para receber recomendações personalizadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
