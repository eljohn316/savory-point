import { Navigation } from '@/components/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-10">{children}</div>;
    </>
  );
}
