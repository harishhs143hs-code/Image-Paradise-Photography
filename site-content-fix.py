from pathlib import Path
import re
import struct

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


# Add intrinsic dimensions to images and lazy-load images outside the initial brand mark.
# This is done at build time so the dimensions exist in the returned HTML before rendering.
def _image_dimensions(image_path):
    try:
        data = image_path.read_bytes()
    except (OSError, ValueError):
        return None
    if data.startswith(b"\x89PNG\r\n\x1a\n") and len(data) >= 24:
        return struct.unpack(">II", data[16:24])
    if data[:6] in (b"GIF87a", b"GIF89a") and len(data) >= 10:
        return struct.unpack("<HH", data[6:10])
    if data[:2] == b"\xff\xd8":
        pos = 2
        sof_markers = {0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF}
        while pos + 4 < len(data):
            if data[pos] != 0xFF:
                pos += 1
                continue
            while pos < len(data) and data[pos] == 0xFF:
                pos += 1
            if pos >= len(data):
                break
            marker = data[pos]
            pos += 1
            if marker in (0xD8, 0xD9, 0x01) or 0xD0 <= marker <= 0xD7:
                continue
            if pos + 2 > len(data):
                break
            segment_length = int.from_bytes(data[pos:pos + 2], "big")
            if marker in sof_markers and pos + 7 <= len(data):
                height = int.from_bytes(data[pos + 3:pos + 5], "big")
                width = int.from_bytes(data[pos + 5:pos + 7], "big")
                if width > 0 and height > 0:
                    return width, height
            if segment_length < 2:
                break
            pos += segment_length
    if len(data) >= 30 and data[:4] == b"RIFF" and data[8:12] == b"WEBP" and data[12:16] == b"VP8X":
        width = 1 + int.from_bytes(data[24:27], "little")
        height = 1 + int.from_bytes(data[27:30], "little")
        if width > 0 and height > 0:
            return width, height
    return None


_image_dimension_cache = {}
_img_tag = re.compile(r"<img\b[^>]*>", re.I | re.S)
_src_attr = re.compile(r"\bsrc\s*=\s*(['\"])(.*?)\1", re.I | re.S)


def _upgrade_image_tag(match):
    tag = match.group(0)
    src_match = _src_attr.search(tag)
    if not src_match:
        return tag
    src = src_match.group(2).split("?", 1)[0].split("#", 1)[0]
    if not src or src.startswith(("data:", "http://", "https://", "//")):
        return tag
    rel_path = src.lstrip("/")
    image_path = Path(rel_path)
    if not image_path.is_file():
        return tag
    cache_key = str(image_path)
    if cache_key not in _image_dimension_cache:
        _image_dimension_cache[cache_key] = _image_dimensions(image_path)
    dimensions = _image_dimension_cache[cache_key]
    if not dimensions:
        return tag
    width, height = dimensions
    if not re.search(r"\bwidth\s*=", tag, re.I):
        tag = re.sub(r"<img\b", '<img width="' + str(width) + '"', tag, count=1, flags=re.I)
    if not re.search(r"\bheight\s*=", tag, re.I):
        tag = re.sub(r"<img\b", '<img height="' + str(height) + '"', tag, count=1, flags=re.I)
    # Keep the nav logo eager; other images can load as they approach the viewport.
    if not re.search(r"\bloading\s*=", tag, re.I) and "Logo with Text Png.png" not in src and "Logo.png" not in src:
        tag = re.sub(r"<img\b", '<img loading="lazy" decoding="async"', tag, count=1, flags=re.I)
    elif not re.search(r"\bdecoding\s*=", tag, re.I):
        tag = re.sub(r"<img\b", '<img decoding="async"', tag, count=1, flags=re.I)
    return tag


# Provide a consistent Organization entity on standard pages that do not already define one.
_org_schema = '''
<script id="site-organization-schema" type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.imageparadisephotography.online/#organization",
  "name": "Image Paradise Photography",
  "url": "https://www.imageparadisephotography.online/",
  "logo": "https://www.imageparadisephotography.online/images/Logo.png",
  "sameAs": [
    "https://www.instagram.com/image_paradise_photography/",
    "https://www.linkedin.com/company/image-paradise/",
    "https://www.youtube.com/@imageparadisephotography6251"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7708510143",
    "contactType": "customer service",
    "availableLanguage": ["English", "Tamil"]
  }
}
</script>
'''

for _html_path in Path(".").glob("*.html"):
    _html = _html_path.read_text(encoding="utf-8")
    _original = _html
    if not re.search(r'"@type"\s*:\s*"Organization"', _html) and 'id="site-organization-schema"' not in _html:
        if "</head>" in _html:
            _html = _html.replace("</head>", _org_schema + "\n</head>", 1)
    _html = _img_tag.sub(_upgrade_image_tag, _html)
    if _html != _original:
        _html_path.write_text(_html, encoding="utf-8")
