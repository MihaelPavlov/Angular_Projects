import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {InvestmentDetailsComponent} from "../components/portfolio/investment-details/investment-details.component";
import {InvestmentListComponent} from "../components/portfolio/investment-list/investment-list.component";
import {
  AddUpdateInvestmentComponent
} from "../components/portfolio/add-update-investment/add-update-investment.component";
import {RegisterComponent} from "../components/register/register.component";
import {LoginComponent} from "../components/login/login.component";
import {AuthGuardService} from "../guards/auth-guard.service";
import {TestComponent} from "../components/test.component";
import {NewsListComponent} from "../components/news/news-list/news-list.component";
import {HomeComponent} from "../components/home/home.component";
import {CoinsComponent} from "../components/crypto_assets/coins/coins.component";
import {ProfileComponent} from "../components/profile/profile.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'my-investments', component: InvestmentListComponent},
  {path: 'create', canActivate: [AuthGuardService], component: AddUpdateInvestmentComponent},
  {path: 'update/:id', component: AddUpdateInvestmentComponent},
  {path: 'investment-details/:id', component: InvestmentDetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'news', component: NewsListComponent},
  {path: 'test', component: TestComponent},
  {path: 'coins', component: CoinsComponent},
  {path: 'profile', component: ProfileComponent}
]

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
