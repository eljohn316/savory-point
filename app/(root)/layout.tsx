import { Navigation } from '@/components/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div className="my-10 px-6 lg:px-8">{children}</div>
    </>
  );
}
