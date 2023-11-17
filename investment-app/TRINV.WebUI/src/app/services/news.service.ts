import {Injectable} from "@angular/core";
import {RestApiService} from "../../shared/services/rest-api.service";
import {Observable} from "rxjs";
import {INews} from "../models/news";

@Injectable({
  providedIn: "root"
})
export class NewsService {

  constructor(private restApiService: RestApiService) {

  }

  getNewsList(): Observable<INews[]> {
    return this.restApiService.get<INews[]>("news");
  }

  getNewsById(id: number): Observable<INews | null> {
    return this.restApiService.get<INews | null>(`news/${id}`);

  }
}
