import { cn } from '@/lib/utils';
import { useFormField } from './form-field';

export function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-xs text-red-700', className)}
      {...props}>
      {body}
    </p>
  );
}
