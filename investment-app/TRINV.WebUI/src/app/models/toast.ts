import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";

export interface IToast {
  message: string;
  type:ToastType
  data?: any;
  title?: string;
}
export enum ToastType {
  Success = 'success',
  Error = 'error',
}

export const TOAST_CLASS = {
  INFO: 'toast-info',
  SUCCESS: 'toast-success',
  ERROR: 'toast-error',
  WARNING: 'toast-warning',
  CUSTOM: 'toast-custom',
};


export const TOAST_DEFAULT_OPTIONS = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 222222000,
  },
};
