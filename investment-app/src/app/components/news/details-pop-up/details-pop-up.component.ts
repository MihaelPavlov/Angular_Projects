import {Component, Inject} from "@angular/core";
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {INews} from "../../../models/news";
import {DetailsCommentsPopUpComponent} from "../details-comments-pop-up/details-comments-pop-up.component";

@Component({
  selector: "details-modal",
  templateUrl: "details-pop-up.component.html",
  styleUrls: ["details-pop-up.component.css"]
})
export class DetailsPopUpComponent {

  constructor(public dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: INews,
  ) {}

  openDialog( newsId: number) {
    this.dialog.open(DetailsCommentsPopUpComponent,{data: {newsId}});
  }
}

