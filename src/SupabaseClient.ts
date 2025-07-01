// src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sldznvzicixnlqqnrdys.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZHpudnppY2l4bmxxcW5yZHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNjExNzEsImV4cCI6MjA2NjgzNzE3MX0.C2htIfBP7PMNH56GBi6imYBpSC4WGcRv8njnOiiGXQE";

export const supabase = createClient(supabaseUrl, supabaseKey);
