import {AuthService} from "../../lib/services/auth.service";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signout-redirect-callback',
  template: `<div></div>`
})
export class SignoutRedirectCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.authService.logoutFinish()
      .then(_ => {
        this.router.navigate(['/'], { replaceUrl: true });
      })
  }
}
