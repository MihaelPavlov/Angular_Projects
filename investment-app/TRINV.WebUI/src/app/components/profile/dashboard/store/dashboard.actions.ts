import { Action } from '@ngrx/store';
import { IDashboardInvestmentInfo } from '../models/dashboard-investment-info.interace';
import { OperationResult } from 'src/app/models/operation-result.model';
import { IDashboardInvestmentsPercent } from '../models/dashboard-investments-in-percents.interface';
import { InvestmentType } from 'src/enums/investment-type.enum';
import { IDashboardInvestmentPerformance } from '../models/dashboard-investment-performance.interface';
import { IDashboardLastInvestment } from '../models/dashboard-last-investment.interface';

export const GET_DASHBOARD_INVESTMENTS_INFO = '[Dashboard] Investment Info';
export const GET_DASHBOARD_INVESTMENTS_INFO_SUCCESS =
  '[Dashboard] Investment Info Success';
export const GET_DASHBOARD_INVESTMENTS_INFO_FAILED =
  '[Dashboard] Investment Info Failed';

export const GET_DASHBOARD_INVESTMENT_PERFORMANCE_LIST =
  '[Dashboard] Investment Performance List';
export const GET_DASHBOARD_INVESTMENT_PERFORMANCE_LIST_SUCCESS =
  '[Dashboard] Investment Performance List Success';
export const GET_DASHBOARD_INVESTMENT_PERFORMANCE_LIST_FAILED =
  '[Dashboard] Investment Performance List Failed';

export const GET_DASHBOARD_INVESTMENTS_IN_PERCENTS =
  '[Dashboard] Investment In Percents';
export const GET_DASHBOARD_INVESTMENTS_IN_PERCENTS_SUCCESS =
  '[Dashboard] Investment In Percents Success';
export const GET_DASHBOARD_INVESTMENTS_IN_PERCENTS_FAILED =
  '[Dashboard] Investment In Percents Failed';

export const GET_DASHBOARD_LAST_INVESTMENTS = '[Dashboard] Last Investments';
export const GET_DASHBOARD_LAST_INVESTMENTS_SUCCESS =
  '[Dashboard] Last Investments Success';
export const GET_DASHBOARD_LAST_INVESTMENTS_FAILED =
  '[Dashboard] Last Investments Failed';

export class GetDashboardInvestmentInfo implements Action {
  readonly type = GET_DASHBOARD_INVESTMENTS_INFO;

  constructor(public payload: { investmentType: InvestmentType }) {}
}

export class GetDashboardInvestmentInfoSuccess implements Action {
  readonly type = GET_DASHBOARD_INVESTMENTS_INFO_SUCCESS;

  constructor(public payload: { investmentsInfo: IDashboardInvestmentInfo }) {}
}

export class GetDashboardInvestmentInfoFailed implements Action {
  readonly type = GET_DASHBOARD_INVESTMENTS_INFO_FAILED;

  constructor(public payload: { operationResult: OperationResult | null }) {}
}

export class GetDashboardInvestmentInPecents implements Action {
  readonly type = GET_DASHBOARD_INVESTMENTS_IN_PERCENTS;

  constructor(public payload: { investmentType: InvestmentType }) {}
}

export class GetDashboardInvestmentInPecentsSuccess implements Action {
  readonly type = GET_DASHBOARD_INVESTMENTS_IN_PERCENTS_SUCCESS;

  constructor(
    public payload: { invesmentsInPercents: IDashboardInvestmentsPercent[] }
  ) {}
}

export class GetDashboardInvestmentInPecentsFailed implements Action {
  readonly type = GET_DASHBOARD_INVESTMENTS_IN_PERCENTS_FAILED;

  constructor(public payload: { operationResult: OperationResult | null }) {}
}

export class GetDashboardInvestmentPerformanceList implements Action {
  readonly type = GET_DASHBOARD_INVESTMENT_PERFORMANCE_LIST;

  constructor(public payload: { investmentType: InvestmentType }) {}
}

export class GetDashboardInvestmentPerformanceListSuccess implements Action {
  readonly type = GET_DASHBOARD_INVESTMENT_PERFORMANCE_LIST_SUCCESS;

  constructor(
    public payload: {
      invesmentPerformanceList: IDashboardInvestmentPerformance[];
    }
  ) {}
}

export class GetDashboardInvestmentPerformanceListFailed implements Action {
  readonly type = GET_DASHBOARD_INVESTMENT_PERFORMANCE_LIST_FAILED;

  constructor(public payload: { operationResult: OperationResult | null }) {}
}

export class GetDasboardLastInvestments implements Action {
  readonly type = GET_DASHBOARD_LAST_INVESTMENTS;

  constructor(public payload: { investmentType: InvestmentType }) {}
}

export class GetDasboardLastInvestmentsSuccess implements Action {
  readonly type = GET_DASHBOARD_LAST_INVESTMENTS_SUCCESS;

  constructor(
    public payload: {
      lastInvestments: IDashboardLastInvestment[];
    }
  ) {}
}

export class GetDasboardLastInvestmentsFailed implements Action {
  readonly type = GET_DASHBOARD_LAST_INVESTMENTS_FAILED;

  constructor(public payload: { operationResult: OperationResult | null }) {}
}

export type DashboardActions =
  | GetDashboardInvestmentInfo
  | GetDashboardInvestmentInfoSuccess
  | GetDashboardInvestmentInfoFailed
  | GetDashboardInvestmentInPecents
  | GetDashboardInvestmentInPecentsSuccess
  | GetDashboardInvestmentInPecentsFailed
  | GetDashboardInvestmentPerformanceList
  | GetDashboardInvestmentPerformanceListSuccess
  | GetDashboardInvestmentPerformanceListFailed
  | GetDasboardLastInvestments
  | GetDasboardLastInvestmentsSuccess
  | GetDasboardLastInvestmentsFailed;
