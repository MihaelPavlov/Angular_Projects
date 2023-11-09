import {Component} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

export interface Asset {
  name: string;
  symbol: string;
  status: string;
  about: string;
  change: number;
  marketCap: number;
}

const ELEMENT_DATA: Asset[] = [
  {symbol: "BTC", name: 'Bitcoin', status: 'On Market', about: 'Hdsadsa dqwd q dqwd wq', change: 10, marketCap:102},
  {symbol: "ETH", name: 'Ethereum', status: 'On Market', about: 'lorem20   ewqe wqewq', change: 210, marketCap:1012312},
  {symbol: "CAL", name: 'Calcium', status: 'Not On Market', about: 'He wqewq ewq', change: 10, marketCap:102},
  {symbol: "LID", name: 'Lido', status: 'Pre Sale', about: 'H', change: -45, marketCap:102},

];
@Component({
  selector: "watchlist",
  templateUrl: "watchlist.component.html",
  styleUrls: ["watchlist.component.css"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WatchlistComponent {
  displayedColumns: string[] = [ 'name', 'status', 'about', "change", "marketCap"];
  dataSource = ELEMENT_DATA;

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Asset | null;
}
