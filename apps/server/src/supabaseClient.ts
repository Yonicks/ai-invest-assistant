import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://dwaznxvowkdkztjxtxkp.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3YXpueHZvd2tka3p0anh0eGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NTYyNTcsImV4cCI6MjA2NDEzMjI1N30.GrYuQdr0cR-p-Q2qI3J0c2uKbU9DF7PwPo6OfBmP3LM';

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
