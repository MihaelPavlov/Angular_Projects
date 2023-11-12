import {AfterViewInit, Component} from "@angular/core";
import {Observable} from "rxjs";
import {IUser} from "../../models/user";
import {AuthService} from "../../../lib/services/auth.service";

@Component({
  selector: "profile",
  templateUrl: "profile.component.html",
  styleUrls: ["profile.component.scss"]
})
export class ProfileComponent implements AfterViewInit {
  public user!: Observable<IUser | null>;

  constructor(private authService: AuthService) {
  }

  ngAfterViewInit() {
    // this.user = this.store.pipe(select(selectAuthUser));
  }

  async onLogout(): Promise<void> {
    await this.authService.logoutStart();
  }
}
