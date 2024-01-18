import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NewsService } from '../../services/news.service';
import * as fromNews from './news.action';
import { concatMap, map, switchMap } from 'rxjs';
import { INews } from '../../models/news';
import { NewsCommentsService } from '../../services/news-comments.service';
import { IComment } from '../../models/comment';
import { ToastService } from '../../../shared/services/toast.service';
import { ToastType } from '../../models/toast';
import { OperationResult } from 'src/app/models/operation-result.model';

@Injectable()
export class NewsEffects {
  getNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.GetNews),
      concatMap((_) => this.newsService.getNewsList()),
      map((operation: OperationResult<INews[]>) => {
        return fromNews.GetNewsSuccess({ news: operation.relatedObject });
      })
    )
  );
  getNewsComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.GetCommentsByNewsId),
      switchMap((action) =>
        this.newsCommentsService.getCommentsByNewsId(action.newsId).pipe(
          map((comments: IComment[]) => {
            return fromNews.GetCommentsByNewsIdSuccess({
              comments: comments,
              newsId: action.newsId,
            });
          })
        )
      )
    )
  );

  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.CreateNewsComment),
      switchMap(({ comment }) => {
        return this.newsCommentsService.createComment(comment).pipe(
          map((comment: IComment | null) => {
            if (comment != null) {
              this.toastService.success({
                message: 'Comment Created',
                type: ToastType.Success,
              });

              return fromNews.CreateNewsCommentSuccess({ comment });
            }
            this.toastService.error({
              message: 'Something get wrong',
              type: ToastType.Error,
            });

            return fromNews.CreateNewsCommentError({
              error: 'Comment was not created',
            });
          })
        );
      })
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.DeleteNewsComment),
      switchMap(({ commentId, newsId }) =>
        this.newsCommentsService.deleteComment(commentId).pipe(
          map(() => {
            this.toastService.success({
              message: 'Comment Delete',
              type: ToastType.Success,
            });
            return fromNews.DeleteNewsCommentSuccess();
          })
        )
      )
    )
  );

  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.UpdateNewsComment),
      concatMap(({ comment, newsId }) =>
        this.newsCommentsService.updateComment({ ...comment })
      ),
      map((comment: IComment | null) => {
        if (comment == null) {
          this.toastService.error({
            message: 'Something get wrong',
            type: ToastType.Error,
          });
          return fromNews.UpdateNewsCommentError({
            error: 'Comment was not updated',
          });
        }

        this.toastService.success({
          message: 'Comment Updated',
          type: ToastType.Success,
        });
        return fromNews.UpdateNewsCommentSuccess({
          comment,
          newsId: comment.newsId,
        });
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly newsService: NewsService,
    private readonly newsCommentsService: NewsCommentsService,
    private readonly toastService: ToastService
  ) {}
}
