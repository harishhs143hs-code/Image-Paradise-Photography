import React, { useState } from 'react';
import { BlogPost } from '../types';
import { blogCategories, fallbackBlogPosts } from '../data/blogs';

interface BlogListProps {
  onSelectPost: (slug: string) => void;
  onBackToHome: () => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onSelectPost, onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPosts = fallbackBlogPosts.filter((post) => {
    const matchesCat =
      selectedCategory === 'all' || post.categorySlug === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="blog-page" style={{ paddingTop: '100px' }}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <button
          type="button"
          onClick={onBackToHome}
          style={{ background: 'none', border: 'none', color: 'var(--pk)', cursor: 'pointer', padding: 0 }}
        >
          Home
        </button>{' '}
        &gt; <span>Blog</span>
      </nav>

      <section className="blog-hero">
        <h1>Wedding Photography Blog</h1>
        <p>Tips, guides, and inspiration for planning your perfect wedding in Chennai and Tamil Nadu</p>
      </section>

      {/* Category filters */}
      <div className="blog-categories" role="tablist" aria-label="Blog categories">
        {blogCategories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
            role="tab"
            aria-selected={selectedCategory === cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '400px', margin: '0 auto 40px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 18px',
            borderRadius: '999px',
            border: '1.5px solid var(--border)',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div className="blog-grid" id="blogGrid">
        {filteredPosts.length === 0 ? (
          <div className="blog-empty">No articles match your filter.</div>
        ) : (
          filteredPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-image">
                <img src={post.featuredImage} alt={post.title} loading="lazy" />
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-card-category">{post.category}</span>
                  <span className="blog-card-date">{post.publishedAt}</span>
                </div>
                <h2>
                  <button
                    type="button"
                    onClick={() => onSelectPost(post.slug)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      color: 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    {post.title}
                  </button>
                </h2>
                <p>{post.excerpt}</p>
                <button
                  type="button"
                  className="blog-card-link"
                  onClick={() => onSelectPost(post.slug)}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  Read More →
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
};
