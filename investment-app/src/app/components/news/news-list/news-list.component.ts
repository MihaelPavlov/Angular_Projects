import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {INews} from "../../../models/news";
import {NewsService} from "../../../services/news.service";
import {ModalService} from "../../../../lib/services/modal.service";
import {DetailsPopUpComponent} from "../details-pop-up/details-pop-up.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: "news-list",
  templateUrl: "news-list.component.html",
  styleUrls: ["news-list.component.css"]
})
export class NewsListComponent implements OnInit, AfterViewInit {
  @ViewChild('modal') modal!: TemplateRef<any | null>
  newsList: INews[] = [];

  constructor(private newService: NewsService,public dialog: MatDialog ) {
  }

  ngOnInit() {
    this.newService.getNewsList()
  }

  ngAfterViewInit() {
    this.newService.news$.subscribe(result => {
      this.newsList = result;
    })

  }
  openDialog(news: INews) {
    this.dialog.open(DetailsPopUpComponent,{data: {...news}});
  }
}
