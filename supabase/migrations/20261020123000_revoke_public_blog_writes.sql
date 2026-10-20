-- Remove the permissive public write policies from the original blog schema migration.
-- Public/anonymous clients should only be able to read published content.
-- Administrative writes should use a trusted server-side service role, never a browser key.

DROP POLICY IF EXISTS "anon_write_categories" ON blog_categories;
DROP POLICY IF EXISTS "anon_update_categories" ON blog_categories;
DROP POLICY IF EXISTS "anon_write_posts" ON blog_posts;
DROP POLICY IF EXISTS "anon_update_posts" ON blog_posts;
DROP POLICY IF EXISTS "anon_write_tags" ON blog_tags;
DROP POLICY IF EXISTS "anon_write_post_tags" ON blog_post_tags;
DROP POLICY IF EXISTS "anon_delete_post_tags" ON blog_post_tags;

