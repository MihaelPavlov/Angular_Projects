import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Currency, getCurrencyLabel } from '../../../../enums/currency.enum';
import {
  getInvestmentTypeLabel,
  InvestmentType,
} from '../../../../enums/investment-type.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { InvestmentService } from '../../../services/investment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IUser } from '../../../models/user';
import { ToastService } from '../../../../shared/services/toast.service';
import { select, Store } from '@ngrx/store';
import { IInvestment } from '../../../models/investment';
import {
  AddInvestment,
  GetInvestmentById,
  UpdateInvestment,
} from '../portfolio.action';
import { selectInvestment } from '../portfolio.selectors';
import { GetAllCoins } from '../../crypto_assets/crypto-assets.actions';
import { selectCoinList } from '../../crypto_assets/crypto-assets.selectors';
import { IDigitalCurrency } from 'src/app/models/digital-currency';
import { IStock } from 'src/shared/services/stock.service';
import { GetAllStocks } from '../../stock_asset/stock_asset.actions';
import { selectStocksList } from '../../stock_asset/stock_asset.selectors';

@Component({
  selector: 'add-update-investment',
  templateUrl: 'add-update-investment.component.html',
  styleUrls: ['add-update-investment.component.css'],
})
export class AddUpdateInvestmentComponent implements OnInit {
  @Input('id') id: number | undefined;

  public investmentType!: InvestmentType | null;
  public user!: IUser | null;
  public coins!: Observable<IDigitalCurrency[]>;
  public stocks!: Observable<IStock[]>;
  public addUpdateForm = new FormGroup({
    assetId: new FormControl(),
    name: new FormControl(),
    quantity: new FormControl(),
    purchasePrice: new FormControl(),
  });

  constructor(
    private investmentService: InvestmentService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private store: Store<{
      portfolio: { investments: IInvestment[] };
      coins: { coins: IDigitalCurrency[] };
      auth: { auth: IUser };
      stocks:{stocks: IStock[]}
    }>
  ) {}

  ngOnInit() {
    this.setRouterParams();
    this.updateModel();

    // this.store.pipe(select(selectAuthUser)).subscribe({
    //   next: response => {
    //     if (response != null) {
    //       this.user = response;
    //     }
    //   }
    // })
  }

  public initializeForm(): void {

    if (this.investmentType === InvestmentType.Crypto) {

      this.addUpdateForm
        .get('assetId')
        ?.valueChanges.subscribe((selectedAssetId) => {
          this.coins.subscribe((coinList) => {
            // Find the corresponding coin based on the selected assetId
            const selectedCoin = coinList.find(
              (coin) => coin.id === selectedAssetId
            );

            // Update the 'name' form control with the selected coin's name
            if (selectedCoin) {
              this.addUpdateForm.get('name')?.setValue(selectedCoin.name);
            }
          });

          this.stocks.subscribe((stockList)=>{
            // Find the corresponding coin based on the selected assetId
            const selectedStock = stockList.find(
              (stock) => stock.symbol === selectedAssetId
            );

            // Update the 'name' form control with the selected coin's name
            if (selectedStock) {
              this.addUpdateForm.get('name')?.setValue(selectedStock.name);
            }
          })
        });

      this.coins = this.store.pipe(select(selectCoinList));
      this.store.dispatch(new GetAllCoins());
    } else if (this.investmentType === InvestmentType.Stock) {

         this.addUpdateForm
           .get('assetId')
           ?.valueChanges.subscribe((selectedAssetId) => {
             this.stocks.subscribe((stockList) => {
               // Find the corresponding coin based on the selected assetId
               const selectedStock = stockList.find(
                 (stock) => stock.symbol === selectedAssetId
               );

               // Update the 'name' form control with the selected coin's name
               if (selectedStock) {
                 this.addUpdateForm.get('name')?.setValue(selectedStock.name);
               }
             });
           });
      this.stocks = this.store.pipe(select(selectStocksList));
      this.store.dispatch(new GetAllStocks({pagination: {pageSize: 10, pageNumber:1}}));
      this.coins = of();
    }
  }

  public setRouterParams(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      let investmentType = params.get(
        'investmentType'
      ) as InvestmentType | null;

      this.investmentType = Number(investmentType);

      //We are initializing the form aftert we have investmentType, Or every time which the investmentType is changed
      if (id === null) this.initializeForm();

      if (id != null) {
        this.id = Number(id);

        this.store.dispatch(new GetInvestmentById({ id: this.id }));
      }
    });
  }

  public updateModel(): void {
    if (this.id != undefined) {
      this.store.pipe(select(selectInvestment)).subscribe((result) => {
        if (result) {
          this.investmentType = result.investmentType;
          this.addUpdateForm.patchValue(result);
          this.initializeForm();
        }
      });
    }
  }

  onSubmit() {
    if (this.id != undefined) {
      this.store.dispatch(
        new UpdateInvestment({
          investment: {
            id: this.id,
            quantity: this.addUpdateForm.controls.quantity.value,
            purchasePrice: this.addUpdateForm.controls.purchasePrice.value,
          },
        })
      );
    } else {      
      console.log('from create -> ', {
        assetId: this.addUpdateForm.controls.assetId.value,
        name: this.addUpdateForm.controls.name.value,
        quantity: this.addUpdateForm.controls.quantity.value,
        purchasePrice: this.addUpdateForm.controls.purchasePrice.value,
        investmentType: this.investmentType as InvestmentType,
        isFromOutsideProvider: true,
      });
      
      this.store.dispatch(
        new AddInvestment({
          investment: {
            assetId: this.addUpdateForm.controls.assetId.value,
            name: this.addUpdateForm.controls.name.value,
            quantity: this.addUpdateForm.controls.quantity.value,
            purchasePrice: this.addUpdateForm.controls.purchasePrice.value,
            investmentType: this.investmentType as InvestmentType,
            isFromOutsideProvider: true,
          },
        })
      );
    }

    this.router.navigate(['/my-investments']);
  }

  getCurrencyLabel(currency: number): string {
    return getCurrencyLabel(currency);
  }

  getInvestmentTypeLabel(investmentType: number): string {
    return getInvestmentTypeLabel(investmentType);
  }
}
