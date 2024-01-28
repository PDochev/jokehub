import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qdcokqivexfcxotuivnx.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY_ID;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
