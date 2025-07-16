'use client';

import * as React from 'react';
import {
  FormProvider,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export const Form = FormProvider;

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);
