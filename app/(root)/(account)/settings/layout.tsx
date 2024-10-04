import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="space-y-8">
      <div className="border-b border-gray-300 pb-5">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Settings
        </h3>
      </div>
      <div className="mx-auto max-w-md">{children}</div>
    </div>
  );
}
