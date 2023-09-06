import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../lib/services/auth.service";
import {ToastService} from "../../lib/services/toast.service";
import {ToastType} from "../models/toast";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.isAuthenticated()
      .then(
        (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            return true;
          } else {
            this.toastService.error({message: "You are not allowed", type: ToastType.Error})
            this.router.navigate(['/']);
          }
          return false;
        }
      );

  }
}
