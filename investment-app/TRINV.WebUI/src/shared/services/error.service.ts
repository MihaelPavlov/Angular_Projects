import { Injectable } from '@angular/core';
import { ValidationError } from 'src/app/models/validationError';

interface Error {
  propertyName: string;
  errorMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {

}
