import axios from "axios";
import { Upload, X } from "lucide-react";
import React, { useState } from "react";
import { uploadProposal } from "../../../services/contractor/workflow/projectWorkflowServiceEndpoint";

interface UploadProposalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onUploadSuccess: () => void; // Callback to notify parent of successful upload
}

export function UploadProposalModal({
  isOpen,
  onClose,
  projectId,
  onUploadSuccess,
}: UploadProposalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setUploadError("Please select a file.");
      return;
    }

    setIsSubmitting(true);
    setUploadError(null); // Clear any previous upload errors

    try {
      await uploadProposal(projectId, file); // Call the service function
      onUploadSuccess();
      onClose();
    } catch (error: any) { // Type the error as any
      console.error("Error uploading file:", error);
      setUploadError(error.message || "Failed to upload proposal. Please try again."); // Set the error message
      alert(error.message || "Failed to upload proposal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />

        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upload Proposal</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload your proposal file
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500">
                      <span>Choose a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
                  {file && (
                    <p className="text-sm text-gray-900 mt-2">Selected file: {file.name}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
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
                disabled={!file || isSubmitting}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Uploading..." : "Upload Proposal"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}