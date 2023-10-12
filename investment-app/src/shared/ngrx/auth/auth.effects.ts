import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as fromAuthActions from "./auth.actions";
import {catchError, map, mergeMap, of, switchMap, take, tap} from "rxjs";
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
          this.authService.setToken(data.accessToken, data.user.email);

          // Setting auto logout
          this.authService.tokenExpirationTimer = setTimeout(() => {
            of(new fromAuthActions.Logout())
          }, 3600 * 1000)

          this.toastService.success({message: "Successfully Login", type: ToastType.Success})
          this.router.navigate(["/"])
          return new fromAuthActions.LoginSuccess({user: data.user});
        }),
        catchError((error) => {
          this.toastService.error({message: 'Something get wrong', type: ToastType.Error})
          return of(new fromAuthActions.LoginError({error: "Something get wrong"}))
        })
      )),
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AUTO_LOGIN),
      mergeMap(() => {
        const token = localStorage.getItem((this.authService.getTokenKey()))

        if (!token) {
          this.toastService.error({message: "Auto Login Failed: Try again", type: ToastType.Error})
          return of(new fromAuthActions.AutoLoginError({error: "Auto Login Failed: Try again"}));
        }
        let tokenData: { token: string, email: string } = JSON.parse(token);
        return this.authService.getUserByToken(tokenData)
          .pipe(
            take(1),
            map(user => new fromAuthActions.LoginSuccess({user: user[0]}))
          );
      })
    )
  );
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.LOGOUT),
      tap(() => {
        this.authService.logout()
        this.router.navigate(["/"])
        this.toastService.success({message: "Successfully Logout", type: ToastType.Success})
      }),
      map(() => new fromAuthActions.LogoutSuccess())
    ));

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.REGISTER),
      mergeMap((data: fromAuthActions.Register) => {
        return this.authService.register(data.payload.user);
      }),
      map((response) => {
        if (response == null) {
          this.toastService.error({message: "Something get wrong: Try again", type: ToastType.Error})
          return new fromAuthActions.RegisterError({error: "Error during registration"});
        }
        this.authService.setToken(response.accessToken, response.user.email);

        // Setting auto logout
        this.authService.tokenExpirationTimer = setTimeout(() => {
              of(new fromAuthActions.Logout())
            }, 3600 * 1000)

        this.toastService.success({message: "Successfully Registered", type: ToastType.Success})
        this.router.navigate(["/"]);

        return new fromAuthActions.RegisterSuccess({response});
      }),
      catchError((error) => {
        this.toastService.error({message: `Something get wrong: ${error.message}`, type: ToastType.Error})

        return of(new fromAuthActions.RegisterError({error}))
      })
    )
  )

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {
  }
}
