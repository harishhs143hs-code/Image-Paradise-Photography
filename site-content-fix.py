from pathlib import Path

# Blog index: keep canonical URL consistent with the sitemap.
p = Path('blog.html')
s = p.read_text(encoding='utf-8')
s = s.replace('https://www.imageparadisephotography.online/blog"', 'https://www.imageparadisephotography.online/blog.html"')
p.write_text(s, encoding='utf-8')

# Pre-wedding page: keep canonical consistent with the sitemap filename.
p = Path('pre-wedding-shoot-chennai.html')
s = p.read_text(encoding='utf-8')
s = s.replace('https://www.imageparadisephotography.online/pre-wedding-shoot-chennai"', 'https://www.imageparadisephotography.online/pre-wedding-shoot-chennai.html"')
p.write_text(s, encoding='utf-8')

# Dynamic blog post: provide crawlable fallback metadata and content before Supabase hydrates it.
p = Path('blog-post.html')
s = p.read_text(encoding='utf-8')
s = s.replace('<title>Blog Post | Image Paradise Photography</title>', '<title>Wedding Photography Tips &amp; Guides | Image Paradise Photography</title>')
s = s.replace('<meta name="description" content="">', '<meta name="description" content="Wedding photography tips, planning guides and practical advice for couples in Chennai, Tiruvallur, Avadi and Tamil Nadu.">')
s = s.replace('<meta property="og:url" content="">', '<meta property="og:url" content="https://www.imageparadisephotography.online/blog-post.html">')
s = s.replace('<meta property="og:title" content="">', '<meta property="og:title" content="Wedding Photography Tips &amp; Guides | Image Paradise Photography">')
s = s.replace('<meta property="og:description" content="">', '<meta property="og:description" content="Wedding photography tips, planning guides and practical advice for couples in Chennai and Tamil Nadu.">')
s = s.replace('<meta property="og:image" content="">', '<meta property="og:image" content="https://www.imageparadisephotography.online/images/08.jpg">')
if 'rel="canonical" href="https://www.imageparadisephotography.online/blog-post.html"' not in s:
    s = s.replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="index, follow">\n  <link rel="canonical" href="https://www.imageparadisephotography.online/blog-post.html">', 1)
fallback = '''<article id="postContent">
    <header class="post-header">
      <span class="post-category">Wedding Photography Guide</span>
      <h1>Wedding Photography Tips &amp; Guides for Chennai Couples</h1>
      <div class="post-meta"><span>Image Paradise Photography</span></div>
    </header>
    <div class="post-content">
      <p>Image Paradise Photography shares practical wedding photography advice for couples planning celebrations in Chennai, Tiruvallur, Avadi and nearby Tamil Nadu locations. Explore guidance on candid photography, traditional coverage, pre-wedding sessions, wedding videography, albums and planning your photography timeline.</p>
      <h2>What should you ask a wedding photographer?</h2>
      <p>Ask about date availability, coverage hours, number of photographers and videographers, edited photographs, albums, delivery timelines, travel and the final package price. Clear requirements help couples compare packages and plan the wedding day smoothly.</p>
      <h2>How can couples prepare for wedding photography?</h2>
      <p>Share the ceremony schedule, important family groups, preferred photography style and venue details before the event. A short planning discussion can help the photography team anticipate key rituals and meaningful moments.</p>
      <p>Explore <a href="/wedding-photographer-chennai">wedding photography in Chennai</a>, <a href="/wedding-videography-chennai">wedding videography in Chennai</a> and <a href="/pre-wedding-shoot-chennai.html">pre-wedding photography in Chennai</a>.</p>
    </div>
  </article>'''
old = '<article id="postContent">\n    <div class="post-loading">Loading article...</div>\n  </article>'
if old in s:
    s = s.replace(old, fallback, 1)
p.write_text(s, encoding='utf-8')
