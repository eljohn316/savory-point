import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CommentListPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalComments: number;
  onPrev: () => void;
  onNext: () => void;
};

export function CommentListPagination({
  currentPage,
  totalComments,
  totalPages,
  onPrev,
  onNext,
}: CommentListPaginationProps) {
  if (totalComments < 5) return null;

  return (
    <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-4">
      <Button variant="outline" onClick={onPrev} disabled={currentPage <= 1}>
        <ChevronLeftIcon className="-ml-1" />
        Prev
      </Button>
      <Button variant="outline" onClick={onNext} disabled={currentPage >= totalPages}>
        Next
        <ChevronRightIcon className="-mr-1" />
      </Button>
    </div>
  );
}
