import {createFeatureSelector, createSelector} from "@ngrx/store";
import {adapter, CoinsInitialState} from "./crypto-assets.reducer";

export const selectCoinsState = createFeatureSelector<CoinsInitialState>('coins');
export const selectCoinList = createSelector(selectCoinsState,(state)=> adapter.getSelectors().selectAll(state));
export const selectIsLoading = createSelector(selectCoinsState,(state)=> state.isLoading);
export const selectError = createSelector(selectCoinsState,(state)=> state.error);
