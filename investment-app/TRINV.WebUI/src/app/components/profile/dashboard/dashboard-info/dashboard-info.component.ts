import { Component, OnInit } from '@angular/core';
import { IDashboardInvestmentInfo } from '../models/dashboard-investment-info.interace';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  selectDashboardInfo,
  selectIsLoadingInfo,
} from '../store/dashboard.selectors';
import { GetDashboardInvestmentInfo } from '../store/dashboard.actions';
import { InvestmentType } from 'src/enums/investment-type.enum';

@Component({
  selector: 'dashboard-info',
  templateUrl: 'dashboard-info.component.html',
  styles: [
    `
      .index {
        position: relative;
        z-index: 0;
      }
      .text-green {
        color: green;
      }

      .text-red {
        color: red;
      }
    `,
  ],
})
export class DashboardInfoComponent implements OnInit {
  public dashboardInfo$: IDashboardInvestmentInfo | null = null;
  public dashboardInfoIsLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.pipe(select(selectDashboardInfo)).subscribe((x) => {
      this.dashboardInfo$ = x;
    });

    this.store.dispatch(
      new GetDashboardInvestmentInfo({
        investmentType: InvestmentType.Crypto,
      })
    );

    this.dashboardInfoIsLoading$ = this.store.pipe(select(selectIsLoadingInfo));
  }
}
