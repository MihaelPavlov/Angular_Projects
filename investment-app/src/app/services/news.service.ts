import {Injectable} from "@angular/core";
import {RestApiService} from "../../lib/services/rest-api.service";
import {BehaviorSubject} from "rxjs";
import {INews} from "../models/news";
import {IInvestment} from "../models/investment";

@Injectable({
  providedIn: "root"
})
export class NewsService {
  private newsSubject$ = new BehaviorSubject<INews[]>([])
  public news$ = this.newsSubject$.asObservable()

  constructor(private restApiService: RestApiService) {

  }

  getNewsList(): void {
    this.restApiService.get<INews[]>("news").subscribe({
      next: response => {
        this.newsSubject$.next(response);
        console.log('news', response)
      },
      error: response => {
        console.log('error', response)
      }
    })
  }

}
