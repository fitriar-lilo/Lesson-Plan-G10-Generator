import React, { useState } from 'react';
import {
  Download,
  FileText,
  Printer,
  RotateCcw,
  Check,
  Copy,
  BookMarked
} from 'lucide-react';
import { LessonPlanState } from '../types/lessonPlan';
import { exportToDocx } from '../utils/docxExport';
import { exportToPdf } from '../utils/pdfExport';
import { printLessonPlan } from '../utils/printHelper';
import { downloadBlob } from '../utils/fileDownload';
import { ExportModal } from './ExportModal';

interface ExportToolbarProps {
  state: LessonPlanState;
  onResetDefaults: () => void;
  onLoadPreset: (topicId: number, subtopicId: string, meetings: number) => void;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({
  state,
  onResetDefaults,
  onLoadPreset
}) => {
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  // Export success & download link modal
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    fileType: 'docx' | 'pdf';
    filename: string;
    downloadUrl?: string;
    fileSize?: string;
  }>({
    isOpen: false,
    fileType: 'docx',
    filename: ''
  });

  const subtopicsSuffix = (state.selectedSubtopicIds && state.selectedSubtopicIds.length > 0)
    ? state.selectedSubtopicIds.join('-')
    : state.selectedSubtopicId;

  const handleDownloadDocx = async () => {
    try {
      setIsExportingDocx(true);
      const filename = `Semesta_IGCSE_0580_LP_${subtopicsSuffix}_${state.teacherName.replace(/\s+/g, '_')}.docx`;
      const blob = await exportToDocx(state);
      const url = downloadBlob(blob, filename);
      const sizeKb = (blob.size / 1024).toFixed(1) + ' KB';
      
      setModalConfig({
        isOpen: true,
        fileType: 'docx',
        filename,
        downloadUrl: url,
        fileSize: sizeKb
      });
    } catch (err) {
      console.error('Error exporting DOCX:', err);
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      const filename = `Semesta_IGCSE_0580_LP_${subtopicsSuffix}_${state.teacherName.replace(/\s+/g, '_')}.pdf`;
      const result = await exportToPdf(state, filename);
      const sizeKb = (result.blob.size / 1024).toFixed(1) + ' KB';

      setModalConfig({
        isOpen: true,
        fileType: 'pdf',
        filename: result.filename,
        downloadUrl: result.url,
        fileSize: sizeKb
      });
    } catch (err) {
      console.error('Error exporting PDF:', err);
      printLessonPlan('printable-lesson-plan');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleNativePrint = () => {
    setIsPrinting(true);
    printLessonPlan('printable-lesson-plan');
    setTimeout(() => setIsPrinting(false), 2000);
  };

  const handleCopySummary = () => {
    const text = `SEMESTA BILINGUAL BOARDING SCHOOL - LESSON PLAN
Teacher: ${state.teacherName} | Principal: ${state.principalName}
Subject: Cambridge IGCSE Mathematics (0580) - Year 10 (SMA)
Topic: ${state.selectedTopicId}. ${state.customTopicTitle}
Subtopic: ${state.selectedSubtopicId}. ${state.customSubtopicTitle} [${state.customObjectives.join(', ')}]
Duration: ${state.durationPerMeeting} | Meetings: ${state.totalMeetings}

WALT:
${state.walt}

WILF:
${state.wilf.map((w) => `• ${w}`).join('\n')}

SLO:
${state.slo.map((s) => `• ${s}`).join('\n')}

Coursebook: ${state.coursebookReference}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-xs no-print">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: App Brand & Quick Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-900 text-amber-400 flex items-center justify-center font-black text-sm shadow-xs">
              0580
            </span>
            <div>
              <h1 className="font-extrabold text-sm text-slate-900 leading-tight">
                IGCSE 0580 Lesson Plan Generator
              </h1>
              <p className="text-[11px] text-slate-500 font-semibold">
                Semesta SMA &bull; Subtopic(s): {subtopicsSuffix} ({state.totalMeetings} Sesi)
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <BookMarked className="w-3.5 h-3.5 text-blue-700" /> Presets
            </button>

            {showPresets && (
              <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                  Quick Load High-Demand Chapters
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onLoadPreset(14, '14.1', 4);
                    setShowPresets(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-blue-50 rounded-md font-semibold text-slate-800"
                >
                  Topic 14.1: Simultaneous Linear Eq (4 Sesi)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLoadPreset(15, '15.3', 4);
                    setShowPresets(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-blue-50 rounded-md font-semibold text-slate-800"
                >
                  Topic 15.3: Trigonometric Ratios (4 Sesi)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLoadPreset(17, '17.2', 3);
                    setShowPresets(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-blue-50 rounded-md font-semibold text-slate-800"
                >
                  Topic 17.2: Simple & Compound Interest (3 Sesi)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLoadPreset(18, '18.1', 3);
                    setShowPresets(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-blue-50 rounded-md font-semibold text-slate-800"
                >
                  Topic 18.1: Quadratic Curved Graphs (3 Sesi)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLoadPreset(21, '21.1', 3);
                    setShowPresets(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-blue-50 rounded-md font-semibold text-slate-800"
                >
                  Topic 21.1: Working with Ratios (3 Sesi)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLoadPreset(24, '24.2', 4);
                    setShowPresets(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-blue-50 rounded-md font-semibold text-slate-800"
                >
                  Topic 24.2: Probability Tree Diagrams (4 Sesi)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Major Download & Export Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Download DOCX */}
          <button
            type="button"
            disabled={isExportingDocx}
            onClick={handleDownloadDocx}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 rounded-lg shadow-xs transition-colors"
            title="Download formatted Microsoft Word .docx with 2cm margins, Nunito font, and official tables"
          >
            <FileText className="w-4 h-4 text-blue-200" />
            {isExportingDocx ? 'Generating DOCX...' : 'Download as DOCX'}
          </button>

          {/* Download PDF */}
          <button
            type="button"
            disabled={isExportingPdf}
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-lg shadow-xs transition-colors"
            title="Download clean A4 PDF file directly"
          >
            <Download className="w-4 h-4 text-emerald-200" />
            {isExportingPdf ? 'Generating PDF...' : 'Download as PDF'}
          </button>

          {/* Native Print / Save as PDF */}
          <button
            type="button"
            disabled={isPrinting}
            onClick={handleNativePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg border border-slate-300 transition-colors"
            title="Print or Save as PDF using browser vector printer"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            {isPrinting ? 'Opening Print...' : 'Print / Save'}
          </button>

          {/* Copy Summary */}
          <button
            type="button"
            onClick={handleCopySummary}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Copy lesson overview text"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Reset Defaults */}
          <button
            type="button"
            onClick={onResetDefaults}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset to Fitria Rakhmawati & Semesta Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Export Status & Download Link Modal */}
      <ExportModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        fileType={modalConfig.fileType}
        filename={modalConfig.filename}
        downloadUrl={modalConfig.downloadUrl}
        fileSize={modalConfig.fileSize}
      />
    </div>
  );
};
