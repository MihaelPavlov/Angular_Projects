import { Action } from '@ngrx/store';
import { IInvestment } from '../../models/investment';
import { AddUpdateInvestment } from './models/add-update-investment.interface';
import { ExtendedOperationResult, OperationResult } from 'src/app/models/operation-result.model';

export const ADD_INVESTMENT = '[Investment] Add Investment';
export const ADD_INVESTMENT_SUCCESS = '[Investment] Add Investment Success';
export const ADD_INVESTMENT_ERROR = '[Investment] Add Investment Error';
export const UPDATE_INVESTMENT = '[Investment] Update Investment';
export const UPDATE_INVESTMENT_SUCCESS =
  '[Investment] Update Investment Success';
export const UPDATE_INVESTMENT_ERROR= '[Investment] Update Investment Error';
export const DELETE_INVESTMENT = '[Investment] Delete Investment';
export const DELETE_INVESTMENT_SUCCESS =
  '[Investment] Delete Investment Success';
  export const DELETE_INVESTMENT_ERROR = '[Investment] Delete Investment Error';
export const GET_INVESTMENTS = '[Investment] Get Investments';
export const GET_INVESTMENTS_SUCCESS = '[Investment] Get Investments Success';
export const GET_INVESTMENT_BY_ID = '[Investment] Get Investment By Id';
export const GET_INVESTMENT_BY_ID_SUCCESS =
  '[Investment] Get Investment By Id Success';
export const GET_INVESTMENT_BY_ID_ERROR =
  '[Investment] Get Investment By Id Error';
export const FILTER_INVESTMENTS = '[Investment] Filter Investment';
export const FILTER_INVESTMENTS_SUCCESS =
  '[Investment] Filter Investment Success';

export class AddInvestment implements Action {
  readonly type = ADD_INVESTMENT;

  constructor(public payload: { investment: AddUpdateInvestment | null }) {}
}

export class AddInvestmentSuccess implements Action {
  readonly type = ADD_INVESTMENT_SUCCESS;
}

export class AddInvestmentError implements Action {
  readonly type = ADD_INVESTMENT_ERROR;

  constructor(public payload: { operationResult: OperationResult | null }) {}
}

export class UpdateInvestment implements Action {
  readonly type = UPDATE_INVESTMENT;

  constructor(public payload: { investment: AddUpdateInvestment | null }) {}
}

export class UpdateInvestmentSuccess implements Action {
  readonly type = UPDATE_INVESTMENT_SUCCESS;
}

export class UpdateInvestmentError implements Action {
  readonly type = UPDATE_INVESTMENT_ERROR;

  constructor(public payload: { operationResult: OperationResult | null }) {}
}

export class GetInvestments implements Action {
  public readonly type = GET_INVESTMENTS;

  constructor(public payload: { userId: number }) {}
}

export class GetInvestmentsSuccess implements Action {
  readonly type = GET_INVESTMENTS_SUCCESS;

  constructor(public payload: { investments: IInvestment[] }) {}
}

export class GetInvestmentById implements Action {
  public readonly type = GET_INVESTMENT_BY_ID;

  constructor(public payload: { id: number }) {}
}

export class GetInvestmentByIdSuccess implements Action {
  readonly type = GET_INVESTMENT_BY_ID_SUCCESS;

  constructor(public payload: { investment: IInvestment }) {}
}

export class GetInvestmentByIdError implements Action {
  readonly type = GET_INVESTMENT_BY_ID_ERROR;

  constructor(public payload: { operationResult: OperationResult| null }) {}
}

export class DeleteInvestment implements Action {
  readonly type = DELETE_INVESTMENT;

  constructor(public payload: { id: number; }) {}
}

export class DeleteInvestmentSuccess implements Action {
  readonly type = DELETE_INVESTMENT_SUCCESS;
}

export class DeleteInvestmentError implements Action {
  readonly type = DELETE_INVESTMENT_ERROR;

  constructor(public payload: { operationResult: OperationResult | null }) {}
}

export class FilterInvestment implements Action {
  readonly type = FILTER_INVESTMENTS;

  constructor(
    public payload: {
      userId: number;
      filters: { name: string; value: string }[];
    }
  ) {}
}

export class FilterInvestmentSuccess implements Action {
  readonly type = FILTER_INVESTMENTS_SUCCESS;

  constructor(public payload: { investments: IInvestment[] }) {}
}

export type PortfolioActions =
  | AddInvestment
  | AddInvestmentSuccess
  | AddInvestmentError
  | UpdateInvestment
  | UpdateInvestmentSuccess
  | UpdateInvestmentError
  | GetInvestments
  | GetInvestmentsSuccess
  | GetInvestmentById
  | GetInvestmentByIdSuccess
  | GetInvestmentByIdError
  | DeleteInvestment
  | DeleteInvestmentSuccess
  | DeleteInvestmentError
  | FilterInvestment
  | FilterInvestmentSuccess;
