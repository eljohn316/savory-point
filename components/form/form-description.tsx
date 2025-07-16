import { cn } from '@/lib/utils';
import { useFormField } from './form-field';

export function FormDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-[13px] text-gray-500', className)}
      {...props}
    />
  );
}
