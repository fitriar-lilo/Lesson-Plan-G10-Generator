/**
 * Dedicated print helper that creates an isolated print iframe, copies
 * the application stylesheets and fonts, and invokes the browser print dialog.
 * This works reliably even inside nested iframes and AI Studio preview containers.
 */
export function printLessonPlan(elementId = 'printable-lesson-plan'): void {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with id ${elementId} not found, invoking window.print fallback`);
    window.print();
    return;
  }

  // Remove any previous print frame if present
  const existingFrame = document.getElementById('lesson-plan-print-frame');
  if (existingFrame) {
    existingFrame.remove();
  }

  try {
    const printFrame = document.createElement('iframe');
    printFrame.id = 'lesson-plan-print-frame';
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    printFrame.style.opacity = '0';
    printFrame.style.pointerEvents = 'none';
    printFrame.style.zIndex = '-9999';

    document.body.appendChild(printFrame);

    const frameWindow = printFrame.contentWindow;
    const frameDoc = frameWindow?.document;

    if (!frameDoc || !frameWindow) {
      window.print();
      return;
    }

    // Collect all active styles and links from the current document
    const styleTags = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((el) => el.outerHTML)
      .join('\n');

    // Clone element content
    const contentHtml = element.outerHTML;

    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Semesta School - IGCSE Math 0580 Official Lesson Plan</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
          ${styleTags}
          <style>
            @page {
              size: A4 portrait;
              margin: 20mm; /* Exactly 2.0 cm margins on all sides */
            }
            html, body {
              background: #ffffff !important;
              color: #1e293b !important;
              font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              font-size: 11pt !important;
              line-height: 1.5 !important;
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            #printable-lesson-plan {
              margin: 0 !important;
              padding: 0 !important;
              border: none !important;
              box-shadow: none !important;
              max-width: 100% !important;
              width: 100% !important;
            }
            .no-print {
              display: none !important;
            }
            .page-break-avoid {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
          </style>
        </head>
        <body>
          ${contentHtml}
        </body>
      </html>
    `);
    frameDoc.close();

    // Give iframe time to parse CSS and render base64 SVG images
    setTimeout(() => {
      try {
        frameWindow.focus();
        frameWindow.print();
        // Clean up print iframe after print dialog closes
        setTimeout(() => {
          printFrame.remove();
        }, 3000);
      } catch (err) {
        console.warn('Iframe print error, falling back to window.print():', err);
        window.print();
      }
    }, 450);
  } catch (error) {
    console.warn('Could not initialize print iframe, executing window.print():', error);
    window.print();
  }
}
