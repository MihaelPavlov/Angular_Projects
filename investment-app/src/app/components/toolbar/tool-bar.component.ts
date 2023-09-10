import {AfterViewInit, Component} from "@angular/core";
import {AuthService} from "../../../lib/services/auth.service";
import {IUser} from "../../models/user";

@Component({
  selector: "tool-bar",
  templateUrl: "tool-bar.component.html",
  styleUrls: ["tool-bar.component.css"]

})
export class ToolBarComponent implements AfterViewInit {
  public user!: IUser | null;

  constructor(private authService: AuthService) {
  }

  ngAfterViewInit() {
    console.log('username',this.user?.username)

    this.authService.user$.subscribe(result => {
        this.user = result;
    console.log('username',this.user?.username)
    })
  }

  onLogout(){
    this.authService.logout();
  }
}
