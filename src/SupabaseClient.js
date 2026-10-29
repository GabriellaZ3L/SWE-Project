// Create client function from Supabase
import {createClient} from "@supabase/supabase-js"

// Public use of this function without calling the library
export const supabase= createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
