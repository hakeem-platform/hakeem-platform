-- Create works table for portfolio items
CREATE TABLE IF NOT EXISTS public.works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  images TEXT[] DEFAULT '{}',
  files TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view works)
CREATE POLICY "works_public_read" ON public.works
  FOR SELECT USING (true);

-- Authenticated users can insert works
CREATE POLICY "works_auth_insert" ON public.works
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Authenticated users can update works
CREATE POLICY "works_auth_update" ON public.works
  FOR UPDATE TO authenticated
  USING (true);

-- Authenticated users can delete works
CREATE POLICY "works_auth_delete" ON public.works
  FOR DELETE TO authenticated
  USING (true);
