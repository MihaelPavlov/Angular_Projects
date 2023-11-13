import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Component} from "@angular/core";
import {AuthService} from "../../lib/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "unauthorized-redirect-modal",
  templateUrl: "unauthorized-redirect-modal.component.html"
})
export class UnauthorizedRedirectModalComponent {
  constructor(private authService: AuthService
  ) {
  }

  async redirectToIdentityServer(): Promise<void> {
    await this.authService.loginStart();
  }

}
