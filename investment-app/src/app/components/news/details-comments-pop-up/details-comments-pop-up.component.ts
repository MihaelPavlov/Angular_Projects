import {AfterViewInit, Component, Inject, OnInit} from "@angular/core";
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from "@angular/material/legacy-dialog";
import {IComment} from "../../../models/comment";
import {AuthService} from "../../../../lib/services/auth.service";
import {IUser} from "../../../models/user";
import {NewsCommentsService} from "../../../services/news-comments.service";
import {ToastService} from "../../../../lib/services/toast.service";
import {ToastType} from "../../../models/toast";

@Component({
  selector: "details-comments-modal",
  templateUrl: "details-comments-pop-up.component.html"
})
export class DetailsCommentsPopUpComponent implements OnInit, AfterViewInit {
  public user!: IUser | null
  public newCommentText: string = ''
  public updateCommentText: string = '';
  public comments: IComment[] = []
  public isEditing: boolean = false;
  public editingComment!: IComment | null

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailsCommentsPopUpComponentData,
    public authService: AuthService,
    private newsCommentsService: NewsCommentsService,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.newsCommentsService.getCommentsByNewsId(this.data.newsId)
  }

  ngAfterViewInit() {
    console.log('isAuthenticated' , this.authService.isAuthenticated())
    this.authService.user$.subscribe(result => {
      this.user = result;
    })

    this.newsCommentsService.comments$.subscribe(result => {
      this.comments = result;
    })
  }

  onAddComment() {
    let newsId = this.data.newsId;
    this.newsCommentsService.createComment({
      id: 0,
      newsId,
      userId: this.user != null ? this.user.id : undefined,
      comment: this.newCommentText,
      likes: 0
    })

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
      this.editingComment.comment = this.updateCommentText;
      this.newsCommentsService.updateComment({
        ...this.editingComment
      }).subscribe({
        next: response => {
          this.toastService.success({message: "Comment Updated", type: ToastType.Success});
        },
        error: response => {
          this.toastService.error({message: "Something Get Wrong", type: ToastType.Error});
        }
      })
    }
    this.onCancelEditing();
  }

  onDeleteSubmit(commentId: number) {
      this.newsCommentsService.deleteComment(commentId).subscribe({
        next: response => {
          this.newsCommentsService.getCommentsByNewsId(this.data.newsId)
          this.toastService.success({message: "Comment Delete", type: ToastType.Success});
        },
        error: response => {
          this.toastService.error({message: "Something Get Wrong", type: ToastType.Error});
        }
      })
  }
}

export interface DetailsCommentsPopUpComponentData {
  newsId: number
}
