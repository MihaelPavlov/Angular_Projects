import { Action } from '@ngrx/store';
import { OperationResult } from 'src/app/models/operation-result.model';
import { IStock } from 'src/shared/services/stock.service';

export const GET_ALL_STOCKS = '[Stock-Assets] Get All Stocks';
export const GET_ALL_STOCKS_SUCCESS = '[Stock-Assets] Get All Stocks Success';
export const GET_ALL_STOCKS_ERROR = '[Stock-Assets] Get All Stocks Error';


// without the readonly on the type the reducers doesn't work correctly
export class GetAllStocks implements Action {
  readonly type = GET_ALL_STOCKS;

  constructor(public payload: { pagination: Pagination }) {}
}

export class GetAllStocksSuccess implements Action {
  readonly type = GET_ALL_STOCKS_SUCCESS;

  constructor(public payload: { stocks: IStock[] }) {}
}

export class GetAllStocksError implements Action {
  readonly type = GET_ALL_STOCKS_ERROR;

  constructor(public payload: { operationResult: OperationResult | null}) {}
}
export type StocksActions = GetAllStocks  | GetAllStocksError | GetAllStocksSuccess;

export interface Pagination {
  pageSize: number;
  pageNumber: number;
}

