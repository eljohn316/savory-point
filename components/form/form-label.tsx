import { Label } from '../ui/label';
import { useFormField } from './form-field';

export function FormLabel(props: React.ComponentProps<typeof Label>) {
  const { formItemId } = useFormField();
  return <Label data-slot="form-label" htmlFor={formItemId} {...props} />;
}
