import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {ICryptoAsset} from "../../models/cryptoAsset";
import * as fromCryptoAssetsActions from "./crypto-assets.actions";

export const adapter = createEntityAdapter<ICryptoAsset>();

export const initialState: CoinsInitialState = adapter.getInitialState({
  isLoading: false,
  error: null
});


export interface CoinsInitialState extends EntityState<ICryptoAsset> {
  isLoading: boolean
  error: string | null
}


export function coinsListReducer(state: CoinsInitialState = initialState, action: fromCryptoAssetsActions.CoinsActions): CoinsInitialState {
  switch (action.type) {
    case fromCryptoAssetsActions.GET_ALL_COINS:
      return {...state, isLoading: true}
    case fromCryptoAssetsActions.GET_ALL_COINS_SUCCESS:
      return adapter.addMany(action.payload.coins, {...state, isLoading: false})
    default:
      return state;
  }
}
