import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { getCurrencyLabel } from '../../../../enums/currency.enum';
import {
  getInvestmentTypeLabel,
  InvestmentType,
} from '../../../../enums/investment-type.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../../../models/user';
import { select, Store } from '@ngrx/store';
import { IInvestment } from '../../../models/investment';
import {
  AddInvestment,
  GetInvestmentById,
  UpdateInvestment,
} from '../portfolio.action';
import { selectInvestment } from '../portfolio.selectors';
import { IDigitalCurrency } from 'src/app/models/digital-currency';
import { IStock } from 'src/shared/services/stock.service';

@Component({
  selector: 'add-update-investment',
  templateUrl: 'add-update-investment.component.html',
  styleUrls: ['add-update-investment.component.css'],
})
export class AddUpdateInvestmentComponent implements OnInit {
  @Input('id') id: number | undefined;

  public investmentType: InvestmentType | null = null;
  public user!: IUser | null;
  public coins!: Observable<IDigitalCurrency[]>;
  public stocks!: Observable<IStock[]>;
  public collection$!: Observable<any[]>;
  public selectedAsset: string | null = null;
  public addUpdateForm = new FormGroup({
    assetId: new FormControl(),
    name: new FormControl(),
    quantity: new FormControl(),
    purchasePrice: new FormControl(),
    purchasePricePerUnit: new FormControl(),
  });

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{
      portfolio: { investments: IInvestment[] };
      coins: { coins: IDigitalCurrency[] };
      auth: { auth: IUser };
      stocks: { stocks: IStock[] };
    }>
  ) {}

  setCollection(collection: Observable<any>) {
    this.collection$ = collection;
  }

  ngOnInit() {
    this.initForm();
    this.updateModel();

    // this.store.pipe(select(selectAuthUser)).subscribe({
    //   next: response => {
    //     if (response != null) {
    //       this.user = response;
    //     }
    //   }
    // })
  }

  public initForm(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      let investmentType = params.get(
        'investmentType'
      ) as InvestmentType | null;

      this.investmentType = Number(investmentType);

      this.addUpdateForm
        .get('assetId')
        ?.valueChanges.subscribe((selectedAssetId) => {
          this.collection$.subscribe((assetList) => {
            const selectedAsset = assetList.find(
              (asset) => asset.symbol === selectedAssetId
            );

            if (selectedAsset) {
              this.addUpdateForm.get('name')?.setValue(selectedAsset.name);
            }
          });
        });

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
          this.selectedAsset = result.assetId;
          this.investmentType = result.investmentType;
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
            purchasePricePerUnit:
              this.addUpdateForm.controls.purchasePricePerUnit.value,
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
            purchasePricePerUnit:
              this.addUpdateForm.controls.purchasePricePerUnit.value,
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
