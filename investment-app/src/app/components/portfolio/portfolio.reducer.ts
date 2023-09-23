import * as portfolioActions from "./portfolio.action";
import {IInvestment} from "../../models/investment";

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
  error: string | null;
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
    case portfolioActions.UPDATE_INVESTMENT:
      return {
        ...state,
        isLoading: true
      }
    case portfolioActions.UPDATE_INVESTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        investments: [...state.investments.map((i) => i.id === action.payload.investment?.id ? action.payload.investment as IInvestment : i)]
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
    case portfolioActions.GET_INVESTMENT_BY_ID:
      return {
        ...state,
        isLoading: true
      };
    case portfolioActions.GET_INVESTMENT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        investment: action.payload.investment
      };
    case portfolioActions.GET_INVESTMENT_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
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
