import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IInvestment } from 'src/app/models/investment';
import * as fromPortfolioSelectors from '../../../portfolio/portfolio.selectors';
import * as fromPortfolioActions from '../../../portfolio/portfolio.action';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'dashboard-chart',
  templateUrl: 'dashboard-chart.component.html',
})
export class DashboardChartComponent implements OnInit, OnDestroy {
  public user!: IUser | null;
  public chartData: any | null = null;
  public isLoadingInvestments$!: Observable<boolean>;
  public groupedData: {
    [name: string]: { sumPrice: number; sumQuantity: number; label: string };
  } = {};
  public investments$!: Observable<IInvestment[]>;
  private subscriptions: Subscription[] = [];

  constructor(private store: Store) {}

  public ngOnDestroy(): void {
    this.groupedData = {};
    this.subscriptions.forEach((x) => {
      x.unsubscribe();
    });
  }

  public ngOnInit(): void {
    this.isLoadingInvestments$ = this.store.pipe(
      select(fromPortfolioSelectors.selectInvestmentIsLoading)
    );

    this.investments$ = this.store.pipe(
      select(fromPortfolioSelectors.selectInvestmentsList)
    );

    this.store.dispatch(
      new fromPortfolioActions.GetInvestments({
        userId: Number(this.user?.id),
      })
    );

    this.subscriptions.push(
      this.investments$.subscribe((x) => {
        this.groupedData = {};
        x.forEach((investment) => {
          const { name, purchasePrice, quantity } = investment;
          if (!this.groupedData[name]) {
            this.groupedData[name] = {
              sumPrice: purchasePrice,
              sumQuantity: quantity,
              label: name,
            };
          } else {
            this.groupedData[name].sumPrice += purchasePrice;
            this.groupedData[name].sumQuantity += quantity;
            this.groupedData[name].label = name;
          }
        });
        this.chartData = {
          labels: Object.keys(this.groupedData),
          datasets: [
            {
              data: Object.values(this.groupedData).map(
                (data) => data.sumPrice
              ),
              backgroundColor: [
                'rgb(255, 205, 86)',
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
              ],
              hoverOffset: 1,
            },
          ],
        };
      })
    );
  }
}
