export interface ActionResponse<T> {
  success?: boolean;
  errors?: Partial<Record<keyof T, string | undefined>>;
  message?: string;
}
