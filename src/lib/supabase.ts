import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos do banco de dados
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
        };
        Update: {
          email?: string;
          full_name?: string;
          avatar_url?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          image_url: string;
          original_price: number;
          final_price: number;
          discount: number;
          cashback: number;
          cashback_percentage: number;
          source: string;
          source_color: string;
          delivery_time: string;
          usp_tag: string;
          rating: number;
          review_count: number;
          in_stock: boolean;
          created_at: string;
        };
      };
      cart: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          total_amount: number;
          cashback_earned: number;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          cashback: number;
        };
      };
    };
  };
}
