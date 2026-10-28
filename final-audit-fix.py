from pathlib import Path
import re

HTML_FILES = sorted(Path('.').glob('*.html'))

for path in HTML_FILES:
    s = path.read_text(encoding='utf-8')
    original = s
    s = re.sub(
        r'((?:src|poster)\s*=\s*["\'])(images/[^"\']*\s[^"\']*)(["\'])',
        lambda m: m.group(1) + m.group(2).replace(' ', '%20') + m.group(3),
        s,
        flags=re.I,
    )
    s = s.replace('/images/08.jpg', '/images/08.webp')
    s = re.sub(
        r'<source(\s+data-src=["\']([^"\']+)["\'])(\s+type=["\'][^"\']+["\'])\s*>',
        lambda m: f'<source src="{m.group(2)}" data-src="{m.group(2)}"{m.group(3)}>',
        s,
        flags=re.I,
    )
    # The portfolio filters are buttons, not a true ARIA tab interface.
    # Remove tab-only semantics so the gallery is not incorrectly exposed as a tabpanel.
    s = re.sub(r'\s+role=["\']tablist["\']', '', s, flags=re.I)
    s = re.sub(r'\s+role=["\']tabpanel["\']', '', s, flags=re.I)
    s = re.sub(r'\s+role=["\']tab["\']', '', s, flags=re.I)
    s = re.sub(r'\s+aria-selected=["\'](?:true|false)["\']', '', s, flags=re.I)
    if s != original:
        path.write_text(s, encoding='utf-8')

index = Path('index.html')
if index.exists():
    s = index.read_text(encoding='utf-8')
    s = s.replace('<title>Wedding Photographer in Chennai | Image Paradise</title>', '<title>Wedding Photographer Chennai | Image Paradise Photography</title>')
    # Keep the homepage description aligned with the branded SEO version in source control.
    s = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="Wedding photography and cinematic wedding films in Chennai, Avadi and Tiruvallur. Explore candid, traditional and pre-wedding packages, real work and WhatsApp booking.">', s, count=1, flags=re.I)
    s = re.sub(r'<meta property="og:image" content="[^"]*">', '<meta property="og:image" content="https://www.imageparadisephotography.online/images/08.webp">', s, count=1, flags=re.I)
    s = re.sub(r'<meta name="twitter:image" content="[^"]*">', '<meta name="twitter:image" content="https://www.imageparadisephotography.online/images/08.webp">', s, count=1, flags=re.I)
    s = s.replace('src="images/Logo.webp"', 'src="/favicon.png"')
    s = s.replace('height="5893" width="4167" src="/favicon.png"', 'width="44" height="44" src="/favicon.png"')
    s = s.replace('width="4167" height="5893" src="/favicon.png"', 'width="44" height="44" src="/favicon.png"')
    s = re.sub(r'\s*<!-- Meta Pixel - Add your Pixel ID -->\s*<script>.*?</script>\s*', '\n', s, count=1, flags=re.I | re.S)
    s = re.sub(r'\s*"https://www\.facebook\.com/imageparadisephotography",?', '', s, flags=re.I)
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
