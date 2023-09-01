import {AfterViewInit, Component, OnInit} from "@angular/core";
import {INews} from "../../../models/news";
import {NewsService} from "../../../services/news.service";

@Component({
  selector: "news-list",
  templateUrl: "news-list.component.html",
  styleUrls: ["news-list.component.css"]
})
export class NewsListComponent implements OnInit, AfterViewInit {
  newsList: INews[] = [];

  constructor(private newService: NewsService) {
  }

  ngOnInit() {
    this.newService.getNewsList()
  }

  ngAfterViewInit() {
    this.newService.news$.subscribe(result => {
      this.newsList = result;
    })
  }


}
