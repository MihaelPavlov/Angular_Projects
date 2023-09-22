import {createFeatureSelector, createSelector} from "@ngrx/store";
import {InvestmentInitialState} from "./portfolio.reducer";

export const selectInvestmentState = createFeatureSelector<InvestmentInitialState>('portfolio');
export const selectInvestmentsList = createSelector(selectInvestmentState, (state) => state.investments);
export const selectInvestmentIsLoading = createSelector(selectInvestmentState, (state) => state.isLoading);
