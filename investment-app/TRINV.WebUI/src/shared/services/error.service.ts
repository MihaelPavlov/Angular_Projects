import { Injectable } from '@angular/core';

interface Error {
  propertyName: string;
  errorMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {

}
