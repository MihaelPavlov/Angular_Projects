import {Injectable} from "@angular/core";
import {IInvestment} from "../models/investment";
import {Currency} from "../../enums/currency.enum";
import {InvestmentType} from "../../enums/investment-type.enum";
import {BehaviorSubject, defaultIfEmpty, delay, map, Observable, tap, timeout} from "rxjs";
import {RestApiService} from "../../lib/services/rest-api.service";

@Injectable({
  providedIn: "root"
})
export class InvestmentService {
  private investmentSubject$ = new BehaviorSubject<IInvestment[]>([]);
  public investment$ = this.investmentSubject$.asObservable();

  private investmentForUpdateSubject$ = new BehaviorSubject<IInvestment | null>(null);
  public investmentForUpdate$ = this.investmentForUpdateSubject$.asObservable();

  constructor(private restApiService: RestApiService) {

  }

  getInvestments(): void {
    this.restApiService.get<IInvestment[]>('investments')
      .subscribe(result => {
        console.log('From get investments', result)
        this.investmentSubject$.next(result)
      });
  }

  getInvestmentById(id: number): void {
    this.restApiService.get<IInvestment | null>(`investments/${id}`).subscribe((result: any  )=>{
      this.investmentForUpdateSubject$.next(result);
    })
  }

  create(investmentName: string, symbol: string, quantity: number,
         purchasePrice: number, currency: Currency, investmentType: InvestmentType): void {

    const id = investments.reduce((max, investment) => {
      return investment.id > max ? investment.id : max;
    }, -1) + 1;

    let newInvestment: IInvestment = {
      id,
      investmentName,
      symbol,
      quantity,
      purchasePrice,
      currency,
      investmentType
    };

    investments.push(newInvestment);
    this.investmentSubject$.next([...investments]);
  }

  update(id: number, investmentName: string, symbol: string, quantity: number,
         purchasePrice: number, currency: Currency, investmentType: InvestmentType): void {
    let updatedInvestment: IInvestment = {
      id,
      investmentName,
      symbol,
      quantity,
      purchasePrice,
      currency,
      investmentType
    };

    const index = investments.findIndex(investment => investment.id === id);

    if (index !== -1) {
      investments[index] = updatedInvestment;
      this.investmentSubject$.next([...investments]);
    }
  }
}

const investments: IInvestment[] = [
  {
    id: 1,
    investmentName: "Tesla",
    symbol: "TSI",
    quantity: 0.25,
    purchasePrice: 80,
    currency: Currency.Euro,
    investmentType: InvestmentType.Stock
  },
  {
    id: 2,
    investmentName: "Microsoft",
    symbol: "MST",
    quantity: 1,
    purchasePrice: 213,
    currency: Currency.Dollar,
    investmentType: InvestmentType.Stock
  },
  {
    id: 3,
    investmentName: "SP500",
    symbol: "SP",
    quantity: 2.43,
    purchasePrice: 165,
    currency: Currency.BulgarianLev,
    investmentType: InvestmentType.Stock
  }
]
