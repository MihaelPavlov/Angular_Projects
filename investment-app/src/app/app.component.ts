import {Component, OnInit} from '@angular/core';
import {AuthInitialState} from "../shared/ngrx/auth/auth.reducer";
import {Store} from "@ngrx/store";
import {AutoLogin} from "../shared/ngrx/auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tracking-investments-app';

  constructor(private store: Store<AuthInitialState>) {
  }

  ngOnInit() {
    this.store.dispatch(new AutoLogin());
  }
}
