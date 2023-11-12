import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../lib/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin-redirect-callback',
  template: `<div></div>`
})
export class SigninRedirectCallbackComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) { }
  ngOnInit(): void {
    this._authService.loginFinish()
      .then(_ => {
        this._router.navigate(['/'], { replaceUrl: true });
      })
  }
}
