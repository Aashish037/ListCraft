import { createClient } from '@supabase/supabase-js'
import { config } from '../config/supabase-config'

const supabaseUrl = config.SUPABASE_URL
const supabaseAnonKey = config.SUPABASE_ANON_KEY

// Create supabase client with explicit options to avoid URL parsing issues
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false, // Disable session persistence for React Native
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Types based on your schema
export type Item = {
  id: number
  name: string
  quantity: number
  unit: string
}

export type ItemInsert = {
  name: string
  quantity: number
  unit: string
}

export type ItemUpdate = {
  name?: string
  quantity?: number
  unit?: string
}