import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUpload({ label, accept, onChange }: FileUploadProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <label className="flex items-center justify-center px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-orange-500">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <div className="text-sm text-gray-600">
            <span className="text-orange-500">Upload a file</span> or drag and drop
          </div>
          <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
        </div>
        <input type="file" className="hidden" accept={accept} onChange={onChange} />
      </label>
    </div>
  );
}