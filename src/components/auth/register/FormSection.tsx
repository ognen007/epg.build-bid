import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      {children}
    </div>
  );
}