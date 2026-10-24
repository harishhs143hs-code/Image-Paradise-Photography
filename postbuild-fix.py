from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')
s = s.replace('<h1>Wedding Photographer in Chennai for Candid, Traditional &amp; Cinematic Wedding Stories</h1>', '<h2>Wedding Photographer in Chennai for Candid, Traditional &amp; Cinematic Wedding Stories</h2>')
s = s.replace('.ai-seo-content h1{', '.ai-seo-content h2{')
p.write_text(s, encoding='utf-8')
