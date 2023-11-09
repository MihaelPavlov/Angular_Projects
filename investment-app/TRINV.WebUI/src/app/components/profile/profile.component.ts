import {AfterViewInit, Component} from "@angular/core";
import {Logout} from "../../../shared/ngrx/auth/auth.actions";
import {Observable} from "rxjs";
import {IUser} from "../../models/user";
import {AuthService} from "../../../lib/services/auth.service";
import {select, Store} from "@ngrx/store";
import {AuthInitialState} from "../../../shared/ngrx/auth/auth.reducer";
import {selectAuthUser} from "../../../shared/ngrx/auth/auth.selectors";

@Component({
  selector:"profile",
  templateUrl:"profile.component.html",
  styleUrls:["profile.component.scss"]
})
export  class ProfileComponent implements AfterViewInit{
  public user!: Observable<IUser | null>;

  constructor(private authService: AuthService, private store: Store<AuthInitialState>) {
  }

  ngAfterViewInit() {
    this.user = this.store.pipe(select(selectAuthUser));
  }
  onLogout() {
    this.store
      .dispatch(new Logout())
  }
}
