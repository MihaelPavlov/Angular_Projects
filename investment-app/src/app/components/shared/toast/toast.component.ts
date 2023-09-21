import {
  ChangeDetectionStrategy,
  Component, Inject,
  ViewEncapsulation,
} from '@angular/core';

import {IToast} from "../../../models/toast";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
@Component({
  selector: "error-snack-bar",
  templateUrl: "toast.component.html",
  styleUrls:["toast.component.css"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public toastData: IToast,
             @Inject(MatSnackBarRef)public snackBarRef : MatSnackBarRef<ToastComponent>) {
  }

  public getIconPathByType(type: string): string {
    if (type) {
      return `../../../../assets/images/${type}-toast-icon.svg`;
    }
    return '';
  }
}
