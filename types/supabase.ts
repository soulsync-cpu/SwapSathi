// types/supabase.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Ad {
  id?: string;
  created_at?: string;
  type: string;
  asset: string;
  price: string;
  min_amount: string;
  max_amount: string;
  payment_methods: string[];
  description: string;
  telegram_handle: string;
  user_id?: string;
  title: string;
}
