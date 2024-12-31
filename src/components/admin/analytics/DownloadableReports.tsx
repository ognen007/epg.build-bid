import React from 'react';
import { FileText, Download, FileSpreadsheet } from 'lucide-react';

const reports = [
  {
    id: '1',
    name: 'Monthly Revenue Report',
    description: 'Detailed breakdown of revenue streams and growth metrics',
    format: 'PDF',
    icon: FileText
  },
  {
    id: '2',
    name: 'User Activity Analysis',
    description: 'User engagement metrics and platform usage statistics',
    format: 'Excel',
    icon: FileSpreadsheet
  },
  {
    id: '3',
    name: 'Project Performance',
    description: 'Completion rates, delays, and satisfaction scores',
    format: 'PDF',
    icon: FileText
  }
];

export function DownloadableReports() {
  const handleDownload = (reportId: string) => {
    // Handle report download
    console.log('Downloading report:', reportId);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h2>
      
      <div className="space-y-4">
        {reports.map((report) => (
          <div 
            key={report.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <report.icon className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(report.id)}
                className="flex items-center text-orange-600 hover:text-orange-700"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}