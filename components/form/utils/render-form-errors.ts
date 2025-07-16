import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export function renderFormErrors<
  TFieldValues extends FieldValues = FieldValues,
>(
  fieldErrors: Record<string, string[] | undefined>,
  form: UseFormReturn<TFieldValues>,
) {
  const errorsArray = Object.entries(fieldErrors);
  if (errorsArray.length > 0) {
    for (const [path, value] of errorsArray) {
      const message = value?.at(0);
      form.setError(
        path as Path<TFieldValues>,
        { message },
        { shouldFocus: true },
      );
    }
  }
}
