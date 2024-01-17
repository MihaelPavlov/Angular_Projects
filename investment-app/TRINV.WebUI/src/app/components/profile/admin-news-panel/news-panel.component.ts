import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { INews } from "src/app/models/news";
import { NewsInitialState } from "../../news/new.reducer";
import { Store, select } from "@ngrx/store";
import * as fromNewsSelectors from '../../news/news.selectors';
import * as fromNewsActions from '../../news/news.action';


@Component({
  selector: 'news-panel',
  templateUrl: 'news-panel.component.html',
  styleUrls:["news-panel.component.scss"]
})
export class NewsPanelComponent {
  newsList$!: Observable<INews[]>;

  constructor(
    private store: Store<NewsInitialState>
  ) {}

  ngOnInit() {
    this.newsList$ = this.store.pipe(select(fromNewsSelectors.selectNewsList));

    this.store.dispatch(fromNewsActions.GetNews());
  }

  //TODO: Need to create new model for AdminNews
  //Addition logic for reviewing approving and declining the news writed by users or external writes
  //Visualize the news in four different type.
  // 1. News Created By Users, 2. News Created From Administrator, 3. News Created from External Writes, 4. News thats need approving
  // Think about the process of approving. To be more decentralized. To people participate in the approving process.
  // Think about easy way to tip the writes with crypto.

}