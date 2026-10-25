from pathlib import Path
import re

# Use the pre-generated WebP versions already present in /images whenever they exist.
# This keeps the original high-resolution source files in the repository while
# serving much smaller browser assets, especially on mobile.
HTML_FILES = sorted(Path('.').glob('*.html'))

for path in HTML_FILES:
    text = path.read_text(encoding='utf-8')

    def replace_image(match):
        attr, quote, filename = match.group(1), match.group(2), match.group(3)
        source = Path(filename)
        webp = source.with_suffix('.webp')
        if webp.exists() and webp.name != source.name:
            return f'{attr}{quote}{webp.as_posix()}{quote}'
        return match.group(0)

    # Rewrite only local image src attributes. Leave external URLs and other links untouched.
    updated = re.sub(
        r'(\bsrc\s*=\s*)(["\'])(images/[^"\']+\.(?:jpg|JPG|jpeg|JPEG|png|PNG))\2',
        replace_image,
        text,
    )

    if updated != text:
        path.write_text(updated, encoding='utf-8')
        print(f'Optimized image references: {path}')
