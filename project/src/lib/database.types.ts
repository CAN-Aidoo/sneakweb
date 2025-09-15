export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          sku: string
          name: string
          description: string | null
          price: number
          discount_price: number | null
          brand_id: string | null
          category: string
          materials: string[] | null
          care_instructions: string[] | null
          rating: number | null
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          name: string
          description?: string | null
          price: number
          discount_price?: number | null
          brand_id?: string | null
          category: string
          materials?: string[] | null
          care_instructions?: string[] | null
          rating?: number | null
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          name?: string
          description?: string | null
          price?: number
          discount_price?: number | null
          brand_id?: string | null
          category?: string
          materials?: string[] | null
          care_instructions?: string[] | null
          rating?: number | null
          review_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string | null
          size: string
          color_name: string
          color_hex: string
          image_url: string | null
          stock_quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          size: string
          color_name: string
          color_hex: string
          image_url?: string | null
          stock_quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          size?: string
          color_name?: string
          color_hex?: string
          image_url?: string | null
          stock_quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string | null
          url: string
          alt_text: string | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          url: string
          alt_text?: string | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          url?: string
          alt_text?: string | null
          display_order?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}