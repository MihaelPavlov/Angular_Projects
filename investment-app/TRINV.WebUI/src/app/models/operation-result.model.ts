import { InitialException } from './initial-exception.model';
import { ValidationErrors } from './validation-errors.model';

export interface OperationResult {
  initialException: InitialException;
  success: boolean;
  validationErrors: ValidationErrors;
}

export interface ExtendedOperationResult<T> extends OperationResult {
  relatedObject: T;
}
