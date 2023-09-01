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
    this.authService.user$.subscribe(result => {
      if (result != null) {
        this.user = result;
      }
    })
  }
}
