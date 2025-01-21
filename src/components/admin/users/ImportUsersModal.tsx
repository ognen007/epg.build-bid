import React, { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import { ImportUserData } from '../../../types/admin';

interface ImportUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (users: ImportUserData[]) => void;
}

export function ImportUsersModal({ isOpen, onClose, onImport }: ImportUsersModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        try {
          const users = validateAndTransformData(results.data);
          onImport(users);
          onClose();
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Invalid file format');
        }
      },
      header: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Import Users</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Upload CSV File</label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".csv"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV file</p>
                </div>
              </div>
              {file && (
                <p className="text-sm text-gray-500">Selected file: {file.name}</p>
              )}
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="ml-2 text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!file}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 disabled:bg-gray-300"
              >
                Import Users
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function validateAndTransformData(data: any[]): ImportUserData[] {
  return data.map((row, index) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'userType'];
    for (const field of requiredFields) {
      if (!row[field]) {
        throw new Error(`Missing ${field} in row ${index + 1}`);
      }
    }

    if (!['admin', 'manager', 'projectspecialist', 'csm', 'estimator'].includes(row.userType)) {
      throw new Error(`Invalid user type in row ${index + 1}`);
    }

    return {
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      userType: row.userType
    };
  });
}