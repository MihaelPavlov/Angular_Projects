import {Injectable} from "@angular/core";
import {RestApiService} from "../../lib/services/rest-api.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {IComment} from "../models/comment";

@Injectable({
  providedIn: "root"
})
export class NewsCommentsService {
  private commentsSubject$ = new BehaviorSubject<IComment[]>([])
  public comments$ = this.commentsSubject$.asObservable()

  constructor(private restApiService: RestApiService) {
  }

  getCommentsByNewsId(newsId: number) {
    this.restApiService.get<IComment[]>(`comments`)
      .pipe(map(x => x.filter(y => y.newsId === newsId)))
      .subscribe({
        next: response => {
          this.commentsSubject$.next(response);
        }
      })
  }

  getAllComments(): Observable<IComment[]> {
    return this.restApiService.get<IComment[]>("comments");
  }

  createComment(comment: IComment) {
    comment.id = this.commentsSubject$.value.reduce((max, comment) => {
      return comment.id > max ? comment.id : max;
    }, -1) + 1;

    this.restApiService.post<IComment>(`comments`, {...comment}).subscribe({
      next: response => {
        this.getCommentsByNewsId(comment.newsId)

      }
    })

  }
}
