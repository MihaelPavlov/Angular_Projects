import { Component, OnInit } from "@angular/core";
import { IDashboardInvestmentsPercent } from "../models/dashboard-investments-in-percents.interface";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { Store, select } from "@ngrx/store";
import { selectInvestmentsInPercents, selectIsLoadingInvestmentsInPercents } from "../store/dashboard.selectors";
import { GetDashboardInvestmentInPecents } from "../store/dashboard.actions";
import { InvestmentType } from "src/enums/investment-type.enum";
import { HistoryLogComponent } from "src/app/components/shared/history-log/history-log.component";

@Component({
  selector: 'dashboard-investments-in-percent',
  templateUrl: 'dashboard-investments-in-percent.component.html',
})
export class DashboardInvestmentsInPecentComponent  implements OnInit{
  public dashboardInvestmentsPercent: IDashboardInvestmentsPercent[] = [];
  public isLoadingDashboardInvestmentsPercent$!: Observable<boolean>;

  public colorObject: any = [
    {
      light: `bg-orange-200`,
      darker: `bg-orange-500`,
    },
    {
      light: `bg-yellow-200`,
      darker: `bg-yellow-500`,
    },
    {
      light: `bg-red-200`,
      darker: `bg-red-500`,
    },
    {
      light: `bg-green-200`,
      darker: `bg-green-500`,
    },
    {
      light: `bg-purple-200`,
      darker: `bg-purple-500`,
    },
    {
      light: `bg-blue-200`,
      darker: `bg-blue-500`,
    },
  ];

  constructor(private store: Store, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.store.pipe(select(selectInvestmentsInPercents)).subscribe((x) => {
      this.dashboardInvestmentsPercent = x;
    });

    this.store.dispatch(
      new GetDashboardInvestmentInPecents({
        investmentType: InvestmentType.Crypto,
      })
    );

    this.isLoadingDashboardInvestmentsPercent$ = this.store.pipe(
      select(selectIsLoadingInvestmentsInPercents)
    );
  }

  openDialogHistoryLog() {
    console.log('start');

    this.dialog.open(HistoryLogComponent, {
      data: {
        data: this.dashboardInvestmentsPercent,
        allAvailableHeadings: ['Asset Id', 'Name', 'Quantity', 'Percents'],
        displayedColumns: ['assetId', 'name', 'quantity', 'percent'],
      },
    });
  }
}