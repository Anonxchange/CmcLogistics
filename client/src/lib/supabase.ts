import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vzeinmxefruvfqquviyb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6ZWlubXhlZnJ1dmZxcXV2aXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwODU0ODgsImV4cCI6MjA3NDY2MTQ4OH0.BddUK1ZWh5srwWrZwym_hEVGcnkhkxQY_6Wt1sB7AJc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript
export type DatabaseTables = {
  users: {
    Row: {
      id: number;
      email: string;
      password: string;
      created_at: string;
    };
    Insert: {
      id?: number;
      email: string;
      password: string;
      created_at?: string;
    };
    Update: {
      id?: number;
      email?: string;
      password?: string;
      created_at?: string;
    };
  };
  admin_users: {
    Row: {
      id: number;
      username: string;
      email: string;
      password: string;
      role: string;
      is_active: boolean;
      created_at: string;
    };
    Insert: {
      id?: number;
      username: string;
      email: string;
      password: string;
      role?: string;
      is_active?: boolean;
      created_at?: string;
    };
    Update: {
      id?: number;
      username?: string;
      email?: string;
      password?: string;
      role?: string;
      is_active?: boolean;
      created_at?: string;
    };
  };
  shipments: {
    Row: {
      id: number;
      tracking_number: string;
      sender_name: string;
      sender_email: string;
      sender_phone: string | null;
      sender_address: string;
      recipient_name: string;
      recipient_email: string;
      recipient_phone: string | null;
      recipient_address: string;
      service_type: string;
      package_type: string;
      weight: string | null;
      dimensions: string | null;
      status: string;
      estimated_delivery: string | null;
      actual_delivery: string | null;
      cost: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: number;
      tracking_number: string;
      sender_name: string;
      sender_email: string;
      sender_phone?: string | null;
      sender_address: string;
      recipient_name: string;
      recipient_email: string;
      recipient_phone?: string | null;
      recipient_address: string;
      service_type: string;
      package_type: string;
      weight?: string | null;
      dimensions?: string | null;
      status?: string;
      estimated_delivery?: string | null;
      actual_delivery?: string | null;
      cost?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: number;
      tracking_number?: string;
      sender_name?: string;
      sender_email?: string;
      sender_phone?: string | null;
      sender_address?: string;
      recipient_name?: string;
      recipient_email?: string;
      recipient_phone?: string | null;
      recipient_address?: string;
      service_type?: string;
      package_type?: string;
      weight?: string | null;
      dimensions?: string | null;
      status?: string;
      estimated_delivery?: string | null;
      actual_delivery?: string | null;
      cost?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  tracking_updates: {
    Row: {
      id: number;
      shipment_id: number;
      status: string;
      location: string;
      description: string;
      timestamp: string;
      updated_by: number | null;
    };
    Insert: {
      id?: number;
      shipment_id: number;
      status: string;
      location: string;
      description: string;
      timestamp?: string;
      updated_by?: number | null;
    };
    Update: {
      id?: number;
      shipment_id?: number;
      status?: string;
      location?: string;
      description?: string;
      timestamp?: string;
      updated_by?: number | null;
    };
  };
};

export type Database = {
  public: {
    Tables: DatabaseTables;
  };
};