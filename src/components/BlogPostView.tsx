import React from 'react';
import { BlogPost } from '../types';
import { fallbackBlogPosts } from '../data/blogs';

interface BlogPostViewProps {
  slug: string;
  onBackToBlog: () => void;
  onSelectPost: (slug: string) => void;
  onEnquireNow: () => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({
  slug,
  onBackToBlog,
  onSelectPost,
  onEnquireNow
}) => {
  const post = fallbackBlogPosts.find((p) => p.slug === slug) || fallbackBlogPosts[0];
  const relatedPosts = fallbackBlogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="post-page" style={{ paddingTop: '100px' }}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <button
          type="button"
          onClick={onBackToBlog}
          style={{ background: 'none', border: 'none', color: 'var(--pk)', cursor: 'pointer', padding: 0 }}
        >
          Blog
        </button>{' '}
        &gt; <span>{post.title}</span>
      </nav>

      <article id="postContent">
        <header className="post-header">
          <span className="post-category">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>📅 {post.publishedAt}</span>
            <span>⏱ {post.readingTime || '5 min read'}</span>
            <span>📷 Image Paradise Photography</span>
          </div>
        </header>

        <div className="post-featured-image">
          <img src={post.featuredImage} alt={post.title} loading="lazy" decoding="async" />
        </div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="post-tags">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="post-tag">
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* CTA Box */}
      <div className="post-cta">
        <h3>Ready to Book Your Wedding Photographer?</h3>
        <p>Get in touch with Image Paradise Photography today for candid wedding photography and cinematic films across Chennai.</p>
        <button
          type="button"
          onClick={onEnquireNow}
          style={{
            background: '#fff',
            color: 'var(--pk)',
            padding: '12px 28px',
            borderRadius: '999px',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          Check Date Availability
        </button>
      </div>

      {/* Related Posts */}
      <div className="related-posts">
        <h3>Related Guides</h3>
        <div className="related-grid">
          {relatedPosts.map((rPost) => (
            <div
              key={rPost.id}
              className="related-card"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onSelectPost(rPost.slug);
              }}
              style={{ cursor: 'pointer' }}
            >
              <h4>{rPost.title}</h4>
              <p>{rPost.category} · {rPost.readingTime || '4 min'}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
