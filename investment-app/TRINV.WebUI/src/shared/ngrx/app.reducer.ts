import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../environments/environment";
import {InvestmentInitialState, investmentsListReducer} from "../../app/components/portfolio/portfolio.reducer";
import {NewsInitialState, newsListReducer} from "../../app/components/news/new.reducer";
import {CoinsInitialState, coinsListReducer} from "../../app/components/crypto_assets/crypto-assets.reducer";
import { StockInitialState, stocksListReducer } from "src/app/components/stock_asset/stock_asset.reducer";
import { DashboardInitialState, dashboardListReducer } from "src/app/components/profile/dashboard/store/dashboard.reducer";

export interface AppState {
  portfolio: InvestmentInitialState;
  news: NewsInitialState;
  coins: CoinsInitialState;
  stocks: StockInitialState;
  dashboard: DashboardInitialState
}

export const reducers: ActionReducerMap<AppState, any> = {
  portfolio: investmentsListReducer,
  news: newsListReducer,
  coins: coinsListReducer,
  stocks: stocksListReducer,
  dashboard: dashboardListReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    // console.log('state before -> ', state);
    // console.log('action -> ', action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<AppState, any>[] = !environment.production ? [logger] : []
