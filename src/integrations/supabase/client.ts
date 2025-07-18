import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xagcekrcxrfbjuyzbsfk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZ2Nla3JjeHJmYmp1eXpic2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzcxMzUsImV4cCI6MjA2ODM1MzEzNX0.i_5JLNEEqKgdFrWux0SLa1DY7iRn0fcK0WfHaKEMai4';

export const supabase = createClient(supabaseUrl, supabaseKey);