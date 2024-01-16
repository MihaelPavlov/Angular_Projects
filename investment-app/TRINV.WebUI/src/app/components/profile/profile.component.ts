import {AfterViewInit, Component} from "@angular/core";
import {Observable} from "rxjs";
import {IUser} from "../../models/user";
import {AuthService} from "../../../shared/services/auth.service";
import { Router } from "@angular/router";
import { PATH } from "src/shared/configs/path.configs";

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfileComponent implements AfterViewInit {
  public user!: Observable<IUser | null>;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    // this.user = this.store.pipe(select(selectAuthUser));
  }

  async onLogout(): Promise<void> {
    await this.authService.logoutStart();

    this.router.navigate([PATH.CLIENT.HOME], { replaceUrl: true });
  }
}
