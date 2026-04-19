import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ruxbkuqxmzpoqlgggano.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_w5YBf9DaKPJmQM9N43YazA_TXsAa8cH'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
