import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {ToastService} from "../services/toast.service";
import {ToastType} from "../../app/models/toast";
import {MatDialog} from "@angular/material/dialog";
import {UnauthorizedRedirectModalComponent} from "../../app/components/unauthorized-redirect-modal.component";
import {map, Observable} from "rxjs";

@Injectable()
export class AuthGuardService {

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router, private toastService: ToastService) {
  }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("from guard")
    return this.authService.isAuthenticated().pipe(
      map((response:boolean)=>{
        console.log('route -> ', route.routeConfig?.path)
        if (response) {
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

      })
    );
  }
}
