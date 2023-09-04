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
    this.getAllComments().subscribe({
      next: response => {
        comment.id = response.reduce((max, comment) => {
          return comment.id > max ? comment.id : max;
        }, -1) + 1;

        console.log(response)
        console.log("commentId", comment.id)

        this.restApiService.post<IComment>(`comments`, {...comment}).subscribe({
          next: response => {
            this.getCommentsByNewsId(comment.newsId)

          }
        })
      }
    })

  }

  updateComment(comment: IComment): Observable<IComment | null> {
    return this.restApiService.put<IComment>(`comments/${comment.id}`, comment)
  }

  deleteComment(commentId: number): Observable<any>{
    return this.restApiService.delete(`comments/${commentId}`);
  }
}
