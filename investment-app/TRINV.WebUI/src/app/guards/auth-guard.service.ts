import {Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import {AuthService} from "../../lib/services/auth.service";
import {ToastService} from "../../lib/services/toast.service";
import {ToastType} from "../models/toast";

@Injectable()
export class AuthGuardService  {

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const userAuthenticated = await this.authService.isAuthenticated();
    console.log('inside -> auth guard -> ', userAuthenticated)

    if (userAuthenticated) {
      return true;
    } else {
      this.toastService.error({ message: "You are not allowed", type: ToastType.Error });
      this.router.navigate(['/']);
      return false;
    }
  }

}
