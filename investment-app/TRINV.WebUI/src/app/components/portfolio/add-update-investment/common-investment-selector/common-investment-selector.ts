import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
  NgForm,
  NgModelGroup,
} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { GetAllCoins } from 'src/app/components/crypto_assets/crypto-assets.actions';
import { selectCoinList } from 'src/app/components/crypto_assets/crypto-assets.selectors';
import { GetAllStocks } from 'src/app/components/stock_asset/stock_asset.actions';
import { selectStocksList } from 'src/app/components/stock_asset/stock_asset.selectors';
import { IDigitalCurrency } from 'src/app/models/digital-currency';
import { InvestmentType } from 'src/enums/investment-type.enum';
import { IStock } from 'src/shared/services/stock.service';

@Component({
  selector: 'common-investment-selector',
  templateUrl: 'common-investment-selector.html',
  styleUrls: ['common-investment-selector.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class CommonInvestmentSelector implements OnChanges {
  @Input('selectedAsset') selectedAsset!: string | null;
  @Input('investmentType') investmentType: InvestmentType | null = null;
  @Output() initAssetCollectionEvent = new EventEmitter<Observable<any[]>>();

  public collection$!: Observable<any[]>;
  public hasImage!: boolean;

  constructor(
    private store: Store<{
      coins: { coins: IDigitalCurrency[] };
      stocks: { stocks: IStock[] };
    }>
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['investmentType']) {
      this.collection$ = of();
      switch (this.investmentType) {
        case InvestmentType.Stock:
          console.log('inside stock', this.investmentType);

          this.hasImage = false;
          this.collection$ = this.store.pipe(select(selectStocksList));
          this.store.dispatch(
            new GetAllStocks({ pagination: { pageSize: 10, pageNumber: 1 } })
          );

          this.initAssetCollectionEvent.emit(this.collection$);
          break;
        case InvestmentType.Crypto:
          console.log('inside crypto', this.investmentType);
          this.hasImage = true;
          this.collection$ = this.store.pipe(select(selectCoinList));
          this.store.dispatch(new GetAllCoins());

          this.initAssetCollectionEvent.emit(this.collection$);
          break;
      }
    }
  }

  //   public ngOnInit(): void {
  //     this.collection$ = of();
  //     switch (this.investmentType) {
  //       case InvestmentType.Stock:
  //         console.log('inside stock', this.investmentType);

  //         this.hasImage = false;
  //         this.collection$ = this.store.pipe(select(selectStocksList));
  //         this.store.dispatch(
  //           new GetAllStocks({ pagination: { pageSize: 10, pageNumber: 1 } })
  //         );

  //         this.initAssetCollectionEvent.emit(this.collection$);
  //         break;
  //       case InvestmentType.Crypto:
  //         console.log('inside crypto', this.investmentType);
  //         this.hasImage = true;
  //         this.collection$ = this.store.pipe(select(selectCoinList));
  //         this.store.dispatch(new GetAllCoins());

  //         this.initAssetCollectionEvent.emit(this.collection$);
  //         break;
  //     }
  //   }
}
