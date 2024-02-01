import { OperationResult } from 'src/app/models/operation-result.model';
import { IDashboardInvestmentInfo } from '../models/dashboard-investment-info.interace';
import { IDashboardInvestmentsPercent } from '../models/dashboard-investments-in-percents.interface';
import * as dashboardActions from './dashboard.actions';
import { IDashboardInvestmentPerformance } from '../models/dashboard-investment-performance.interface';
import { IDashboardLastInvestment } from '../models/dashboard-last-investment.interface';

export interface DashboardInitialState {
  info: IDashboardInvestmentInfo | null;
  investmentsInPercents: IDashboardInvestmentsPercent[];
  isLoadingInfo: boolean;
  isLoadingInvestmentsInPercents: boolean;
  investmentPerformanceList: IDashboardInvestmentPerformance[];
  isinvestmentPerformanceListLoading: boolean;
  isLoadingLastInvestments: boolean;
  lastInvestments: IDashboardLastInvestment[];
  error: OperationResult | null;
}

const initialState: DashboardInitialState = {
  info: null,
  investmentsInPercents: [],
  isLoadingInfo: false,
  isLoadingInvestmentsInPercents: false,
  investmentPerformanceList: [],
  isinvestmentPerformanceListLoading: false,
  isLoadingLastInvestments: false,
  lastInvestments: [],
  error: null,
};

export function dashboardListReducer(
  state: DashboardInitialState = initialState,
  action: dashboardActions.DashboardActions
): DashboardInitialState {
  switch (action.type) {
    case dashboardActions.GET_DASHBOARD_INVESTMENTS_INFO:
      return {
        ...state,
        isLoadingInfo: true,
      };
    case dashboardActions.GET_DASHBOARD_INVESTMENTS_INFO_SUCCESS:
      return {
        ...state,
        isLoadingInfo: false,
        info: action.payload.investmentsInfo,
      };
    case dashboardActions.GET_DASHBOARD_INVESTMENTS_INFO_FAILED:
      return {
        ...state,
        isLoadingInfo: false,
        error: action.payload.operationResult,
      };
    case dashboardActions.GET_DASHBOARD_INVESTMENTS_IN_PERCENTS:
      return {
        ...state,
        isLoadingInvestmentsInPercents: true,
      };
    case dashboardActions.GET_DASHBOARD_INVESTMENTS_IN_PERCENTS_SUCCESS:
      return {
        ...state,
        isLoadingInvestmentsInPercents: false,
        investmentsInPercents: action.payload.invesmentsInPercents,
      };
    case dashboardActions.GET_DASHBOARD_INVESTMENTS_IN_PERCENTS_FAILED:
      return {
        ...state,
        isLoadingInvestmentsInPercents: false,
        error: action.payload.operationResult,
      };
    case dashboardActions.GET_DASHBOARD_INVESTMENT_PERFORMANCE_LIST:
      return {
        ...state,
        isinvestmentPerformanceListLoading: true,
      };
    case dashboardActions.GET_DASHBOARD_INVESTMENT_PERFORMANCE_LIST_SUCCESS:
      return {
        ...state,
        isinvestmentPerformanceListLoading: false,
        investmentPerformanceList: action.payload.invesmentPerformanceList,
      };
    case dashboardActions.GET_DASHBOARD_INVESTMENT_PERFORMANCE_LIST_FAILED:
      return {
        ...state,
        isinvestmentPerformanceListLoading: false,
        error: action.payload.operationResult,
      };
      case dashboardActions.GET_DASHBOARD_LAST_INVESTMENTS:
        return {
          ...state,
          isLoadingLastInvestments: true,
        };
      case dashboardActions.GET_DASHBOARD_LAST_INVESTMENTS_SUCCESS:
        return {
          ...state,
          isLoadingLastInvestments: false,
          lastInvestments: action.payload.lastInvestments,
        };
      case dashboardActions.GET_DASHBOARD_LAST_INVESTMENTS_FAILED:
        return {
          ...state,
          isLoadingLastInvestments: false,
          error: action.payload.operationResult,
        };
    default:
      return state;
  }
}
