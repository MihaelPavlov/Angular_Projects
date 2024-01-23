import { InvestmentType } from 'src/enums/investment-type.enum';

export interface AddUpdateInvestment {
  id?: number;
  assetId?: string;
  name?: string;
  quantity: number;
  purchasePrice: number;
  investmentType?: InvestmentType;
  isFromOutsideProvider?: boolean;
}