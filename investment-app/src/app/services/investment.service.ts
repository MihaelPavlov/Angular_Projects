import {Injectable} from "@angular/core";
import {IInvestment} from "../models/investment";
import {BehaviorSubject, Observable, take,} from "rxjs";
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

  getInvestments(userId: number): Observable<IInvestment[]> {
    return this.restApiService.get<IInvestment[]>(`investments?userId=${userId}`);
  }

  fetchInvestments(investments:IInvestment[]): void{
    this.investmentSubject$.next(investments)
  }

  getInvestmentById(id: number): void {
    this.restApiService.get<IInvestment | null>(`investments/${id}`).subscribe((result: any) => {
      this.investmentForUpdateSubject$.next(result);
    })
  }

  create(newInvestment: IInvestment): Observable<{ investmentId: number } | null> {
    return this.restApiService.post<{ investmentId: number }>('investments', newInvestment);
  }

  update(updatedInvestment: IInvestment): Observable<any> {
    return this.restApiService.put(`investments/${updatedInvestment.id}`, updatedInvestment)
      .pipe(take(1))
  }

  delete(id: number): Observable<any> {
    return this.restApiService.delete(`investments/${id}`,);
  }
}
