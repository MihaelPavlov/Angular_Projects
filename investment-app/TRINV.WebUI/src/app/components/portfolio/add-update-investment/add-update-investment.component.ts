import {Component, Input, OnInit} from "@angular/core";
import {Currency, getCurrencyLabel} from "../../../../enums/currency.enum";
import {getInvestmentTypeLabel, InvestmentType,} from "../../../../enums/investment-type.enum";
import {FormControl, FormGroup} from "@angular/forms";
import {InvestmentService} from "../../../services/investment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../../../shared/services/auth.service";
import {IUser} from "../../../models/user";
import {ToastService} from "../../../../shared/services/toast.service";
import {select, Store} from "@ngrx/store";
import {IInvestment} from "../../../models/investment";
import {AddInvestment, GetInvestmentById, UpdateInvestment} from "../portfolio.action";
import {selectInvestment} from "../portfolio.selectors";
import {GetAllCoins} from "../../crypto_assets/crypto-assets.actions";
import {selectCoinList} from "../../crypto_assets/crypto-assets.selectors";
import { IDigitalCurrency } from "src/app/models/digital-currency";

@Component({
  selector: 'add-update-investment',
  templateUrl: 'add-update-investment.component.html',
  styleUrls: ['add-update-investment.component.css'],
})
export class AddUpdateInvestmentComponent implements OnInit {
  @Input('id') id: number | undefined;
  public user!: IUser | null;
  public currencies!: number[];
  public coins!: Observable<IDigitalCurrency[]>;
  public investmentTypes!: number[];
  public addUpdateForm = new FormGroup({
    assetId: new FormControl(),
    name: new FormControl(),
    quantity: new FormControl(),
    purchasePrice: new FormControl(),
    investmentType: new FormControl(),
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
    }>
  ) {}

  ngOnInit() {
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
      });
   

    this.coins = this.store.pipe(select(selectCoinList));
    this.store.dispatch(new GetAllCoins());

    this.currencies = Object.values(Currency).filter(
      (value) => typeof value === 'number'
    ) as number[];
    this.investmentTypes = Object.values(InvestmentType).filter(
      (value) => typeof value === 'number'
    ) as number[];

    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id != null) {
        this.id = Number(id);

        this.store.dispatch(new GetInvestmentById({ id: this.id }));
      }
    });

    this.updateModel();

    // this.store.pipe(select(selectAuthUser)).subscribe({
    //   next: response => {
    //     if (response != null) {
    //       this.user = response;
    //     }
    //   }
    // })
  }

  updateModel(): void {
    if (this.id != undefined) {
      this.store.pipe(select(selectInvestment)).subscribe((result) => {
        if (result) {
          console.log(result);
          this.addUpdateForm.patchValue(result);
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
      this.store.dispatch(
        new AddInvestment({
          investment: {
            assetId: this.addUpdateForm.controls.assetId.value,
            name: this.addUpdateForm.controls.name.value,
            quantity: this.addUpdateForm.controls.quantity.value,
            purchasePrice: this.addUpdateForm.controls.purchasePrice.value,
            investmentType: this.addUpdateForm.controls.investmentType.value,
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
