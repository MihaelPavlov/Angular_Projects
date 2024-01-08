import {Component, Input, OnChanges} from "@angular/core";
import {ToastType} from "../../../models/toast";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: "errors",
  templateUrl: "errors.component.html"
})
export class ErrorsComponent implements OnChanges {
  @Input()
  errors: any | null = [];

  @Input()
  initialException: string | null = null;

  constructor(private toastService: ToastService) {
  }

  ngOnChanges(): void {
    if (this.initialException && this.errors?.length == 0) {
      this.toastService.error({message: "Something went wrong", type: ToastType.Error});
    }
  }
}
