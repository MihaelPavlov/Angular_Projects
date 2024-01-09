import {Injectable} from "@angular/core";

interface Error {
  propertyName: string,
  errorMessage: string
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public getErrorsFromValidationAttribute(errors: { [field: string]: string[] }): Error[] {
    let result: Error[] = [];
    let keys = Object.keys(errors)
    let values = Object.values(errors);
    console.log(keys,values);
    for (let i = 0; i < values.length; i++) {
      result.push({propertyName: keys[i], errorMessage: (values[i] as [])[i - i]})
    }

    return result;
  }
}
