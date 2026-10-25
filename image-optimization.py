from pathlib import Path
import re

# Use the pre-generated WebP versions already present in /images whenever they exist.
# This keeps the original high-resolution source files in the repository while
# serving much smaller browser assets, especially on mobile.
IMAGE_DIR = Path('images')
HTML_FILES = [Path('index.html')] + sorted(Path('.').glob('*.html'))

# Avoid duplicate processing of index.html.
seen = set()
for path in HTML_FILES:
    if path in seen or not path.exists():
        continue
    seen.add(path)
    text = path.read_text(encoding='utf-8')

    def replace_image(match):
        prefix, filename = match.group(1), match.group(2)
        # Only rewrite local /images/ assets; leave external URLs untouched.
        if not filename.startswith('images/'):
            return match.group(0)
        source = Path(filename)
        webp = source.with_suffix('.webp')
        if webp.exists() and webp.name != source.name:
            return prefix + webp.as_posix()
        return match.group(0)

    # Covers src="images/..." and src='images/...'.
    updated = re.sub(r'(["\'])(images/[^"\']+\.(?:jpg|JPG|jpeg|JPEG|png|PNG))\1',
                     lambda m: replace_image(m), text)
    if updated != text:
        path.write_text(updated, encoding='utf-8')
        print(f'Optimized image references: {path}')
