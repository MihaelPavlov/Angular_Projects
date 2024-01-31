import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { IComment } from '../../../models/comment';
import { IUser } from '../../../models/user';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsInitialState } from '../new.reducer';
import { select, Store } from '@ngrx/store';
import * as fromNewsActions from '../news.action';
import { Observable } from 'rxjs';
import { selectNewsComments } from '../news.selectors';
import { AuthService } from 'src/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'details-comments-modal',
  templateUrl: 'details-comments-pop-up.component.html',
  styleUrls: ['details-comments-pop-up.component.scss'],
})
export class DetailsCommentsPopUpComponent implements OnInit {
  public userId!: number | null;
  public newCommentText: string = '';
  public updateCommentText: string = '';
  public isEditing: boolean = false;
  public editingComment!: IComment | null;
  public newsComments$!: Observable<IComment[]>;
  public userAuthenticated = false;

  public addUpdateComment = new FormGroup({
    comment: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public newsId: number,
    private store: Store<NewsInitialState>,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.userInfo$.subscribe((x) => {
      this.userId = x.id;
      this.cdRef.detectChanges();
    });
    this.newsComments$ = this.store.pipe(select(selectNewsComments));

    this.store.dispatch(
      fromNewsActions.GetCommentsByNewsId({ newsId: this.newsId })
    );
  }

  onAddComment() {
    if (this.addUpdateComment.controls.comment.value != null) {
      this.store.dispatch(
        fromNewsActions.CreateNewsComment({
          newsId: this.newsId,
          comment: this.addUpdateComment.controls.comment.value,
        })
      );

      this.addUpdateComment.controls.comment.reset();
    }
  }

  isCommentOnCurrentUser(createdBy: number): boolean {
    return this.userId?.toString() === createdBy.toString();
  }

  onStartEditing(comment: IComment) {
    this.isEditing = true;
    this.editingComment = comment;
    this.addUpdateComment.controls.comment.patchValue(comment.comment);
  }

  onCancelEditing() {
    this.isEditing = false;
    this.editingComment = null;
    this.addUpdateComment.controls.comment.patchValue(null);
  }

  onEditSubmit(commentId: number | undefined) {
    if (commentId) {
      const updateComment = this.addUpdateComment.controls.comment.value;
      if (updateComment) {
        this.store.dispatch(
          fromNewsActions.UpdateNewsComment({
            newsId: this.newsId,
            commentId,
            comment: updateComment,
          })
        );
      }
      this.onCancelEditing();
    }
  }

  onDeleteSubmit(commentId: number | undefined) {
    if (commentId == undefined) {
      return;
    }

    this.store.dispatch(
      fromNewsActions.DeleteNewsComment({ newsId: this.newsId, commentId })
    );
  }
}

export interface DetailsCommentsPopUpComponentData {
  newsId: number;
}
