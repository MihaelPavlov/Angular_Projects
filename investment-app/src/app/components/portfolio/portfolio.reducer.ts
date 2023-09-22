import * as portfolioActions from "./portfolio.action";
import {IInvestment} from "../../models/investment";
import {ActionReducerMap} from "@ngrx/store";

const initialState: InvestmentInitialState = {
  investments: [],
  isLoading: false,
}

export interface InvestmentInitialState {
  investments: IInvestment[];
  isLoading: boolean
}

export function investmentsListReducer(state: InvestmentInitialState = initialState, action: portfolioActions.PortfolioActions): InvestmentInitialState {
  switch (action.type) {
    case portfolioActions.ADD_INVESTMENT:
      return {
        ...state,
        isLoading: true
      }
    case portfolioActions.ADD_INVESTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        investments: [...state.investments, action.payload.investment as IInvestment]
      }
    case portfolioActions.GET_INVESTMENTS:
      return {
        ...state,
        isLoading: true
      };
    case portfolioActions.GET_INVESTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        investments: [...action.payload.investments]
      };
    case portfolioActions.DELETE_INVESTMENT:
      return {
        ...state,
        isLoading: true,
      }
    case portfolioActions.DELETE_INVESTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        investments: [...state.investments.filter(x => x.id !== action.payload.investmentId)]
      }
    case portfolioActions.FILTER_INVESTMENTS:
      return {
        ...state,
        isLoading: true,
      }
    case portfolioActions.FILTER_INVESTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        investments: [...action.payload.investments]
      }
    default :
      return state;
  }
}

export interface AppState {
  portfolio: InvestmentInitialState;
}

export const portfolioReducers: ActionReducerMap<AppState, any> = {
  portfolio: investmentsListReducer
};
