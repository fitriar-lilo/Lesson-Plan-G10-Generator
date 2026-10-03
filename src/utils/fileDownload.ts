/**
 * Multi-strategy file download utility that works reliably across
 * desktop browsers, mobile devices, and sandboxed iframes.
 */
export function downloadBlob(blob: Blob, filename: string): string {
  const blobUrl = URL.createObjectURL(blob);

  // Strategy 1: Programmatic anchor download
  try {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 2000);
  } catch (err) {
    console.warn('Programmatic anchor download threw error, trying fallback:', err);
  }

  // Strategy 2: FileReader Data URI fallback if blob is small (<15MB)
  if (blob.size < 15 * 1024 * 1024) {
    try {
      const reader = new FileReader();
      reader.onload = function () {
        if (typeof reader.result === 'string') {
          const dataLink = document.createElement('a');
          dataLink.href = reader.result;
          dataLink.download = filename;
          dataLink.style.display = 'none';
          document.body.appendChild(dataLink);
          dataLink.click();
          setTimeout(() => {
            if (document.body.contains(dataLink)) {
              document.body.removeChild(dataLink);
            }
          }, 2000);
        }
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      console.warn('Data URL download fallback failed:', e);
    }
  }

  return blobUrl;
}
