/**
 * Copies the formatted lesson plan table directly to the clipboard
 * using both text/html and text/plain MIME types.
 * Pasting into Google Docs or Microsoft Word instantly reproduces
 * the full colored tables, Nunito typography, and Cambridge objectives.
 */
export async function copyFormattedDocumentToClipboard(elementId = 'printable-lesson-plan'): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) return false;

  const htmlContent = element.outerHTML;
  const plainText = element.innerText;

  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const blobHtml = new Blob([htmlContent], { type: 'text/html' });
      const blobText = new Blob([plainText], { type: 'text/plain' });
      const data = [new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })];
      await navigator.clipboard.write(data);
      return true;
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(plainText);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard write failed, trying execCommand fallback:', err);
  }

  // Fallback using document.execCommand('copy')
  try {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection?.removeAllRanges();
    selection?.addRange(range);
    const success = document.execCommand('copy');
    selection?.removeAllRanges();
    return success;
  } catch (e) {
    console.error('All clipboard operations failed:', e);
    return false;
  }
}
