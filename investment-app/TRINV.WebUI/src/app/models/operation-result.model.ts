import { InitialException } from "./initial-exception.model";
import { ValidationErrors } from "./validation-errors.model";

export interface OperationResult<T> {
  relatedObject: T;
  initialException: InitialException;
  success: boolean;
  validationErrors: ValidationErrors;
}
