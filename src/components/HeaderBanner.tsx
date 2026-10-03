import React, { useRef } from 'react';
import { Upload, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { getSemestaDefaultHeaderSVG } from '../utils/defaultHeader';

interface HeaderBannerProps {
  headerImageUrl: string;
  primaryColor: string;
  onUpdateHeader: (url: string) => void;
  isEditable?: boolean;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  headerImageUrl,
  primaryColor,
  onUpdateHeader,
  isEditable = true
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateHeader(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetDefault = () => {
    onUpdateHeader(getSemestaDefaultHeaderSVG(primaryColor));
  };

  return (
    <div className="relative group w-full mb-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/svg+xml"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header Container */}
      <div className="w-full rounded-md overflow-hidden bg-white border border-slate-200 shadow-xs">
        <img
          src={headerImageUrl || getSemestaDefaultHeaderSVG(primaryColor)}
          alt="Semesta School Header"
          className="w-full h-auto max-h-[140px] object-cover"
        />
      </div>

      {/* Hover action bar (hidden in print) */}
      {isEditable && (
        <div className="no-print absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/85 backdrop-blur-xs text-white px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-2 text-xs">
          <span className="text-slate-300 font-medium flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5" /> School Header
          </span>
          <div className="w-px h-3.5 bg-slate-700" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 hover:text-amber-300 transition-colors font-semibold"
            title="Upload custom PNG school header"
          >
            <Upload className="w-3 h-3" /> Upload PNG
          </button>
          <div className="w-px h-3.5 bg-slate-700" />
          <button
            type="button"
            onClick={handleResetDefault}
            className="flex items-center gap-1 hover:text-amber-300 transition-colors font-semibold"
            title="Reset to Semesta official header"
          >
            <RotateCcw className="w-3 h-3" /> Reset Default
          </button>
        </div>
      )}
    </div>
  );
};
