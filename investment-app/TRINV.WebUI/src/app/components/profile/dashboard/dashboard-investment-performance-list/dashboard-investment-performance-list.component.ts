import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IDashboardInvestmentPerformance } from '../models/dashboard-investment-performance.interface';
import {
  selectInvestmentsPerformanceList,
  selectIsLoadingInvestmentsPerformanceList,
} from '../store/dashboard.selectors';
import { GetDashboardInvestmentPerformanceList } from '../store/dashboard.actions';
import { InvestmentType } from 'src/enums/investment-type.enum';
import { HistoryLogComponent } from 'src/app/components/shared/history-log/history-log.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-investment-performance-list',
  templateUrl: 'dashboard-investment-performance-list.component.html',
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
export class DashboardInvestmentPerformanceListComponent implements OnInit {
  public isLoadingInvestmentPerformanceList$!: Observable<boolean>;
  public investmentPerformanceList: IDashboardInvestmentPerformance[] = [];

  constructor(private store: Store, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.isLoadingInvestmentPerformanceList$ = this.store.select(
      selectIsLoadingInvestmentsPerformanceList
    );

    this.store
      .select(selectInvestmentsPerformanceList)
      .subscribe((x) => (this.investmentPerformanceList = x));

    this.store.dispatch(
      new GetDashboardInvestmentPerformanceList({
        investmentType: InvestmentType.Crypto,
      })
    );
  }

  openDialog() {
    this.dialog.open(HistoryLogComponent, {
      data: {
        data: this.investmentPerformanceList,
        allAvailableHeadings: [
          'Asset Id',
          'Name',
          'Total Investment Amount',
          'Total Current Amount',
          'Rate',
        ],
        displayedColumns: [
          'assetId',
          'name',
          'totalInitialInvestment',
          'totalCurrentInvestment',
          'rate',
        ],
      },
    });
  }
}
