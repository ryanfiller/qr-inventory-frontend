import { createClient } from '@supabase/supabase-js'

export default createClient(
  import.meta.env.VITE_SVELTE_APP_SUPABASE_URL,
  import.meta.env.VITE_SVELTE_APP_SUPABASE_ANON_KEY
)