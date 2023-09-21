import {Pipe, PipeTransform} from "@angular/core";
import {getCurrencySymbol} from "../../enums/currency.enum";

@Pipe({
  name: "currencyToSymbol"
})
export class CurrencyToSymbolPipe implements PipeTransform {
  transform(value: number): string {
    return getCurrencySymbol(value);
  }
}
