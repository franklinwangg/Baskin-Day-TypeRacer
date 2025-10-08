/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !anon) {
  console.warn('Missing Supabase env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

console.log("Supabase URL:", url);
console.log("Supabase Anon Key:", anon);

export const supabase = createClient(url, anon)
