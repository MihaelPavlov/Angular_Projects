import { Component,  OnInit, Renderer2, ViewChild} from "@angular/core";
import {CoinService} from "../../../../lib/services/coin.service";
import {ICryptoAsset} from "../../../models/cryptoAsset";
import {select, Store} from "@ngrx/store";
import { Observable} from "rxjs";
import * as fromCryptoAssetsActions from "../crypto-assets.actions";
import * as fromCryptoAssetsSelectors from "../crypto-assets.selectors";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DataListService} from "../../../services/data-list.servie";

@Component({
  selector: "coins",
  templateUrl: "coins.component.html",
  styleUrls: ["coins.component.css"]
})
export class CoinsComponent implements OnInit {
  coins$!: Observable<ICryptoAsset[]>
  isLoading$!: Observable<boolean>
  coinsData$!: MatTableDataSource<ICryptoAsset>
  columnsToDisplay: string[] = ["rank", "name", "priceUsd", "marketCapUsd", "supply", "volumeUsd24Hr", "changePercent24Hr"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataListService:DataListService<ICryptoAsset>,
              private http: HttpClient,
              private renderer: Renderer2,
              private coinService: CoinService,
              private store: Store,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(fromCryptoAssetsSelectors.selectIsLoading));
    this.store.dispatch(new fromCryptoAssetsActions.GetAllCoins());

    this.store.pipe(select(fromCryptoAssetsSelectors.selectCoinList)).subscribe({
      next: response => {
        this.coinsData$= this.dataListService.initializeData(response)
         .addPagination(this.paginator)
         .addSorting(this.sort);
      }
    })
  }

  redirectToWhitePaper(name: string) {
    window.open(`https://whitepaper.io/coin/${name.toLowerCase()}`, "_blank");
  }

}
