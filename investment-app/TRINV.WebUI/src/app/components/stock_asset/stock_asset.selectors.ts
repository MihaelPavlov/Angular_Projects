import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StockInitialState, adapter } from "./stock_asset.reducer";

export const selectStocksState =
  createFeatureSelector<StockInitialState>('stocks');
  
export const selectStocksList = createSelector(selectStocksState, (state) =>
  adapter.getSelectors().selectAll(state)
);
export const selectIsLoading = createSelector(
  selectStocksState,
  (state) => state.isLoading
);
export const selectError = createSelector(selectStocksState, (state) => state.error);
