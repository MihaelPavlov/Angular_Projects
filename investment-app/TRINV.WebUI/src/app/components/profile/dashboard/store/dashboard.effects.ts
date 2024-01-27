import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardService } from '../services/dashboard.service';
import * as dashboardActions from './dashboard.actions';
import { delay, map, switchMap, timer } from 'rxjs';
import { ExtendedOperationResult } from 'src/app/models/operation-result.model';
import { IDashboardInvestmentInfo } from '../models/dashboard-investment-info.interace';
import { ToastService } from 'src/shared/services/toast.service';
import { ToastType } from 'src/app/models/toast';
import { IDashboardInvestmentsPercent } from '../models/dashboard-investments-in-percents.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class DashboardEffect {
  getDashboardInvestmentsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.GET_DASHBOARD_INVESTMENTS_INFO),
      switchMap((action: dashboardActions.GetDashboardInvestmentInfo) =>
        this.dashboardService
          .getDashboardInvestmentInfo(action.payload.investmentType)
          .pipe(
            delay(3000), //FIXME: Remove Delay
            map(
              (
                operationResult: ExtendedOperationResult<IDashboardInvestmentInfo> | null
              ) => {
                console.log('operation result => ', operationResult);
                if (operationResult == null) {
                  this.toastService.error({
                    message: 'Something get wrong',
                    type: ToastType.Error,
                  });
                  return new dashboardActions.GetDashboardInvestmentInfoFailed({
                    operationResult,
                  });
                } else if (!operationResult.success) {
                  return new dashboardActions.GetDashboardInvestmentInfoFailed({
                    operationResult,
                  });
                }

                return new dashboardActions.GetDashboardInvestmentInfoSuccess({
                  investmentsInfo: operationResult.relatedObject,
                });
              }
            )
          )
      )
    )
  );

  getDashboardInvestmentsInPercents = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.GET_DASHBOARD_INVESTMENTS_IN_PERCENTS),
      switchMap((action: dashboardActions.GetDashboardInvestmentInPecents) =>
        this.dashboardService
          .getDashboardInvestmentsInPercents(action.payload.investmentType)
          .pipe(
            delay(3000), //FIXME: Remove Delay
            map(
              (
                operationResult: ExtendedOperationResult<
                  IDashboardInvestmentsPercent[]
                > | null
              ) => {
                if (operationResult == null) {
                  this.toastService.error({
                    message: 'Something get wrong',
                    type: ToastType.Error,
                  });
                  return new dashboardActions.GetDashboardInvestmentInPecentsFailed(
                    {
                      operationResult,
                    }
                  );
                } else if (!operationResult.success) {
                  return new dashboardActions.GetDashboardInvestmentInPecentsFailed(
                    {
                      operationResult,
                    }
                  );
                }

                return new dashboardActions.GetDashboardInvestmentInPecentsSuccess(
                  {
                    invesmentsInPercents: operationResult.relatedObject,
                  }
                );
              }
            )
          )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private dashboardService: DashboardService,
    private readonly toastService: ToastService
  ) {}
}
