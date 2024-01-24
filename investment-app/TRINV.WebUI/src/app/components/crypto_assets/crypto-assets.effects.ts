import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromCryptoAssetsActions from './crypto-assets.actions';
import { concatMap, map } from 'rxjs';
import { CoinService } from '../../../shared/services/coin.service';
import { ExtendedOperationResult } from 'src/app/models/operation-result.model';
import { IDigitalCurrency } from 'src/app/models/digital-currency';

@Injectable()
export class CryptoAssetsEffects {
  getCoins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCryptoAssetsActions.GET_ALL_COINS),
      concatMap((_) => this.coinService.getAllCoins()),
      map(
        (result: ExtendedOperationResult<IDigitalCurrency[]>) =>
          new fromCryptoAssetsActions.GetAllCoinsSuccess({
            coins: result.relatedObject,
          })
      )
    )
  );

  constructor(private actions$: Actions, private coinService: CoinService) {}
}
