import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {PATH} from "../../../../shared/configs/path.configs";

@Component({
  selector: 'app-sign-in-redirect-callback',
  template: `<div></div>`
})
export class SignInRedirectCallbackComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) { }
  ngOnInit(): void {
    this._authService.isUserAuthenticated$.subscribe(user=>{
      console.log('sing in ->' , user)
    })
    if (this._authService.isAuthenticated()){
    console.log("in sign in callback")
      this._router.navigate([PATH.CLIENT.HOME], { replaceUrl: true });
    }
  }
}
