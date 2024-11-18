import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '@env';

const supabase_url =  SUPABASE_URL;
const supabase_key = SUPABASE_KEY;

export const supabase = createClient(supabase_url, supabase_key);

