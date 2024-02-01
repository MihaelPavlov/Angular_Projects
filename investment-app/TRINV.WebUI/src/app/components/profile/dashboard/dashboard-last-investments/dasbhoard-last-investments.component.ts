import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardLastInvestment } from '../models/dashboard-last-investment.interface';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  selectIsLoadingLastInvestments,
  selectLastInvestments,
} from '../store/dashboard.selectors';
import { GetDasboardLastInvestments } from '../store/dashboard.actions';
import { InvestmentType } from 'src/enums/investment-type.enum';
import { HistoryLogComponent } from 'src/app/components/shared/history-log/history-log.component';

@Component({
  selector: 'app-dashboard-last-investments',
  templateUrl: 'dasbhoard-last-investments.component.html',
})
export class DashboardLastInvestmentsComponent implements OnInit {
  public isLoadingLastInvestments$!: Observable<boolean>;
  public lastInvestments: IDashboardLastInvestment[] = [];
  constructor(private store: Store, private dialog: MatDialog) {}

  public ngOnInit(): void {
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

  openDialog() {
    this.dialog.open(HistoryLogComponent, {
      data: {
        data: this.lastInvestments,
        allAvailableHeadings: ['Asset Id', 'Name', 'Date On Add', 'Amount', "Quantity"],
        displayedColumns: ['assetId', 'name', 'dateAdded', 'amount', "quantity"],
      },
    });
  }
}
