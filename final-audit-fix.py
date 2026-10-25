from pathlib import Path
import re

HTML_FILES = sorted(Path('.').glob('*.html'))

# 1) Fix validator-sensitive HTML patterns on every generated HTML page.
for path in HTML_FILES:
    s = path.read_text(encoding='utf-8')
    original = s

    # HTML URLs cannot contain literal spaces.
    s = re.sub(
        r'((?:src|poster)\s*=\s*["\'])(images/[^"\']*\s[^"\']*)(["\'])',
        lambda m: m.group(1) + m.group(2).replace(' ', '%20') + m.group(3),
        s,
        flags=re.I,
    )

    # A <source> element must have src. Keep data-src so the existing deferred JS can use it.
    s = re.sub(
        r'<source(\s+data-src=["\']([^"\']+)["\'])(\s+type=["\'][^"\']+["\'])\s*>',
        lambda m: f'<source src="{m.group(2)}" data-src="{m.group(2)}"{m.group(3)}>',
        s,
        flags=re.I,
    )

    # Native buttons do not need role=tab when there is no tabpanel implementation.
    # Removing the redundant role preserves button behavior and clears the validator error.
    s = re.sub(r'(<button\b[^>]*?)\s+role=["\']tab["\']', r'\1', s, flags=re.I)

    if s != original:
        path.write_text(s, encoding='utf-8')

# 2) Final homepage metadata/schema cleanup.
index = Path('index.html')
if index.exists():
    s = index.read_text(encoding='utf-8')
    s = s.replace(
        '<title>Wedding Photographer in Chennai | Image Paradise</title>',
        '<title>Wedding Photographer Chennai | Image Paradise Photography</title>',
    )
    s = re.sub(
        r'<meta name="description" content="[^"]*">',
        '<meta name="description" content="Wedding photography in Chennai, Avadi and Tiruvallur. Explore candid photos, videography packages and book on WhatsApp.">',
        s,
        count=1,
        flags=re.I,
    )
    s = re.sub(
        r'<meta property="og:image" content="[^"]*">',
        '<meta property="og:image" content="https://www.imageparadisephotography.online/images/08.webp">',
        s,
        count=1,
        flags=re.I,
    )
    s = re.sub(
        r'<meta name="twitter:image" content="[^"]*">',
        '<meta name="twitter:image" content="https://www.imageparadisephotography.online/images/08.webp">',
        s,
        count=1,
        flags=re.I,
    )

    # Use the small favicon for the visual loader instead of downloading the oversized source logo.
    s = re.sub(
        r'(<img\s+src=["\'])images/Logo\.png(["\']\s+class=["\']loader-logo)',
        r'\1/favicon.png\2',
        s,
        count=1,
        flags=re.I,
    )

    # Remove any unconfigured Meta Pixel loader; it adds third-party cost without a Pixel ID.
    s = re.sub(
        r'\s*<!-- Meta Pixel - Add your Pixel ID -->\s*<script>.*?</script>\s*',
        '\n',
        s,
        count=1,
        flags=re.I | re.S,
    )

    # Remove the Facebook URL from structured data if no real Facebook profile is configured.
    s = re.sub(r'\s*"https://www\.facebook\.com/imageparadisephotography",?', '', s, flags=re.I)

    # Add sameAs to Organization for entity consistency.
    org_marker = '"@type": "Organization"'
    org_start = s.find(org_marker)
    if org_start >= 0:
        org_end = s.find('</script>', org_start)
        if org_end >= 0:
            org = s[org_start:org_end]
            if '"sameAs"' not in org:
                needle = '"contactPoint": {'
                same_as = '"sameAs": ["https://www.instagram.com/image_paradise_photography/", "https://www.linkedin.com/company/image-paradise/", "https://www.youtube.com/@imageparadisephotography6251"],\n    '
                org = org.replace(needle, same_as + needle, 1)
                s = s[:org_start] + org + s[org_end:]

    index.write_text(s, encoding='utf-8')

print('Final audit fixes applied.')
