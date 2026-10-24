from pathlib import Path
import re
p = Path('index.html')
s = p.read_text(encoding='utf-8')
s = s.replace('Chennai, Tamil Nadu, India', 'No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024')
s = re.sub(r'<label>Email</label>\s*<p>[^<]*</p>', '<label>WhatsApp</label><p>+91 77085 10143</p>', s, count=1, flags=re.I)
s = re.sub(r'<div class="ci-icon">✉</div>', '<div class="ci-icon">💬</div>', s, count=1)
s = re.sub(r'<a[^>]*href=["\']mailto:[^"\']*["\'][^>]*>.*?</a>', '', s, flags=re.I|re.S)
s = re.sub(r'<div class="soc-row">.*?</div>', '''<div class="soc-row">
        <a href="https://www.instagram.com/image_paradise_photography/" class="soc">Instagram</a>
        <a href="https://www.linkedin.com/company/image-paradise/" class="soc">LinkedIn</a>
        <a href="https://www.youtube.com/@imageparadisephotography6251" class="soc">YouTube</a>
      </div>''', s, count=1, flags=re.S)
s = re.sub(r'<a[^>]*>Pinterest</a>', '', s, flags=re.I)
s = s.replace('<div><strong>5.0</strong><span>Google Reviews</span></div>', '<div><strong>Client</strong><span>Reviews &amp; feedback</span></div>')
s = re.sub(r'imageparadise2020@gmail\.com', '', s, flags=re.I)
s = s.replace('Chennai · Available across India &amp; Beyond.', 'Chennai · Tiruvallur · Avadi · Ambattur.')
p.write_text(s, encoding='utf-8')
