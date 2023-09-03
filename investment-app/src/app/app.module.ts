
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./components/register/register.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  AddUpdateInvestmentComponent
} from "./components/portfolio/add-update-investment/add-update-investment.component";
import {InvestmentListComponent} from "./components/portfolio/investment-list/investment-list.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {CurrencyToSymbolPipe} from "./pipes/currency-to-symbol.pipe";
import {InvestmentTypeToNamePipe} from "./pipes/investment-type-to-name.pipe";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {InvestmentDetailsComponent} from "./components/portfolio/investment-details/investment-details.component";
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {HttpModule} from "../lib/http/http.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ToolBarComponent} from "./components/toolbar/tool-bar.component";
import {NewsListComponent} from "./components/news/news-list/news-list.component";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import {ToastComponent} from "./components/shared/toast/toast.component";
import {TOAST_DEFAULT_OPTIONS} from "./models/toast";
import {
  DetailsPopUpComponent
} from "./components/news/details-pop-up/details-pop-up.component";
import {MatDialogModule} from "@angular/material/dialog";
import {
  DetailsCommentsPopUpComponent
} from "./components/news/details-comments-pop-up/details-comments-pop-up.component";
import {MatInputModule} from "@angular/material/input";

const routes: Routes = [
  {path: '', component: InvestmentListComponent},
  {path: 'create', component: AddUpdateInvestmentComponent},
  {path: 'update/:id', component: AddUpdateInvestmentComponent},
  {path: 'investment-details/:id', component: InvestmentDetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddUpdateInvestmentComponent,
    InvestmentListComponent,
    InvestmentDetailsComponent,
    CurrencyToSymbolPipe,
    InvestmentTypeToNamePipe,
    ToolBarComponent,
    NewsListComponent,
    ToastComponent,
    DetailsPopUpComponent,
    DetailsCommentsPopUpComponent
  ],
  imports: [
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
    RouterModule.forRoot(routes),
    HttpModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [TOAST_DEFAULT_OPTIONS],
  bootstrap: [AppComponent]
})
export class AppModule {
}