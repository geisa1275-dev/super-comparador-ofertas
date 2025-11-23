import { supabase } from './supabase';
import { Product } from './types';

// Adicionar produto ao carrinho
export async function addToCart(userId: string, productId: string, quantity: number = 1) {
  // Verificar se já existe no carrinho
  const { data: existing } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (existing) {
    // Atualizar quantidade
    const { data, error } = await supabase
      .from('cart')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    // Adicionar novo item
    const { data, error } = await supabase
      .from('cart')
      .insert({
        user_id: userId,
        product_id: productId,
        quantity,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// Obter itens do carrinho
export async function getCartItems(userId: string) {
  const { data, error } = await supabase
    .from('cart')
    .select(`
      *,
      products (*)
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

// Remover item do carrinho
export async function removeFromCart(cartItemId: string) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartItemId);

  if (error) throw error;
}

// Atualizar quantidade no carrinho
export async function updateCartQuantity(cartItemId: string, quantity: number) {
  const { data, error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('id', cartItemId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Limpar carrinho
export async function clearCart(userId: string) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId);

  if (error) throw error;
}

// Criar pedido (checkout unificado)
export async function createOrder(userId: string, cartItems: any[]) {
  // Calcular totais
  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.products.final_price * item.quantity);
  }, 0);

  const cashbackEarned = cartItems.reduce((sum, item) => {
    return sum + (item.products.cashback * item.quantity);
  }, 0);

  // Criar pedido
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_amount: totalAmount,
      cashback_earned: cashbackEarned,
      status: 'pending',
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Criar itens do pedido
  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.products.final_price,
    cashback: item.products.cashback,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  // Limpar carrinho
  await clearCart(userId);

  return order;
}

// Obter pedidos do usuário
export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Obter detalhes de um pedido
export async function getOrderDetails(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('id', orderId)
    .single();

  if (error) throw error;
  return data;
}
