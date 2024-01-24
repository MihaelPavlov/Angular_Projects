import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { IStock } from "src/shared/services/stock.service";
import * as fromStockAssetsActions from './stock_asset.actions';
import { OperationResult } from "src/app/models/operation-result.model";

const customSelectId = (entity: IStock) => entity.symbol;

export const adapter = createEntityAdapter<IStock>(
  {selectId: customSelectId}
);

export const initialState: StockInitialState = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export interface StockInitialState extends EntityState<IStock> {
  isLoading: boolean;
  error: OperationResult | null;
}

export function stocksListReducer(
  state: StockInitialState = initialState,
  action: fromStockAssetsActions.StocksActions
): StockInitialState {
  switch (action.type) {
    case fromStockAssetsActions.GET_ALL_STOCKS:
      return { ...state, isLoading: true };
    case fromStockAssetsActions.GET_ALL_STOCKS_SUCCESS:
      return adapter.addMany(action.payload.stocks, {
        ...state,
        isLoading: false,
      });
    case fromStockAssetsActions.GET_ALL_STOCKS_ERROR:
      return { ...state, isLoading: true , error: action.payload.operationResult};
    default:
      return state;
  }
}
