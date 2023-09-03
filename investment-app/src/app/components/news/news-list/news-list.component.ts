import {AfterViewInit, Component, OnInit, } from "@angular/core";
import {INews} from "../../../models/news";
import {NewsService} from "../../../services/news.service";
import {DetailsPopUpComponent} from "../details-pop-up/details-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {NewsCommentsService} from "../../../services/news-comments.service";

@Component({
  selector: "news-list",
  templateUrl: "news-list.component.html",
  styleUrls: ["news-list.component.css"]
})
export class NewsListComponent implements OnInit, AfterViewInit {
  newsList: INews[] = [];
  constructor(private newService: NewsService,private newsCommentsService: NewsCommentsService,public dialog: MatDialog ) {
  }

  ngOnInit() {
    this.newService.getNewsList()
  }

  ngAfterViewInit() {
    this.newService.news$.subscribe(result => {
      this.newsList = result;
      this.newsCommentsService.getAllComments().subscribe(result=>{
        this.newsList.forEach(x=>{
          x.comments = result.filter(c=>c.newsId === x.id)
        })
      })

    })

  }
  openDialog(news: INews) {
    this.dialog.open(DetailsPopUpComponent,{data: {...news}});
  }
}
