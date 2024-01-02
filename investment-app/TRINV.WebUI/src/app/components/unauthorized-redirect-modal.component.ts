import {Component} from "@angular/core";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: "unauthorized-redirect-modal",
  templateUrl: "unauthorized-redirect-modal.component.html"
})
export class UnauthorizedRedirectModalComponent {
  constructor(private authService: AuthService
  ) {
  }

  redirectToIdentityServer(): void {
    this.authService.loginStart();
  }
}
