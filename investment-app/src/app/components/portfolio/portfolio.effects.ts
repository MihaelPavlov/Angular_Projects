import {Actions, createEffect, ofType,} from "@ngrx/effects";
import {map, mergeMap, of, switchMap, catchError, tap} from "rxjs";
import {InvestmentService} from "../../services/investment.service";
import {Injectable} from "@angular/core";
import * as fromInvestments from "./portfolio.action";
import {IInvestment} from "../../models/investment";
import {ToastService} from "../../../lib/services/toast.service";
import {ToastType} from "../../models/toast";

@Injectable()
export class InvestmentEffects {
  getInvestments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.GET_INVESTMENTS),
      switchMap((data: fromInvestments.GetInvestments) => {
        return this.investmentService.getInvestments(data.payload.userId)
      }),
      map((investments: IInvestment[]) => {
        return new fromInvestments.GetInvestmentsSuccess({investments})
      })
    )
  )

  addInvestments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.ADD_INVESTMENT),
      switchMap((data: fromInvestments.AddInvestment) => {
        return this.investmentService.create(data.payload.investment as IInvestment).pipe(
          map((investment: IInvestment | null) => {
            return new fromInvestments.AddInvestmentSuccess({investment});
          }),
          tap(() => this.toastService.success({message: 'Investment Tracked', type: ToastType.Success})),
          catchError((error) => {
            this.toastService.error({message: 'Something get wrong', type: ToastType.Error})
            return of({type: "Failed", payload: error})
          }));
      }),
    )
  )

  deleteInvestments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.DELETE_INVESTMENT),
      mergeMap((data: fromInvestments.DeleteInvestment) =>
        this.investmentService.delete(Number(data.payload.investmentId)).pipe(
          map(() => {
            return new fromInvestments.DeleteInvestmentSuccess({investmentId: data.payload.investmentId});
          }),
          tap(() => this.toastService.success({message: 'Successfully Deleted', type: ToastType.Success}))
        )
      )
    )
  );

  filterInvestments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromInvestments.FILTER_INVESTMENTS),
      switchMap((data: fromInvestments.FilterInvestment) => {
        return this.investmentService.filterInvestments(data.payload.filters, data.payload.userId)
      }),
      map((investments: IInvestment[]) => {
        return new fromInvestments.FilterInvestmentSuccess({investments});
      })
    ));


  constructor(private actions$: Actions, private investmentService: InvestmentService, private toastService: ToastService) {
  }
}
