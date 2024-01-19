import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtendedOperationResult } from 'src/app/models/operation-result.model';
import { RestApiService } from './rest-api.service';
import { IDigitalCurrency } from 'src/app/models/digital-currency';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  constructor(private restApiService: RestApiService) {}

  getAllCoins(): Observable<ExtendedOperationResult<IDigitalCurrency[]>> {
    return this.restApiService.get<ExtendedOperationResult<IDigitalCurrency[]>>(
      '/digitalCurrency'
    );
  }
}