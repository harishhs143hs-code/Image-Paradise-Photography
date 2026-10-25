from pathlib import Path
import re
import struct

HTML_FILES = sorted(Path('.').glob('*.html'))


def image_size(path: Path):
    """Return (width, height) for common raster formats without third-party packages."""
    try:
        with path.open('rb') as f:
            header = f.read(32)
            if header.startswith(b'\x89PNG\r\n\x1a\n'):
                return struct.unpack('>II', header[16:24])
            if header[:2] == b'\xff\xd8':
                f.seek(2)
                while True:
                    marker = f.read(1)
                    if not marker:
                        break
                    if marker != b'\xff':
                        continue
                    while marker == b'\xff':
                        marker = f.read(1)
                    if marker in (b'\xd8', b'\xd9'):
                        continue
                    raw = f.read(2)
                    if len(raw) != 2:
                        break
                    length = struct.unpack('>H', raw)[0]
                    if marker[0] in range(0xC0, 0xC4) or marker[0] in range(0xC5, 0xC8) or marker[0] in range(0xC9, 0xCC) or marker[0] in range(0xCD, 0xD0):
                        data = f.read(5)
                        return struct.unpack('>HH', data[1:5])
                    f.seek(max(0, length - 2), 1)
            if header[:4] == b'RIFF' and header[8:12] == b'WEBP':
                if header[12:16] == b'VP8X' and len(header) >= 30:
                    w = 1 + int.from_bytes(header[24:27], 'little')
                    h = 1 + int.from_bytes(header[27:30], 'little')
                    return w, h
    except (OSError, ValueError, struct.error):
        pass
    return None


def webp_for(path_str: str):
    source = Path(path_str)
    if source.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
        return None
    webp = source.with_suffix('.webp')
    return webp if webp.exists() else None


def rewrite_src(match):
    prefix, quote, filename = match.group(1), match.group(2), match.group(3)
    webp = webp_for(filename)
    if webp:
        filename = webp.as_posix()
    # HTML URLs must not contain literal spaces.
    filename = filename.replace(' ', '%20')
    return f'{prefix}{quote}{filename}{quote}'


for path in HTML_FILES:
    text = path.read_text(encoding='utf-8')
    original = text

    # Serve pre-generated WebP assets while keeping original high-resolution sources in the repo.
    text = re.sub(
        r'(\bsrc\s*=\s*)(["\'])(images/[^"\']+\.(?:jpg|JPG|jpeg|JPEG|png|PNG))\2',
        rewrite_src,
        text,
    )

    # Also optimize video poster images; the poster can become the mobile LCP resource.
    def rewrite_poster(match):
        prefix, quote, filename = match.group(1), match.group(2), match.group(3)
        webp = webp_for(filename)
        if webp:
            filename = webp.as_posix()
        return f'{prefix}{quote}{filename.replace(" ", "%20")}{quote}'

    text = re.sub(
        r'(\bposter\s*=\s*)(["\'])(images/[^"\']+\.(?:jpg|JPG|jpeg|JPEG|png|PNG))\2',
        rewrite_poster,
        text,
    )

    # Validator requires a real src on <source>. Keep data-src for the deferred loader,
    # but provide the same URL as src so the HTML remains valid.
    text = re.sub(
        r'<source(\s+data-src=["\']([^"\']+)["\'])(\s+type=["\'][^"\']+["\'])\s*>',
        lambda m: f'<source src="{m.group(2)}" data-src="{m.group(2)}"{m.group(3)}>',
        text,
    )

    # Remove literal spaces from any already-optimized logo URL.
    text = text.replace('images/Logo with Text Png.webp', 'images/Logo%20with%20Text%20Png.webp')
    text = text.replace('images/Logo with Text Png.png', 'images/Logo%20with%20Text%20Png.png')

    # Add lazy loading to below-the-fold images and async decoding. Keep branding/hero imagery eager.
    def image_attrs(match):
        tag = match.group(0)
        lower = tag.lower()
        if 'loading=' not in lower and not any(token in lower for token in ('loader-logo', 'hero', 'brand', 'logo')):
            tag = tag[:-1] + ' loading="lazy">'
        if 'decoding=' not in lower:
            tag = tag[:-1] + ' decoding="async">'
        return tag

    text = re.sub(r'<img\b[^>]*>', image_attrs, text, flags=re.I)

    # Add explicit dimensions where they can be read from local assets and are absent.
    def add_dimensions(match):
        tag = match.group(0)
        if 'width=' in tag.lower() or 'height=' in tag.lower():
            return tag
        src_match = re.search(r'\bsrc=["\']([^"\']+)["\']', tag, re.I)
        if not src_match:
            return tag
        src = src_match.group(1).split('?', 1)[0].split('#', 1)[0]
        if not src.startswith('images/'):
            return tag
        local = Path(src.replace('%20', ' '))
        if not local.exists():
            return tag
        size = image_size(local)
        if not size:
            return tag
        w, h = size
        return tag[:-1] + f' width="{w}" height="{h}">' 

    text = re.sub(r'<img\b[^>]*>', add_dimensions, text, flags=re.I)

    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f'Optimized image delivery/HTML: {path}')
