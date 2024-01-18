import { Component, OnInit, ViewChild } from '@angular/core';
import { INews } from '../../../models/news';
import { DetailsPopUpComponent } from '../details-pop-up/details-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { NewsInitialState } from '../new.reducer';
import { select, Store } from '@ngrx/store';
import * as fromNewsActions from '../news.action';
import * as fromNewsSelectors from '../news.selectors';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'news-list',
  templateUrl: 'news-list.component.html',
  styleUrls: ['news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  newsList$!: Observable<INews[]>;

  constructor(
    private store: Store<NewsInitialState>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.newsList$ = this.store.pipe(select(fromNewsSelectors.selectNewsList));

    this.store.dispatch(fromNewsActions.GetNews());
  }

  openDialog(news: INews) {
    this.dialog.open(DetailsPopUpComponent, { data: { ...news } });
  }
}
