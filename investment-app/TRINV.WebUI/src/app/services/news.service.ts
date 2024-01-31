import { Injectable } from '@angular/core';
import { RestApiService } from '../../shared/services/rest-api.service';
import { Observable } from 'rxjs';
import { ExtendedOperationResult } from '../models/operation-result.model';
import { INews } from '../models/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private restApiService: RestApiService) {}

  getNewsList(): Observable<ExtendedOperationResult<INews[]>> {
    return this.restApiService.get<ExtendedOperationResult<INews[]>>('/news', {
      withCredentials: true,
    });
  }

  getNewsById(id: number): Observable<ExtendedOperationResult<INews>> {
    return this.restApiService.get<ExtendedOperationResult<INews>>(
      `/news/${id}`,
      { withCredentials: true }
    );
  }
}
