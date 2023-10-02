import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as fromAuthActions from "./auth.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {AuthResponseData, AuthService} from "../../../lib/services/auth.service";
import {ToastType} from "../../../app/models/toast";
import {ToastService} from "../../../lib/services/toast.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.LOGIN),
      switchMap((data: fromAuthActions.Login) => this.authService.login(data.payload.email, data.payload.password).pipe(
        map((data: AuthResponseData | null) => {
          if (data == null) {
            return new fromAuthActions.LoginError({error: "Something get wrong"});
          }
          this.authService.setToken(data.accessToken);
          this.authService.autoLogout(3600 * 1000)
          this.toastService.success({message: "Successfully Login", type: ToastType.Success})
          this.router.navigate(["/"])
          return new fromAuthActions.LoginSuccess({user: data.user});
        }),
        catchError((error) => {
          //TODO: Find the problem this catch error doesn't work. And because of that we have loop on the loading
          console.log('err')
          new fromAuthActions.LoginError({error: "Something get wrong"});
          this.toastService.error({message: 'Something get wrong', type: ToastType.Error})
          return of({type: "Failed", payload: error})
        })
      )),
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly router: Router) {
  }
}
