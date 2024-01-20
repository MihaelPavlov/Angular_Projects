import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { ExtendedOperationResult } from 'src/app/models/operation-result.model';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/components/stock_asset/stock_asset.actions';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private restApiService: RestApiService) {}

  getAllStock(pagination: Pagination): Observable<ExtendedOperationResult<IStock[]> | null> {
    console.log("get all stocks");
    
    return this.restApiService.post<ExtendedOperationResult<IStock[]>>(
      '/stock',
      pagination
    );
  }
}

export interface IStock {
  symbol: string;
  exchange: string;
  exchangeShortName: string;
  price: number;
  name: string;
  type: string;
}
