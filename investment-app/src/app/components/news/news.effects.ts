import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ToastService} from "../../../lib/services/toast.service";
import {NewsService} from "../../services/news.service";
import * as fromNews from "./news.action";
import {concatMap, from, map} from "rxjs";
import {INews} from "../../models/news";
import {NewsCommentsService} from "../../services/news-comments.service";
import {Update} from "@ngrx/entity";
import {IComment} from "../../models/comment";
import {selectAll} from "./new.reducer";

@Injectable()
export class NewsEffects {
  getNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.GetNews),
      concatMap(action => this.newsService.getNewsList()),
      map((news: INews[]) => fromNews.GetNewsSuccess({news}))
    )
  )

  getNewsComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.GetCommentsByNewsId),
      concatMap(x => this.newsCommentsService.getCommentsByNewsId(x.newsId)),
      map((comments: IComment[]) => {
        return fromNews.GetCommentsByNewsIdSuccess({comments: comments});
      })
    )
  )

  constructor(private actions$: Actions, private newsService: NewsService, private newsCommentsService: NewsCommentsService,
              private toastService: ToastService
  ) {
  }


}
