import React, { useState } from 'react';
import {
  Download,
  FileText,
  Printer,
  Copy,
  Check,
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { copyFormattedDocumentToClipboard } from '../utils/copyHelper';
import { printLessonPlan } from '../utils/printHelper';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileType: 'docx' | 'pdf' | 'clipboard';
  filename: string;
  downloadUrl?: string;
  fileSize?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  fileType,
  filename,
  downloadUrl,
  fileSize
}) => {
  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const success = await copyFormattedDocumentToClipboard('printable-lesson-plan');
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    printLessonPlan('printable-lesson-plan');
    setTimeout(() => setIsPrinting(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/40 border border-blue-400/30 flex items-center justify-center">
              {fileType === 'docx' ? (
                <FileText className="w-5 h-5 text-blue-300" />
              ) : (
                <Download className="w-5 h-5 text-emerald-300" />
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Lesson Plan Export Ready</h3>
              <p className="text-xs text-blue-200">Semesta Official 0580 Template</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
            <div className="p-1 bg-emerald-600 text-white rounded-full mt-0.5">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-xs text-emerald-950">
              <p className="font-bold">
                {fileType === 'docx' ? 'Microsoft Word (.docx)' : 'A4 Vector PDF'} document generated!
              </p>
              <p className="text-[11px] text-emerald-800 mt-0.5 truncate">
                File: <strong>{filename}</strong> {fileSize ? `(${fileSize})` : ''}
              </p>
            </div>
          </div>

          {/* Primary Action Button (Direct Download Link) */}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download={filename}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-98"
            >
              <Download className="w-4 h-4 text-blue-200" />
              <span>Click to Save {filename.slice(0, 30)}...</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-300 ml-1" />
            </a>
          )}

          {/* Fast Clipboard Copy Alternative for Google Docs & Word */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Google Docs &amp; Word 1-Click Paste:
              </span>
              {copied && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  ✓ Copied!
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Copy the full colored table with headers, WALT/WILF, and 5E meetings directly to your clipboard, then press <strong>Ctrl+V</strong> inside Google Docs or MS Word.
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className={`w-full py-2 px-3 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-colors ${
                copied
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-2xs'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-slate-500" />}
              {copied ? 'Copied to Clipboard! Ready to Paste' : 'Copy Formatted Document for Google Docs / Word'}
            </button>
          </div>

          {/* Print / Save as PDF Fallback */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={handlePrint}
              disabled={isPrinting}
              className="text-xs font-bold text-slate-700 hover:text-blue-700 flex items-center gap-1.5 py-1 px-2 rounded hover:bg-slate-100 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              {isPrinting ? 'Opening Print Dialog...' : 'Open Browser Print / Save to PDF'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
