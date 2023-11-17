import {Component} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {HistoryLogComponent} from "../../shared/history-log/history-log.component";

@Component({
  selector:"notification-settings",
  templateUrl:"notification-settings.component.html",
  styleUrls: ["notification-settings.component.css"]
})
export class NotificationSettingsComponent{

  constructor(public dialog: MatDialog){

  }
  openDialogHistoryLog(){
    this.dialog.open(HistoryLogComponent);

  }
}
