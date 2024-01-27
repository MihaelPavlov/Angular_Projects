import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPortfolioSelectors from '../../portfolio/portfolio.selectors';
import * as fromPortfolioActions from '../../portfolio/portfolio.action';
import { IInvestment } from '../../../models/investment';
import { AppState } from '../../../../shared/ngrx/app.reducer';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../../../models/user';
import {
  selectDashboardInfo,
  selectIsLoadingInfo,
} from './store/dashboard.selectors';
import { IDashboardInvestmentInfo } from './models/dashboard-investment-info.interace';
import { GetDashboardInvestmentInfo } from './store/dashboard.actions';
import { InvestmentType } from 'src/enums/investment-type.enum';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent   {


  constructor(private store: Store) {
  }

  public ngOnInit(): void {
  }

}
