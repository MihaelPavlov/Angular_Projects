import { Component, Inject, OnInit } from '@angular/core';
import { INews } from '../../../models/news';
import { DetailsCommentsPopUpComponent } from '../details-comments-pop-up/details-comments-pop-up.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectNewsById } from '../news.selectors';
import { GetNewsById } from '../news.action';

@Component({
  selector: 'details-modal',
  templateUrl: 'details-pop-up.component.html',
  styleUrls: ['details-pop-up.component.css'],
})
export class DetailsPopUpComponent implements OnInit {
  public news$!: Observable<INews | null>;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private store: Store
  ) {}

  public ngOnInit(): void {
       this.store.dispatch(
          GetNewsById({id:this.id})
       );
    this.news$ = this.store.pipe(select(selectNewsById));
  }

  redirectToComments(newsId: number) {
    this.dialog.open(DetailsCommentsPopUpComponent, { data: newsId});
  }
}
