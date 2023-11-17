import {Injectable} from "@angular/core";
import {IInvestment} from "../models/investment";
import { Observable} from "rxjs";
import {RestApiService} from "../../shared/services/rest-api.service";

@Injectable({
  providedIn: "root"
})
export class InvestmentService {

  constructor(private restApiService: RestApiService) {

  }

  getInvestments(userId: number): Observable<IInvestment[]> {
    return this.restApiService.get<IInvestment[]>(`investments?userId=${userId}`);
  }

  // TODO: Implement real filter: Currently the filter is working like
  //  (searching for records which contains all the fields) Not contains at the moment the filter is working with exact field value
  //  Example: investmentName -> test will return only the records with Investment Name test. If we have test2, will not be returned.
  filterInvestments(filters: { name: string, value: string }[], userId: number): Observable<IInvestment[]> {
    let queryString = filters
      .filter(item => item.value !== null && item.value !== undefined && item.value !== '') // Remove empty values
      .map(item => `${encodeURIComponent(item.name)}=${encodeURIComponent(item.value)}`)
      .join('&');

    return this.restApiService.get<IInvestment[]>(`investments?userId=${userId}&${queryString}`);
  }

  getInvestmentById(id: number): Observable<IInvestment | null> {
    return this.restApiService.get<IInvestment | null>(`investments/${id}`)
  }

  create(newInvestment: IInvestment): Observable<IInvestment | null> {
    return this.restApiService.post<IInvestment>('investments', newInvestment);
  }

  update(updatedInvestment: IInvestment): Observable<IInvestment| null> {
    return this.restApiService.put(`investments/${updatedInvestment.id}`, updatedInvestment);
  }

  delete(id: number): Observable<any> {
    return this.restApiService.delete(`investments/${id}`,);
  }
}
