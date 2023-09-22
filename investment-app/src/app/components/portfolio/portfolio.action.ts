import {Action} from "@ngrx/store";
import {IInvestment} from "../../models/investment";

export const ADD_INVESTMENT = '[Investment] Add Investment';
export const ADD_INVESTMENT_SUCCESS = '[Investment] Add Investment Success';
export const UPDATE_INVESTMENT = '[Investment] Update Investment';
export const UPDATE_INVESTMENT_SUCCESS = '[Investment] Update Investment Success';
export const DELETE_INVESTMENT = '[Investment] Delete Investment'
export const DELETE_INVESTMENT_SUCCESS = '[Investment] Delete Investment Success'
export const GET_INVESTMENTS = '[Investment] Get Investments'
export const GET_INVESTMENTS_SUCCESS = '[Investment] Get Investments Success'
export const FILTER_INVESTMENTS = '[Investment] Filter Investment'
export const FILTER_INVESTMENTS_SUCCESS = '[Investment] Filter Investment Success'

export class AddInvestment implements Action {
  readonly type = ADD_INVESTMENT;

  constructor(public payload: { investment: IInvestment | null }) {
  }
}

export class AddInvestmentSuccess implements Action {
  readonly type = ADD_INVESTMENT_SUCCESS;

  constructor(public payload: { investment: IInvestment | null }) {
  }
}
export class UpdateInvestment implements Action {
  readonly type = UPDATE_INVESTMENT;

  constructor(public payload: { investment: IInvestment | null }) {
  }
}

export class UpdateInvestmentSuccess implements Action {
  readonly type = UPDATE_INVESTMENT_SUCCESS;

  constructor(public payload: { investment: IInvestment | null }) {
  }
}

export class GetInvestments implements Action {
  public readonly type = GET_INVESTMENTS;

  constructor(public payload: { userId: number }) {
  }
}

export class GetInvestmentsSuccess implements Action {
  readonly type = GET_INVESTMENTS_SUCCESS;

  constructor(public payload: { investments: IInvestment[] }) {
  }
}

export class DeleteInvestment implements Action {
  readonly type = DELETE_INVESTMENT;

  constructor(public payload: { investmentId: number, userId: number }) {
  }
}

export class DeleteInvestmentSuccess implements Action {
  readonly type = DELETE_INVESTMENT_SUCCESS;

  constructor(public payload: { investmentId: number }) {
  }
}

export class FilterInvestment implements Action {
  readonly type = FILTER_INVESTMENTS;

  constructor(public payload: { userId: number, filters: { name: string, value: string }[] }) {
  }
}

export class FilterInvestmentSuccess implements Action {
  readonly type = FILTER_INVESTMENTS_SUCCESS;

  constructor(public payload: { investments: IInvestment[] }) {
  }
}

export type PortfolioActions =
  AddInvestment
  | AddInvestmentSuccess
  | UpdateInvestment
  | UpdateInvestmentSuccess
  | GetInvestments
  | GetInvestmentsSuccess
  | DeleteInvestment
  | DeleteInvestmentSuccess
  | FilterInvestment
  | FilterInvestmentSuccess

