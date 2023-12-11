import {AuthService} from "../../shared/services/auth.service";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {PATH} from "../../shared/configs/path.configs";

@Component({
  selector: 'app-sign-out-redirect-callback',
  template: `<div></div>`
})
export class SignOutRedirectCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {//TODO: Maybe remove this signoutRedirect
    // this.authService.logoutFinish()
    //   .then(_ => {
    //     this.router.navigate([PATH.CLIENT.HOME], { replaceUrl: true });
    //   })
  }
}
