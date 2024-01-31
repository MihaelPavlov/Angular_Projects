import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap, catchError, tap, delay } from 'rxjs';
import { InvestmentService } from '../../services/investment.service';
import { Injectable } from '@angular/core';
import * as fromInvestments from './portfolio.action';
import { IInvestment } from '../../models/investment';
import { ToastService } from '../../../shared/services/toast.service';
import { ToastType } from '../../models/toast';
import {
  ExtendedOperationResult,
  OperationResult,
} from 'src/app/models/operation-result.model';
import { AddUpdateInvestment } from './models/add-update-investment.interface';

@Injectable()
export class InvestmentEffects {
  getInvestments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.GET_INVESTMENTS),
      switchMap((data: fromInvestments.GetInvestments) => {
        return this.investmentService.getInvestments();
      }),
      map((operationResult: ExtendedOperationResult<IInvestment[]>) => {
        return new fromInvestments.GetInvestmentsSuccess({
          investments: operationResult.relatedObject,
        });
      })
    )
  );

  getInvestmentById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.GET_INVESTMENT_BY_ID),
      switchMap((data: fromInvestments.GetInvestmentById) =>
        this.investmentService.getInvestmentById(data.payload.id).pipe(
          map(
            (operationResult: ExtendedOperationResult<IInvestment> | null) => {
              if (operationResult == null) {
                this.toastService.error({
                  message: 'Something get wrong',
                  type: ToastType.Error,
                });
                return new fromInvestments.GetInvestmentByIdError({
                  operationResult,
                });
              } else if (!operationResult.success) {
                this.toastService.error({
                  message: operationResult.initialException.message,
                  type: ToastType.Error,
                });
                return new fromInvestments.GetInvestmentByIdError({
                  operationResult,
                });
              } else {
                return new fromInvestments.GetInvestmentByIdSuccess({
                  investment: operationResult.relatedObject,
                });
              }
            }
          )
        )
      )
    )
  );

  addInvestment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.ADD_INVESTMENT),
      switchMap((data: fromInvestments.AddInvestment) => {
        return this.investmentService
          .create(data.payload.investment as AddUpdateInvestment)
          .pipe(
            map((operationResult: OperationResult | null) => {
              if (!operationResult?.success) {
                this.toastService.error({
                  message: 'Something get wrong',
                  type: ToastType.Error,
                });
                return new fromInvestments.AddInvestmentError({
                  operationResult,
                });
              }
              return new fromInvestments.AddInvestmentSuccess();
            }),
            tap(() =>
              this.toastService.success({
                message: 'Investment is tracked',
                type: ToastType.Success,
              })
            ),
            catchError((error) => {
              console.log('------------------------- error ', error);

              this.toastService.error({
                message: 'Something get wrong',
                type: ToastType.Error,
              });
              return of({ type: 'Failed', payload: error });
            })
          );
      })
    )
  );

  addInvestmentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.ADD_INVESTMENT_SUCCESS),
      switchMap((_) => this.investmentService.getInvestments()),
      map((operationResult: ExtendedOperationResult<IInvestment[]>) => {
        return new fromInvestments.GetInvestmentsSuccess({
          investments: operationResult.relatedObject,
        });
      })
    )
  );

  updateInvestment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.UPDATE_INVESTMENT),
      switchMap((data: fromInvestments.UpdateInvestment) => {
        return this.investmentService
          .update(data.payload.investment as AddUpdateInvestment)
          .pipe(
            map((operationResult: OperationResult | null) => {
              if (!operationResult?.success) {
                this.toastService.error({
                  message: 'Something get wrong',
                  type: ToastType.Error,
                });
                return new fromInvestments.AddInvestmentError({
                  operationResult,
                });
              }
              return new fromInvestments.UpdateInvestmentSuccess();
            }),
            tap(() =>
              this.toastService.success({
                message: 'Investment Updated',
                type: ToastType.Success,
              })
            ),
            catchError((error) => {
              this.toastService.error({
                message: 'Something get wrong',
                type: ToastType.Error,
              });
              return of({ type: 'Failed', payload: error });
            })
          );
      })
    )
  );

  updateInvestmentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.UPDATE_INVESTMENT_SUCCESS),
      switchMap((_) => this.investmentService.getInvestments()),
      map((operationResult: ExtendedOperationResult<IInvestment[]>) => {
        return new fromInvestments.GetInvestmentsSuccess({
          investments: operationResult.relatedObject,
        });
      })
    )
  );

  deleteInvestment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.DELETE_INVESTMENT),
      switchMap((data: fromInvestments.DeleteInvestment) =>
        this.investmentService.delete(Number(data.payload.id)).pipe(
          map((operationResult: OperationResult) => {
            if (!operationResult.success) {
              this.toastService.error({
                message: 'Something get wrong',
                type: ToastType.Error,
              });
              return new fromInvestments.DeleteInvestmentError({
                operationResult,
              });
            }
            this.toastService.success({
              message: 'Successfully Deleted',
              type: ToastType.Success,
            });
            return new fromInvestments.DeleteInvestmentSuccess();
          })
        )
      )
    )
  );

  deleteInvestmentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.DELETE_INVESTMENT_SUCCESS),
      switchMap((_) => this.investmentService.getInvestments()),
      map((operationResult: ExtendedOperationResult<IInvestment[]>) => {
        return new fromInvestments.GetInvestmentsSuccess({
          investments: operationResult.relatedObject,
        });
      })
    )
  );

  filterInvestment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.FILTER_INVESTMENTS),
      switchMap((data: fromInvestments.FilterInvestment) => {
        return this.investmentService.filterInvestments(
          data.payload.filters,
          data.payload.userId
        );
      }),
      map((investments: IInvestment[]) => {
        return new fromInvestments.FilterInvestmentSuccess({ investments });
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly investmentService: InvestmentService,
    private readonly toastService: ToastService
  ) {}
}
