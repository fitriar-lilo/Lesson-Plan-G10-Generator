import React, { useRef, useState, useEffect } from 'react';
import { X, RotateCcw, Check, Upload, PenTool, Type } from 'lucide-react';
import { getCursiveSignature } from '../utils/defaultSignatures';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  signerName: string;
  signerRole: string;
  currentSignatureUrl: string;
  onSaveSignature: (dataUrl: string) => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  title,
  signerName,
  signerRole,
  onSaveSignature
}) => {
  const [mode, setMode] = useState<'draw' | 'upload' | 'preset'>('draw');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && mode === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = '#1e3a8a';
        }
      }
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSaveDrawn = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSaveSignature(dataUrl);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSaveSignature(event.target.result as string);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsePreset = () => {
    const cursiveUrl = getCursiveSignature(signerName, signerRole);
    onSaveSignature(cursiveUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-xs text-slate-300">{signerName} &bull; {signerRole}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2">
          <button
            type="button"
            onClick={() => setMode('draw')}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold border-b-2 transition-colors ${
              mode === 'draw'
                ? 'border-blue-700 text-blue-800 bg-white rounded-t-md'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-4 h-4" /> Draw Signature
          </button>
          <button
            type="button"
            onClick={() => setMode('preset')}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold border-b-2 transition-colors ${
              mode === 'preset'
                ? 'border-blue-700 text-blue-800 bg-white rounded-t-md'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type className="w-4 h-4" /> Cursive Stylized
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold border-b-2 transition-colors ${
              mode === 'upload'
                ? 'border-blue-700 text-blue-800 bg-white rounded-t-md'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4" /> Upload PNG
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {mode === 'draw' && (
            <div>
              <p className="text-xs text-slate-500 mb-2">
                Use your mouse or touchscreen to draw your signature in the box below:
              </p>
              <div className="border-2 border-dashed border-slate-300 rounded-lg overflow-hidden bg-white shadow-inner flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={420}
                  height={150}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="cursor-crosshair touch-none w-full"
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-red-600 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear Canvas
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!hasDrawn}
                    onClick={handleSaveDrawn}
                    className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-md shadow-xs transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" /> Apply Signature
                  </button>
                </div>
              </div>
            </div>
          )}

          {mode === 'preset' && (
            <div className="text-center py-4">
              <p className="text-xs text-slate-600 mb-4">
                Generate an official digital cursive signature with official stamp line:
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-4 flex items-center justify-center">
                <img
                  src={getCursiveSignature(signerName, signerRole)}
                  alt="Preset Signature"
                  className="h-20 object-contain"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUsePreset}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow-xs transition-colors"
                >
                  <Check className="w-3.5 h-3.5" /> Use Cursive Signature
                </button>
              </div>
            </div>
          )}

          {mode === 'upload' && (
            <div className="text-center py-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition-colors"
              >
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="font-semibold text-sm text-slate-700">Click to select signature file</p>
                <p className="text-xs text-slate-500 mt-1">PNG with transparent background recommended</p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
