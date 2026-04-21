import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment.")
}

const defaultUrl = 'https://rxaqqzjslkptlptwecnt.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4YXFxempzbGtwdGxwdHdlY250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1OTQxNjQsImV4cCI6MjA5MjE3MDE2NH0.0fFwcM2TpsHp9HuENLj-vfSfhRl2_YNoqaY5AxpZmAc';

export const supabase = createClient(supabaseUrl || defaultUrl, supabaseAnonKey || defaultKey)
