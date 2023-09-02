import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {INews} from "../../../models/news";

@Component({
  selector: "details-modal",
  templateUrl: "details-pop-up.component.html",
  styleUrls: ["details-pop-up.component.css"]
})
export class DetailsPopUpComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: INews,
  ) {}
}
