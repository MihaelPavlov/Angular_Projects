import {Component, Inject, OnInit} from "@angular/core";
import {IComment} from "../../../models/comment";
import {IUser} from "../../../models/user";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NewsInitialState} from "../new.reducer";
import {select, Store} from "@ngrx/store";
import * as fromNewsActions from "../news.action";
import * as fromNewsSelectors from "../news.selectors";
import {INews} from "../../../models/news";
import {Observable} from "rxjs";
import {selectAuthUser} from "../../../../shared/ngrx/auth/auth.selectors";

@Component({
  selector: "details-comments-modal",
  templateUrl: "details-comments-pop-up.component.html"
})
export class DetailsCommentsPopUpComponent implements OnInit {
  public user!: IUser | null
  public newCommentText: string = ''
  public updateCommentText: string = '';
  public newsById$!: Observable<INews | null>
  public isEditing: boolean = false;
  public editingComment!: IComment | null

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailsCommentsPopUpComponentData,
    private store: Store<NewsInitialState>
  ) {
  }

  ngOnInit() {
    this.store.pipe(select(selectAuthUser)).subscribe({
      next: response => {
        if (response != null) {
          this.user = response;
        }
      }
    })
    this.newsById$ = this.store.pipe(select(fromNewsSelectors.selectNewsById))

    this.store.dispatch(fromNewsActions.GetCommentsByNewsId({newsId: this.data.newsId}))
  }

  onAddComment() {
    let comment = {
      id: 0,
      newsId : this.data.newsId,
      userId: this.user != null ? this.user.id : undefined,
      comment: this.newCommentText,
      likes: 0
    }
    this.store.dispatch(fromNewsActions.CreateNewsComment({comment}));

    this.newCommentText = ''
  }

  onStartEditing(comment: IComment) {
    this.isEditing = true;
    this.editingComment = comment;
    this.updateCommentText = comment.comment;
  }

  onCancelEditing() {
    this.isEditing = false;
    this.editingComment = null;
    this.updateCommentText = '';
  }

  onEditSubmit() {
    if (this.editingComment != null) {
      this.editingComment = {...this.editingComment, comment: this.updateCommentText};

      this.store.dispatch(fromNewsActions.UpdateNewsComment({comment: this.editingComment, newsId: this.data.newsId}))
    }
    this.onCancelEditing();
  }

  onDeleteSubmit(commentId: number | undefined) {
    if (commentId == undefined) {
      return;
    }

    this.store.dispatch(fromNewsActions.DeleteNewsComment({commentId, newsId: this.data.newsId}))
  }
}

export interface DetailsCommentsPopUpComponentData {
  newsId: number
}
