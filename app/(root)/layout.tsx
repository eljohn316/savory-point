import { validateRequest } from '@/lib/auth';
import { Navigation } from '@/components/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const { user } = await validateRequest();

  return (
    <>
      <header className="border-b border-gray-200 px-6 py-4 shadow lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Navigation user={user} />
        </div>
      </header>
      <div className="px-6 py-8 lg:px-8">{children}</div>
    </>
  );
}
