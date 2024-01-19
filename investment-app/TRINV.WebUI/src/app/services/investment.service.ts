import { Injectable } from '@angular/core';
import { IInvestment } from '../models/investment';
import { Observable } from 'rxjs';
import { RestApiService } from '../../shared/services/rest-api.service';
import {
  ExtendedOperationResult,
  OperationResult,
} from '../models/operation-result.model';
import { AddUpdateInvestment } from '../components/portfolio/models/add-update-investment.interface';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  constructor(private restApiService: RestApiService) {}

  getInvestments(): Observable<ExtendedOperationResult<IInvestment[]>> {
    return this.restApiService.get<ExtendedOperationResult<IInvestment[]>>(
      `/investments`
    );
  }

  // TODO: Implement real filter: Currently the filter is working like
  //  (searching for records which contains all the fields) Not contains at the moment the filter is working with exact field value
  //  Example: investmentName -> test will return only the records with Investment Name test. If we have test2, will not be returned.
  filterInvestments(
    filters: { name: string; value: string }[],
    userId: number
  ): Observable<IInvestment[]> {
    let queryString = filters
      .filter(
        (item) =>
          item.value !== null && item.value !== undefined && item.value !== ''
      ) // Remove empty values
      .map(
        (item) =>
          `${encodeURIComponent(item.name)}=${encodeURIComponent(item.value)}`
      )
      .join('&');

    return this.restApiService.get<IInvestment[]>(
      `investments?userId=${userId}&${queryString}`
    );
  }

  getInvestmentById(
    id: number
  ): Observable<ExtendedOperationResult<IInvestment> | null> {
    return this.restApiService.get<ExtendedOperationResult<IInvestment> | null>(
      `/investments/${id}`
    );
  }

  create(
    newInvestment: AddUpdateInvestment
  ): Observable<OperationResult | null> {
    console.log('add -> ', newInvestment);

    return this.restApiService.post<OperationResult>(
      '/investments',
      newInvestment
    );
  }

  update(
    updatedInvestment: AddUpdateInvestment
  ): Observable<OperationResult | null> {
    return this.restApiService.put(`/investments`, updatedInvestment);
  }

  delete(id: number): Observable<OperationResult> {
    console.log("id delete -> ", id);
    
    return this.restApiService.delete<OperationResult>(`/investments/${id}`);
  }
}
