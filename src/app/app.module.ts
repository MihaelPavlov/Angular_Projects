
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

const routes: Routes = [
  {path: '', component: InvestmentListComponent},
  {path: 'create', component: AddUpdateInvestmentComponent},
  {path: 'update/:id', component: AddUpdateInvestmentComponent},
  {path: 'investment-details/:id', component: InvestmentDetailsComponent},
  {path: 'register', component: RegisterComponent},
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
    InvestmentTypeToNamePipe
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
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
