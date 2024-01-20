import { Injectable } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { ExtendedOperationResult, OperationResult } from "src/app/models/operation-result.model";
import * as fromStockAssetsActions from './stock_asset.actions';
import { IStock, StockService } from "src/shared/services/stock.service";

@Injectable()
export class StocksAssetsEffects {
  getCoins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromStockAssetsActions.GET_ALL_STOCKS),
      concatMap((action: fromStockAssetsActions.GetAllStocks) =>
        this.stockService.getAllStock(action.payload.pagination)
      ),
      map((operationResult: ExtendedOperationResult<IStock[]> | null) => {
        console.log("stock effect -> ", operationResult?.relatedObject)
        if (operationResult != null) {
          return new fromStockAssetsActions.GetAllStocksSuccess({
            stocks: operationResult.relatedObject,
          });
        }
        return new fromStockAssetsActions.GetAllStocksError({
          operationResult,
        });
      })
    )
  );

  constructor(private actions$: Actions, private stockService: StockService) {}
}
