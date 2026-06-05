import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://vpnjrpipubqexdgpdvog.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwbmpycGlwdWJxZXhkZ3Bkdm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NTAwNDEsImV4cCI6MjA4OTMyNjA0MX0.WgWPQL1Ss97tGeo53pi1yBqHabnTMi8iU1erHOTpD6M";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function saveLead(lead: {
    nome: string;
    email: string;
    telefone: string;
    objetivo: string;
}) {
    const { error } = await supabase.from('leads').insert([lead]);
    if (error) throw error;
    return true;
}
