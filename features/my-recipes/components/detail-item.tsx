import { cn } from '@/lib/utils';

type DetailItemProps = {
  label: string;
  content: React.ReactNode;
  className?: string;
};

export function DetailItem({ label, content, className }: DetailItemProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="text-base font-semibold text-gray-900">{label}</div>
      {content}
    </div>
  );
}
