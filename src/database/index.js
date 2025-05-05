import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rfluzljvptiotiiwmzvh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmbHV6bGp2cHRpb3RpaXdtenZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MDY1MzgsImV4cCI6MjA2MTk4MjUzOH0.e3aiqQmkBoNWbi1X-DzZCSNL718Urnpvw9ZZrSg-OTE"
);

export default supabase;
