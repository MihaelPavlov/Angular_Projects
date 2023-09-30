import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as fromCryptoAssetsActions from "./crypto-assets.actions";
import {concatMap, map} from "rxjs";
import {CoinResult, CoinService} from "../../../lib/services/coin.service";

@Injectable()
export class CryptoAssetsEffects {

  getCoins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCryptoAssetsActions.GET_ALL_COINS),
      concatMap(x => this.coinService.getAllCoins()),
      map((result: CoinResult) => new fromCryptoAssetsActions.GetAllCoinsSuccess({coins: result.data}))
    ))

  constructor(private actions$: Actions, private coinService: CoinService) {
  }
}
