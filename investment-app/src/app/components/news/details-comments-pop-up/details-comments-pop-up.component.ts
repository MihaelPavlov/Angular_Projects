import {AfterViewInit, Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IComment} from "../../../models/comment";
import {AuthService} from "../../../../lib/services/auth.service";
import {IUser} from "../../../models/user";
import {NewsCommentsService} from "../../../services/news-comments.service";

@Component({
  selector: "details-comments-modal",
  templateUrl: "details-comments-pop-up.component.html"
})
export class DetailsCommentsPopUpComponent implements OnInit, AfterViewInit {
  public user!: IUser | null
  public newCommentText: string = ''
  public comments: IComment[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailsCommentsPopUpComponentData,
    private authService: AuthService,
    private newsCommentsService: NewsCommentsService
  ) {
  }

  ngOnInit() {
    this.newsCommentsService.getCommentsByNewsId(this.data.newsId)
  }

  ngAfterViewInit() {
    this.authService.user$.subscribe(result => {
      this.user = result;
    })

    this.newsCommentsService.comments$.subscribe(result => {
      this.comments = result;
    })
  }

  onAddComment() {
    console.log("newwId", this.data.newsId)
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
}

export interface DetailsCommentsPopUpComponentData {
  newsId: number
}
