import { Product } from './types';
import { supabase } from './supabase';

// Converter produto do Supabase para o formato da aplicação
function convertSupabaseProduct(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    price: dbProduct.final_price,
    originalPrice: dbProduct.original_price,
    image: dbProduct.image_url,
    store: dbProduct.source,
    rating: dbProduct.rating,
    reviews: dbProduct.review_count,
    cashback: dbProduct.cashback_percentage,
    freeShipping: true,
    installments: `10x de R$ ${(dbProduct.final_price / 10).toFixed(2)}`,
    category: 'Geral',
    description: dbProduct.description,
  };
}

// Buscar produtos com paginação
export async function getProducts(page: number = 1, limit: number = 12): Promise<{ products: Product[], hasMore: boolean }> {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('in_stock', true)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Erro ao buscar produtos:', error);
      return { products: [], hasMore: false };
    }

    const products = data?.map(convertSupabaseProduct) || [];
    const hasMore = (count || 0) > (page * limit);

    return { products, hasMore };
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return { products: [], hasMore: false };
  }
}

// Buscar produtos com query de texto
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('rating', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }

    return data?.map(convertSupabaseProduct) || [];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

// Buscar produto por ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar produto:', error);
      return null;
    }

    return data ? convertSupabaseProduct(data) : null;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
}

// Buscar favoritos do usuário
export async function getFavorites(userId: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('product_id, products(*)')
      .eq('user_id', userId);

    if (error) {
      console.error('Erro ao buscar favoritos:', error);
      return [];
    }

    return data?.map((fav: any) => convertSupabaseProduct(fav.products)) || [];
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return [];
  }
}

// Adicionar produto aos favoritos
export async function addToFavorites(userId: string, productId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, product_id: productId });

    if (error) {
      console.error('Erro ao adicionar favorito:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    return false;
  }
}

// Remover produto dos favoritos
export async function removeFromFavorites(userId: string, productId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) {
      console.error('Erro ao remover favorito:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    return false;
  }
}

// Autenticação - Login
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erro ao fazer login:', error);
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (error: any) {
    console.error('Erro ao fazer login:', error);
    return { success: false, error: error.message };
  }
}

// Autenticação - Cadastro
export async function signUp(email: string, password: string, fullName: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.error('Erro ao criar conta:', error);
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (error: any) {
    console.error('Erro ao criar conta:', error);
    return { success: false, error: error.message };
  }
}

// Autenticação - Logout
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Erro ao fazer logout:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Erro ao fazer logout:', error);
    return { success: false, error: error.message };
  }
}

// Autenticação - Recuperar senha
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      console.error('Erro ao recuperar senha:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Erro ao recuperar senha:', error);
    return { success: false, error: error.message };
  }
}

// Autenticação - Obter usuário atual
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Erro ao obter usuário:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return null;
  }
}

// Busca por IA (simulada - pode ser integrada com OpenAI depois)
export async function searchWithAI(query: string, type: 'text' | 'voice' | 'image'): Promise<Product[]> {
  // Por enquanto, usa a busca normal
  // TODO: Integrar com OpenAI para busca inteligente
  return searchProducts(query);
}
