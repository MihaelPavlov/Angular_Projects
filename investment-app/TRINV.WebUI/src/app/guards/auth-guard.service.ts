import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../../lib/services/auth.service";
import {ToastService} from "../../lib/services/toast.service";
import {ToastType} from "../models/toast";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UnauthorizedRedirectModalComponent} from "../components/unauthorized-redirect-modal.component";

@Injectable()
export class AuthGuardService {

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router, private toastService: ToastService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isUserAuthenticated = await this.authService.isAuthenticated();
    console.log('route -> ', route.routeConfig?.path)
    if (isUserAuthenticated) {
      return true;
    } else {
      this.toastService.error({message: "You are not allowed", type: ToastType.Error});
      this.dialog.open(UnauthorizedRedirectModalComponent).afterClosed().subscribe(x => {
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
      });
      return false;
    }
  }
}
