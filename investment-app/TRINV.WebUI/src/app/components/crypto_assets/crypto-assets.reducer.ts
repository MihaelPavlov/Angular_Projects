import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as fromCryptoAssetsActions from './crypto-assets.actions';
import { IDigitalCurrency } from 'src/app/models/digital-currency';
import { OperationResult } from 'src/app/models/operation-result.model';

export const adapter = createEntityAdapter<IDigitalCurrency>();

export const initialState: CoinsInitialState = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export interface CoinsInitialState extends EntityState<IDigitalCurrency> {
  isLoading: boolean;
  error: OperationResult | null;
}

export function coinsListReducer(
  state: CoinsInitialState = initialState,
  action: fromCryptoAssetsActions.CoinsActions
): CoinsInitialState {
  switch (action.type) {
    case fromCryptoAssetsActions.GET_ALL_COINS:
      return { ...state, isLoading: true };
    case fromCryptoAssetsActions.GET_ALL_COINS_SUCCESS:
      return adapter.addMany(action.payload.coins, {
        ...state,
        isLoading: false,
      });
    default:
      return state;
  }
}
