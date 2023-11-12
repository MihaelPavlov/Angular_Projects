import {AfterViewInit, Component, OnInit} from "@angular/core";
import {AuthService} from "../../../lib/services/auth.service";

@Component({
  selector: "tool-bar",
  templateUrl: "tool-bar.component.html",
  styleUrls: ["tool-bar.component.scss"]

})
export class ToolBarComponent implements OnInit, AfterViewInit {
  public userAuthenticated = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isAuthenticated()
      .then(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;
        console.log(' is user authenticaterd -> ' , userAuthenticated)
      })
  }

  ngAfterViewInit() {
  }
}
