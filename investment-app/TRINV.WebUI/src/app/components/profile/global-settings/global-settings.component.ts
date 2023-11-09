import {Component, ViewChild} from "@angular/core";
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector:"global-settings",
  templateUrl:"global-settings.component.html",
  styleUrls:["global-settings.component.css"]
})
export class GlobalSettingsComponent{
  @ViewChild(MatAccordion) accordion!: MatAccordion;

}
