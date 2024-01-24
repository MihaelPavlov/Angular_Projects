import {Component, OnInit, ViewChild} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromCryptoAssetsActions from "../crypto-assets.actions";
import * as fromCryptoAssetsSelectors from "../crypto-assets.selectors";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DataListService} from "../../../services/data-list.servie";
import { IDigitalCurrency } from "src/app/models/digital-currency";

@Component({
  selector: 'coins',
  templateUrl: 'coins.component.html',
  styleUrls: ['coins.component.css'],
})
export class CoinsComponent implements OnInit {
  coins$!: Observable<IDigitalCurrency[]>;
  isLoading$!: Observable<boolean>;
  coinsData$!: MatTableDataSource<IDigitalCurrency>;
  columnsToDisplay: string[] = [
    'rank',
    'name',
    'priceUsd',
    'marketCapUsd',
    'supply',
    'volumeUsd24Hr',
    'changePercent24Hr',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dataListService: DataListService<IDigitalCurrency>,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(
      select(fromCryptoAssetsSelectors.selectIsLoading)
    );
    this.store.dispatch(new fromCryptoAssetsActions.GetAllCoins());

    this.store
      .pipe(select(fromCryptoAssetsSelectors.selectCoinList))
      .subscribe({
        next: (response) => {
          this.coinsData$ = this.dataListService
            .initializeData(response)
            .addPagination(this.paginator)
            .addSorting(this.sort);
        },
      });
  }

  redirectToWhitePaper(name: string) {
    window.open(`https://whitepaper.io/coin/${name.toLowerCase()}`, '_blank');
  }
}
