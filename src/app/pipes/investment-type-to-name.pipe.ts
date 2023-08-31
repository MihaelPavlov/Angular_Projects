import {Pipe, PipeTransform} from "@angular/core";
import {getInvestmentTypeLabel} from "../../enums/investment-type.enum";

@Pipe({
  name: "investmentTypeToName"
})
export class InvestmentTypeToNamePipe implements  PipeTransform{
  transform(value: number): string{
    return getInvestmentTypeLabel(value);
  }
}
