import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ruxbkuqxmzpoqlgggano.supabase.co'
const supabaseAnonKey = 'sb_publishable_w5YBf9DaKPJmQM9N43YazA_TXsAa8cH'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
