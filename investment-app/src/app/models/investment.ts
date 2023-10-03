import {Currency} from "../../enums/currency.enum";
import {InvestmentType} from "../../enums/investment-type.enum";

export interface IInvestment {
  id?: number
  userId: number
  investmentId: string
  symbol: string
  quantity: number
  purchasePrice: number
  currency: Currency
  investmentType: InvestmentType
}
