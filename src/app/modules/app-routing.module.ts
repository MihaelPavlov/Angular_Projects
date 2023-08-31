import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {InvestmentDetailsComponent} from "../components/portfolio/investment-details/investment-details.component";
import {AppComponent} from "../app.component";
import {InvestmentListComponent} from "../components/portfolio/investment-list/investment-list.component";

export const routes: Routes = [
  {path: '/', component: InvestmentListComponent, },
  {path: 'investment-details/:id', component: InvestmentDetailsComponent},
]

@NgModule({

  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
