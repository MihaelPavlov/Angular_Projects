import { InvestmentType } from '../../enums/investment-type.enum';

export interface IInvestment {
  id?: number;
  assetId: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  investmentType: InvestmentType;
  createdOn: Date;
}
