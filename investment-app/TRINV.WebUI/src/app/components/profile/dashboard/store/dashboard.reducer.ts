import { OperationResult } from 'src/app/models/operation-result.model';
import { IDashboardInvestmentInfo } from '../models/dashboard-investment-info.interace';
import { IDashboardInvestmentsPercent } from '../models/dashboard-investments-in-percents.interface';
import * as dashboardActions from './dashboard.actions';

export interface DashboardInitialState {
  info: IDashboardInvestmentInfo | null;
  investmentsInPercents: IDashboardInvestmentsPercent[];
  isLoadingInfo: boolean;
  isLoadingInvestmentsInPercents: boolean;
  error: OperationResult | null;
}

const initialState: DashboardInitialState = {
  info: null,
  investmentsInPercents: [],
  isLoadingInfo: false,
  isLoadingInvestmentsInPercents: false,
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
    default:
      return state;
  }
}
