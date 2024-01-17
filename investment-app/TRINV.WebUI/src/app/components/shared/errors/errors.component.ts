import { Component, Input, OnChanges } from '@angular/core';
import { ToastType } from '../../../models/toast';
import { ToastService } from '../../../../shared/services/toast.service';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'errors',
  templateUrl: 'errors.component.html',
})
export class ErrorsComponent implements OnChanges {
  @Input()
  errors: ValidationErrors | null = null;

  @Input()
  initialException: any | null = null;

  constructor(private toastService: ToastService) {}

  ngOnChanges(): void {
    console.log(this.errors);
    console.log(this.initialException);

    if (this.initialException && Object.keys(this.errors!)?.length == 0) {
      this.toastService.error({
        message: 'Something went wrong',
        type: ToastType.Error,
      });
    }
  }

  getKeys(obj: ValidationErrors): string[] {
    if (obj) return Object.keys(obj);
    return [];
  }
}
