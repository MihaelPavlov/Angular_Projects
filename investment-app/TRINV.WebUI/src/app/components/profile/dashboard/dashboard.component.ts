import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private store: Store) {}
}
