import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {HttpModule} from "../../../shared/http/http.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {AppRoutingModule} from "../app-routing.module";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from "@angular/material/sidenav";
import {LoadingSpinnerComponent} from "../../components/shared/spinner/spinner.component";
import {CurrencyToSymbolPipe} from "../../pipes/currency-to-symbol.pipe";
import {InvestmentTypeToNamePipe} from "../../pipes/investment-type-to-name.pipe";
import {FormatNumberWithColorPipe} from "../../pipes/format-number-with-color.pipe";
import {FormatNumberPipe} from "../../pipes/round-number.pipe";
import {ToastComponent} from "../../components/shared/toast/toast.component";
import {DataListService} from "../../services/data-list.servie";
import {AuthGuardService} from "../../../shared/http/auth-guard.service";
import {TOAST_DEFAULT_OPTIONS} from "../../models/toast";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../../../shared/http/auth.interceptor";

const pipes = [
  CurrencyToSymbolPipe,
  InvestmentTypeToNamePipe,
  FormatNumberWithColorPipe,
  FormatNumberPipe
]

const components = [
  LoadingSpinnerComponent,
  ToastComponent
]

const services = [
  DataListService,
  AuthGuardService
]

@NgModule({
  imports:[
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    HttpModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    AppRoutingModule,
    MatSortModule,
    MatTooltipModule,
    MatTabsModule,
    MatSidenavModule,
  ],
  providers:[
    ...services,
    TOAST_DEFAULT_OPTIONS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  declarations:[
    ...components,
    ...pipes,
  ],
  exports:[
    ...components,
    ...pipes,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    HttpModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    AppRoutingModule,
    MatSortModule,
    MatTooltipModule,
    MatTabsModule,
    MatSidenavModule,
  ]
})
export class SharedModule {}
