import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../environments/environment";
import {InvestmentInitialState, investmentsListReducer} from "../app/components/portfolio/portfolio.reducer";
import {NewsInitialState, newsListReducer} from "../app/components/news/new.reducer";

export interface AppState {
  portfolio: InvestmentInitialState;
  news: NewsInitialState
}

export const reducers: ActionReducerMap<AppState, any> = {
  portfolio: investmentsListReducer,
  news: newsListReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before -> ', state);
    console.log('action -> ', action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<AppState, any>[] = !environment.production ? [logger] : []
