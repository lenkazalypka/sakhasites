import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = url && key ? createClient(url, key) : null;

export async function saveLead(row: Record<string, unknown>) {
  if (!supabase) return;
  try {
    await supabase.from('leads').insert(row);
  } catch (err) {
    console.warn('Supabase lead save failed:', err);
  }
}
