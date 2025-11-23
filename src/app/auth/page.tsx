'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sparkles, ShoppingBag } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl mb-4">
            <ShoppingBag className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">SuperShop</h1>
          <p className="text-white/90 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Super Comparador de Ofertas
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo!
            </h2>
            <p className="text-gray-600">
              Entre ou crie sua conta para começar a economizar
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#9333ea',
                    brandAccent: '#7c3aed',
                  },
                },
              },
              className: {
                container: 'auth-container',
                button: 'auth-button',
                input: 'auth-input',
              },
            }}
            providers={['google', 'github']}
            redirectTo={`${window.location.origin}/dashboard`}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'E-mail',
                  password_label: 'Senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre',
                },
                sign_up: {
                  email_label: 'E-mail',
                  password_label: 'Senha',
                  button_label: 'Criar conta',
                  loading_button_label: 'Criando conta...',
                  social_provider_text: 'Cadastrar com {{provider}}',
                  link_text: 'Não tem uma conta? Cadastre-se',
                },
              },
            }}
          />

          {/* Benefits */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Ao criar sua conta você ganha:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>R$ 50 de cashback no primeiro pedido</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Até 15% de cashback em todas as compras</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Checkout unificado de múltiplas lojas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Recomendações personalizadas com IA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 text-sm mt-6">
          Ao continuar, você concorda com nossos{' '}
          <a href="#" className="underline hover:text-white">
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="#" className="underline hover:text-white">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}
