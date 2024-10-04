import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex items-start justify-center px-4 pb-6 pt-16 lg:px-8">
      {children}
    </div>
  );
}
