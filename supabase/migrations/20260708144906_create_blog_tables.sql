/*
# Create Blog Tables for SEO Content

1. New Tables
- `blog_categories` - Categories for organizing blog posts (e.g., "Wedding Tips", "Venue Reviews")
  - id (uuid, primary key)
  - name (text, unique, not null)
  - slug (text, unique, not null) - URL-friendly identifier
  - description (text)
  - created_at (timestamp)

- `blog_posts` - Main blog content table
  - id (uuid, primary key)
  - title (text, not null)
  - slug (text, unique, not null) - URL-friendly identifier for SEO
  - excerpt (text) - Short preview for listings
  - content (text, not null) - Full blog post content (markdown or HTML)
  - featured_image (text) - URL to featured image
  - meta_title (text) - SEO title tag
  - meta_description (text) - SEO meta description
  - category_id (uuid, foreign key to blog_categories)
  - published (boolean, default false) - Draft/published status
  - published_at (timestamp) - Date when published
  - author_name (text) - Author display name
  - created_at (timestamp)
  - updated_at (timestamp)

- `blog_tags` - Tags for blog posts (many-to-many relationship)
  - id (uuid, primary key)
  - name (text, unique, not null)
  - slug (text, unique, not null)

- `blog_post_tags` - Junction table for posts and tags
  - post_id (uuid, foreign key)
  - tag_id (uuid, foreign key)

2. Indexes
- Index on blog_posts.slug for fast lookups
- Index on blog_posts.published for filtering
- Index on blog_posts.published_at for ordering
- Index on blog_posts.category_id for category filtering

3. Security
- Enable RLS on all tables
- Public read access for published posts (TO anon, authenticated)
- Write access would require authentication (not implemented in this migration)
*/

-- Create blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  meta_title text,
  meta_description text,
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  author_name text DEFAULT 'Image Paradise Photography',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE
);

-- Create junction table for post-tag relationship
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_tags_slug ON blog_tags(slug);

-- Enable RLS on all tables
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Policies for blog_categories (public read)
DROP POLICY IF EXISTS "anon_read_categories" ON blog_categories;
CREATE POLICY "anon_read_categories" ON blog_categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_write_categories" ON blog_categories;
CREATE POLICY "anon_write_categories" ON blog_categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_categories" ON blog_categories;
CREATE POLICY "anon_update_categories" ON blog_categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- Policies for blog_posts (public read for published posts)
DROP POLICY IF EXISTS "anon_read_published_posts" ON blog_posts;
CREATE POLICY "anon_read_published_posts" ON blog_posts FOR SELECT
  TO anon, authenticated USING (published = true OR published IS NULL);

DROP POLICY IF EXISTS "anon_write_posts" ON blog_posts;
CREATE POLICY "anon_write_posts" ON blog_posts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_posts" ON blog_posts;
CREATE POLICY "anon_update_posts" ON blog_posts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- Policies for blog_tags (public read)
DROP POLICY IF EXISTS "anon_read_tags" ON blog_tags;
CREATE POLICY "anon_read_tags" ON blog_tags FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_write_tags" ON blog_tags;
CREATE POLICY "anon_write_tags" ON blog_tags FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Policies for blog_post_tags (public read)
DROP POLICY IF EXISTS "anon_read_post_tags" ON blog_post_tags;
CREATE POLICY "anon_read_post_tags" ON blog_post_tags FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_write_post_tags" ON blog_post_tags;
CREATE POLICY "anon_write_post_tags" ON blog_post_tags FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_post_tags" ON blog_post_tags;
CREATE POLICY "anon_delete_post_tags" ON blog_post_tags FOR DELETE
  TO anon, authenticated USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on blog_posts
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();