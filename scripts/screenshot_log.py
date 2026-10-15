"""Export QA screenshots through free Actions logs, without artifact storage."""
from pathlib import Path
import base64
import io
import zipfile

root=Path(__file__).resolve().parent.parent
files=sorted((root/'qa/screenshots').glob('*.png'))
buffer=io.BytesIO()
with zipfile.ZipFile(buffer,'w',zipfile.ZIP_DEFLATED) as archive:
    for file in files:
        archive.write(file,file.name)
encoded=base64.b64encode(buffer.getvalue()).decode('ascii')
print(f'QA_SCREENSHOTS_BEGIN files={len(files)} bytes={len(buffer.getvalue())}')
for i in range(0,len(encoded),32000):
    print(f'QA_ZIP_PART_{i//32000:04d}:{encoded[i:i+32000]}')
print('QA_SCREENSHOTS_END')
