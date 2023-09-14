import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {IInvestment} from "../../../models/investment";
import {InvestmentService} from "../../../services/investment.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {AuthService} from "../../../../lib/services/auth.service";
import {IUser} from "../../../models/user";
import {ToastService} from "../../../../lib/services/toast.service";
import {ToastType} from "../../../models/toast";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Form, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "investment-list",
  templateUrl: "investment-list.component.html",
  styleUrls: ["investment-list.component.css"]
})
export class InvestmentListComponent implements OnInit, AfterViewInit {
  user?: IUser | null
  dataSource!: MatTableDataSource<IInvestment>;
  displayedColumns: string[] = ['investmentName', 'symbol', 'quantity', 'purchasePrice', 'investmentType', 'actions'];
  filterColumns: { id: number, value: string }[] = Object.keys(Fields).map(x => ({
    id: Number(x),
    value: this.getEnumTextByKey(Number(x))
  })).filter(x => x.value !== "")
  labels: string[] = []
  areFilterShown: boolean = false;
  selectedColumn!: string
  filterText!: string
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("#applyFilter") myFilter!: TemplateRef<any>

  filterForm = new FormGroup({
    "filters": new FormArray([]),
    "filtersIds": new FormArray([])
  });

  constructor(private investmentService: InvestmentService, private router: Router,
              private authService: AuthService, private toastService: ToastService) {
    this.authService.user$.subscribe(result => {
      this.user = result;
    })
  }

  ngOnInit() {
    this.investmentService.getInvestments(Number(this.user?.id)).subscribe(x => {
      this.investmentService.fetchInvestments(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {

    this.investmentService.investment$.subscribe(x => {

      this.dataSource = new MatTableDataSource<IInvestment>(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  redirectToDetailsPage(id: number): void {
    this.router.navigate(['investment-details', id]);
  }

  onDelete(id: number): void {
    this.investmentService.delete(id).subscribe({
      next: response => {
        this.toastService.success({message: 'Successfully Deleted', type: ToastType.Success})
        this.investmentService.getInvestments(Number(this.user?.id)).subscribe(x => {
          this.investmentService.fetchInvestments(x);
        });
      },
      error: response => {
        this.toastService.error({message: 'Something get wrong', type: ToastType.Error})
      }
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['update', id]);
  }

  showFilters() {
    console.log(this.filterForm.controls.filters)
    this.areFilterShown = !this.areFilterShown;
    console.log('selected column ->', this.selectedColumn)
    console.log('filtered text ->', this.filterText)
  }

  AddInput(column: { id: number, value: string }) {
    console.log("add input", column);
    this.labels.push(column.value);
    console.log('labels', this.labels);
    (<FormArray>this.filterForm.get('filters')).push(new FormControl(null, Validators.required));
    (<FormArray>this.filterForm.get('filtersIds')).push(new FormControl(column.id, Validators.required));
  }

  removeInput(index: number) {
    (<FormArray>this.filterForm.get('filters')).removeAt(index);
    (<FormArray>this.filterForm.get('filtersIds')).removeAt(index);
    this.labels.splice(index, 1);
  }

//TODO: combine filter and filtersIds into one object {id: fromFilterId: value: from filters}
  onSubmitFilters() {
    console.log('filter form -=>', this.filterForm.controls.filters.controls)
    console.log('filterIDS form -=>', this.filterForm.controls.filtersIds.controls)
    let filterObj = this.filterForm.controls.filters.controls.map((value, index) => ({
      id: (this.filterForm.controls.filtersIds.controls[index] as any).value,
      value: (value as any).value,
    }));
  }

  getEnumValueByName(enumName: string): number | undefined {
    return Fields[enumName as keyof typeof Fields];
  }

  getEnumTextByKey(key: number): string {
    switch (key) {
      case Fields.investmentName:
        return "Investment Name";
      case Fields.symbol:
        return "Symbol";
      case Fields.quantity:
        return "Quantity";
      case Fields.purchasePrice:
        return "Purchase Price";
      case Fields.investmentType:
        return "Investment Type";
    }
    return "";
  }
}

export enum Fields {
  investmentName = 0,
  symbol = 1,
  quantity = 2,
  purchasePrice = 3,
  investmentType = 4,
}

