import { Slot } from '@radix-ui/react-slot';
import { useFormField } from './form-field';
import { cn } from '@/lib/utils';

export function FormControl({
  className,
  ...props
}: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      data-error={!!error}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      className={cn(
        'data-[error=true]:border-red-700 data-[error=true]:focus:ring-red-700',
        className,
      )}
      {...props}
    />
  );
}
