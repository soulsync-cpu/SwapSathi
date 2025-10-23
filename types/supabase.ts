// types/supabase.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      ads: {
        Row: {
          id: number;
          title: string;
          description: string;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description: string;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string;
          price?: number;
          created_at?: string;
        };
      };
      // add more tables here
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
