import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rxaqqzjslkptlptwecnt.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4YXFxempzbGtwdGxwdHdlY250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1OTQxNjQsImV4cCI6MjA5MjE3MDE2NH0.0fFwcM2TpsHp9HuENLj-vfSfhRl2_YNoqaY5AxpZmAc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
