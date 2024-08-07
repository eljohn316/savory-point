import React from 'react';
import { Label } from '@/components/ui/label';

interface InputWrapperProps {
  className?: string;
  label: string;
  children: React.ReactElement;
  error?: string;
}

export function InputWrapper({
  className,
  label,
  children,
  error
}: InputWrapperProps) {
  const id = children.props.id;

  if (!id) throw new Error('Field must have an id attribute');

  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
