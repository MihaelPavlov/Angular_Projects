import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IDashboardLastInvestment } from './models/dashboard-last-investment.interface';
import {
  selectIsLoadingLastInvestments,
  selectLastInvestments,
} from './store/dashboard.selectors';
import { GetDasboardLastInvestments } from './store/dashboard.actions';
import { InvestmentType } from 'src/enums/investment-type.enum';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public isLoadingLastInvestments$!: Observable<boolean>;
  public lastInvestments: IDashboardLastInvestment[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoadingLastInvestments$ = this.store.select(
      selectIsLoadingLastInvestments
    );

    this.store
      .select(selectLastInvestments)
      .subscribe((x) => (this.lastInvestments = x));

    this.store.dispatch(
      new GetDasboardLastInvestments({
        investmentType: InvestmentType.Crypto,
      })
    );
  }
}
