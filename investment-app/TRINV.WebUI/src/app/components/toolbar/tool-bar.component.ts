import {AfterViewInit, Component} from "@angular/core";
import {AuthService} from "../../../lib/services/auth.service";
import {IUser} from "../../models/user";
import {select, Store} from "@ngrx/store";
import {AuthInitialState} from "../../../shared/ngrx/auth/auth.reducer";
import {selectAuthUser} from "../../../shared/ngrx/auth/auth.selectors";
import {Observable} from "rxjs";

@Component({
  selector: "tool-bar",
  templateUrl: "tool-bar.component.html",
  styleUrls: ["tool-bar.component.scss"]

})
export class ToolBarComponent implements AfterViewInit {
  public user!: Observable<IUser | null>;

  constructor(private authService: AuthService, private store: Store<AuthInitialState>) {
  }

  ngAfterViewInit() {
    this.user = this.store.pipe(select(selectAuthUser));
  }
}
