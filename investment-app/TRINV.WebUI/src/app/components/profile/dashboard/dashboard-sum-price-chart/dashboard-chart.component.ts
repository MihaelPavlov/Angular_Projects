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
                'rgb(137, 49, 104)',
                'rgb(233, 227, 182)',
                'rgb(233, 114, 76)',
                'rgb(195, 210, 213)',
                'rgb(138, 234, 146)',
                'rgb(81, 41, 30)',
                'rgb(14, 52, 160)',
                'rgb(153, 209, 156)',
                'rgb(200, 255, 190)',
                'rgb(237, 255, 171)',
                'rgb(137, 96, 142)',
                'rgb(144, 151, 192)',
                'rgb(80, 59, 49)',
                'rgb(167, 187, 236)',
                'rgb(34, 124, 157)',
                'rgb(255, 203, 119)',
              ],
              hoverOffset: 1,
            },
          ],
        };
      })
    );
  }
}
