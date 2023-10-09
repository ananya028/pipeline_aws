export type FieldValidationError = {
  field: string;
  message: string;
  description: string;
};

export type ApiError = {
  message: string;
  status: number;
  errorCode?: string;
  errors?: FieldValidationError[];
};
