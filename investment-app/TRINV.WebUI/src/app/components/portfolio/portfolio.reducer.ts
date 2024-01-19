import * as portfolioActions from "./portfolio.action";
import {IInvestment} from "../../models/investment";
import { OperationResult } from "src/app/models/operation-result.model";

const initialState: InvestmentInitialState = {
  investments: [],
  isLoading: false,
  investment: null,
  error: null
}

export interface InvestmentInitialState {
  investments: IInvestment[];
  isLoading: boolean;
  investment: IInvestment | null;
  error: OperationResult | null;
}

export function investmentsListReducer(state: InvestmentInitialState = initialState, action: portfolioActions.PortfolioActions): InvestmentInitialState {
  switch (action.type) {
    case portfolioActions.ADD_INVESTMENT:
      return {
        ...state,
        isLoading: true,
      };
    case portfolioActions.ADD_INVESTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case portfolioActions.ADD_INVESTMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.operationResult,
      };
    case portfolioActions.UPDATE_INVESTMENT:
      return {
        ...state,
        isLoading: true,
      };
    case portfolioActions.UPDATE_INVESTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case portfolioActions.UPDATE_INVESTMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.operationResult,
      };
    case portfolioActions.GET_INVESTMENTS:
      return {
        ...state,
        isLoading: true,
      };
    case portfolioActions.GET_INVESTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        investments: [...action.payload.investments],
      };
    case portfolioActions.GET_INVESTMENT_BY_ID:
      return {
        ...state,
        isLoading: true,
      };
    case portfolioActions.GET_INVESTMENT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        investment: action.payload.investment,
      };
    case portfolioActions.GET_INVESTMENT_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.operationResult,
      };
    case portfolioActions.DELETE_INVESTMENT:
      return {
        ...state,
        isLoading: true,
      };
    case portfolioActions.DELETE_INVESTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case portfolioActions.DELETE_INVESTMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.operationResult
      };
    case portfolioActions.FILTER_INVESTMENTS:
      return {
        ...state,
        isLoading: true,
      };
    case portfolioActions.FILTER_INVESTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        investments: [...action.payload.investments],
      };
    default:
      return state;
  }
}
