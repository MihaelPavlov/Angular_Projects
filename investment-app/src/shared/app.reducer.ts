import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../environments/environment";
import {InvestmentInitialState, investmentsListReducer} from "../app/components/portfolio/portfolio.reducer";

export interface AppState {
  portfolio: InvestmentInitialState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  portfolio: investmentsListReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before -> ', state);
    console.log('action -> ', action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<AppState, any>[] = !environment.production ? [logger] : []
