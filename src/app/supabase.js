import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ifebmnbwsakifyhdrota.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZWJtbmJ3c2FraWZ5aGRyb3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDI1MDAsImV4cCI6MjA2MDM3ODUwMH0.PRrbOmtT8igi92UCOFcp9t9n5IHfqrxYy00j3oMyNUs';

export const supabase = createClient(supabaseUrl, supabaseKey);