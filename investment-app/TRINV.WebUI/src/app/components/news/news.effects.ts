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
import {
  ExtendedOperationResult,
  OperationResult,
} from 'src/app/models/operation-result.model';

@Injectable()
export class NewsEffects {
  getNewsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.GetNewsList),
      concatMap((_) => this.newsService.getNewsList()),
      map((operationResult: ExtendedOperationResult<INews[]>) => {
        return fromNews.GetNewsListSuccess({
          newsList: operationResult.relatedObject,
        });
      })
    )
  );

  getNewsById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.GetNewsById),
      concatMap((action) => this.newsService.getNewsById(action.id)),
      map((operationResult: ExtendedOperationResult<INews>) => {
        return fromNews.GetNewsByIdSuccess({
          news: operationResult.relatedObject,
        });
      })
    )
  );

  getNewsComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.GetCommentsByNewsId),
      switchMap((action) =>
        this.newsCommentsService.getCommentsByNewsId(action.newsId).pipe(
          map((operationResult: ExtendedOperationResult<IComment[]>) => {
            console.log(operationResult.relatedObject);

            return fromNews.GetCommentsByNewsIdSuccess({
              comments: operationResult.relatedObject,
            });
          })
        )
      )
    )
  );

  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.CreateNewsComment),
      switchMap(({ newsId, comment }) => {
        return this.newsCommentsService.createComment(newsId, comment).pipe(
          map((operationResult: OperationResult | null) => {
            console.log('result from create comment');
            if (operationResult == null || !operationResult.success) {
              this.toastService.error({
                message: 'Something get wrong',
                type: ToastType.Error,
              });
              return fromNews.CreateNewsCommentError({ operationResult });
            }

            return fromNews.CreateNewsCommentSuccess({ newsId });
          })
        );
      })
    )
  );

  createNewsCommentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.CreateNewsCommentSuccess),
      switchMap(({ newsId }) => {
        return this.newsCommentsService.getCommentsByNewsId(newsId).pipe(
          map((operationResult: ExtendedOperationResult<IComment[]>) => {
            if (!operationResult.success) {
              this.toastService.error({
                message: 'Something get wrong',
                type: ToastType.Error,
              });

              return fromNews.GetCommentsByNewsIdError({ operationResult });
            }

            return fromNews.GetCommentsByNewsIdSuccess({
              comments: operationResult.relatedObject,
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
          map((operationResult: OperationResult) => {
            this.toastService.success({
              message: 'Comment Delete',
              type: ToastType.Success,
            });
            return fromNews.DeleteNewsCommentSuccess({newsId});
          })
        )
      )
    )
  );

  deleteNewsCommentSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromNews.DeleteNewsCommentSuccess),
    switchMap(({ newsId }) => {
      return this.newsCommentsService.getCommentsByNewsId(newsId).pipe(
        map((operationResult: ExtendedOperationResult<IComment[]>) => {
          if (!operationResult.success) {
            this.toastService.error({
              message: 'Something get wrong',
              type: ToastType.Error,
            });

            return fromNews.GetCommentsByNewsIdError({ operationResult });
          }

          return fromNews.GetCommentsByNewsIdSuccess({
            comments: operationResult.relatedObject,
          });
        })
      );
    })
  )
);

  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.UpdateNewsComment),
      concatMap(({ newsId, commentId, comment }) =>
        this.newsCommentsService.updateComment(commentId, comment).pipe(
          map((operationResult: OperationResult | null) => {
            if (operationResult == null) {
              this.toastService.error({
                message: 'Something get wrong',
                type: ToastType.Error,
              });
              return fromNews.UpdateNewsCommentError({
                operationResult: operationResult,
              });
            }
            if (!operationResult.success) {
              return fromNews.UpdateNewsCommentError({
                operationResult: operationResult,
              });
            }

            this.toastService.success({
              message: 'Comment Updated',
              type: ToastType.Success,
            });
            return fromNews.UpdateNewsCommentSuccess({
              newsId,
            });
          })
        )
      )
    )
  );

  updateNewsCommentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNews.UpdateNewsCommentSuccess),
      switchMap(({ newsId }) => {
        return this.newsCommentsService.getCommentsByNewsId(newsId).pipe(
          map((operationResult: ExtendedOperationResult<IComment[]>) => {
            if (!operationResult.success) {
              this.toastService.error({
                message: 'Something get wrong',
                type: ToastType.Error,
              });

              return fromNews.GetCommentsByNewsIdError({ operationResult });
            }

            return fromNews.GetCommentsByNewsIdSuccess({
              comments: operationResult.relatedObject,
            });
          })
        );
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
