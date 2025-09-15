import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = 'https://fcoxftaxlaceukcbbmst.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjb3hmdGF4bGFjZXVrY2JibXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NDY0NTgsImV4cCI6MjA1MTMyMjQ1OH0.orRvhaHKAJ-AIGsqxrVq-LfR0BhjQcxDuElFcz6FOvU';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);