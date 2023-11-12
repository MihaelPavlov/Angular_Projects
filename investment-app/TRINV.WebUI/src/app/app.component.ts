import {Component, OnInit} from '@angular/core';
import {AuthService} from "../lib/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tracking-investments-app';
  public userAuthenticated = false;
  constructor(private _authService: AuthService){
    this._authService.loginChanged
      .subscribe(userAuthenticated => {
        console.log('login changes, -> is user authenticaterd -> ' , userAuthenticated)
        this.userAuthenticated = userAuthenticated;
      })
  }

  ngOnInit(): void {
    this._authService.isAuthenticated()
      .then(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;
        console.log(' is user authenticaterd -> ' , userAuthenticated)
      })
  }
}
