import {Currency} from "./currency.enum";

export enum InvestmentType{
  Stock = 0,
  Crypto = 1,
}

export const InvestmentTypeToLabelMapping = {
  [InvestmentType.Stock] : "Stock",
  [InvestmentType.Crypto] : "Crypto",
}
export function getInvestmentTypeLabel(investmentType: number): string {
  switch (investmentType) {
    case InvestmentType.Stock :
      return 'Stock';
    case InvestmentType.Crypto:
      return 'Crypto';
    default:
      return 'Unknown Investment Type';
  }
}
