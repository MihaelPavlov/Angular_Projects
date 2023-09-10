import {Injectable} from "@angular/core";
import {IInvestment} from "../models/investment";
import {Currency} from "../../enums/currency.enum";
import {InvestmentType} from "../../enums/investment-type.enum";
import {BehaviorSubject, take,} from "rxjs";
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
    this.restApiService.get<IInvestment[]>('440/investments')
      .subscribe(result => {
        console.log('From get investments', result)
        this.investmentSubject$.next(result)
      });
  }

  getInvestmentById(id: number): void {
    this.restApiService.get<IInvestment | null>(`investments/${id}`).subscribe((result: any) => {
      this.investmentForUpdateSubject$.next(result);
    })
  }

  create(newInvestment: IInvestment): void {
    this.restApiService.post<{ investmentId: number }>('investments', newInvestment)
      .subscribe({
        next: response => {
          this.getInvestments()
          console.log('Sucessfully', response)
        },
        error: response => {
          console.log('error', response)
        }
      })
  }

  update(updatedInvestment: IInvestment): void {

    this.restApiService.put(`investments/${updatedInvestment.id}`, updatedInvestment)
      .pipe(take(1))
      .subscribe({
        next: response => {
          // show success toast message
          this.getInvestments();

          console.log("succesfully", response)
        },
        error: response => {
          // show error toast message
          console.log('error from put', response)
        }
      })
  }

  delete(id: number): void {
    this.restApiService.delete(`investments/${id}`,).subscribe({
      next: response => {
        console.log("Success deletion", response);
        this.getInvestments();
      },
      error: response => {
        console.log("Failed deletion", response);
      }
    })
  }
}
