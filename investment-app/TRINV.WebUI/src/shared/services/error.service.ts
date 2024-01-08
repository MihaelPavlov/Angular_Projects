import {Injectable} from "@angular/core";

interface Error {
  field: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public getErrorsFromValidationAttribute(errors: { [field: string]: string[] }): Error[] {
    let result: Error[] = [];
    let keys = Object.keys(errors)
    let values = Object.values(errors);

    for (let i = 0; i < values.length; i++) {
      result.push({field: keys[i], message: (values[i] as [])[i - i]})
    }

    return result;
  }
}
