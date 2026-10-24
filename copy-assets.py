from pathlib import Path
import shutil

root = Path('.')
dist = root / 'dist'
dist.mkdir(exist_ok=True)
for pattern in ('*.html','*.css','*.js','*.json','*.xml','*.png','*.jpg','*.jpeg','*.webp','*.svg','*.ico'):
    for src in root.glob(pattern):
        shutil.copy2(src, dist / src.name)
for folder in ('images','videos'):
    src = root / folder
    dst = dist / folder
    if src.is_dir():
        shutil.copytree(src, dst, dirs_exist_ok=True)
