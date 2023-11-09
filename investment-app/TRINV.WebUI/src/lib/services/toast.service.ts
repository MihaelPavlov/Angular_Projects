import {Injectable} from "@angular/core";
import {ToastComponent} from "../../app/components/shared/toast/toast.component";
import {IToast, TOAST_CLASS} from "../../app/models/toast";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly snackBarRef: any;

  constructor(public toast: MatSnackBar) {}

  public success(data: IToast): void {
    this.toast.openFromComponent(ToastComponent, {
      data,
      panelClass: TOAST_CLASS.SUCCESS,
    });
  }

  public error(data: IToast): void {
    this.toast.openFromComponent(ToastComponent, {
      data,
      panelClass: ['test',TOAST_CLASS.ERROR],
    });
    console.error(`Error: ${data.message}`, data || '');
  }

  public closeSnackbar = () => {
    this.snackBarRef.dismiss();
  };
}
