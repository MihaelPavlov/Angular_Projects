import { Component, Input } from '@angular/core';
import {AbstractControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-label',
  template: ` <label> <ng-content/> <span class="asteriskColor"> *</span> </label> `,
  styles: ['.asteriskColor { color:red }']
})
export class AppLabelComponent {
  @Input() for?: string;
  @Input() appFormControl!: AbstractControl;

  get required(): boolean {
     return this.appFormControl.hasValidator(Validators.required);
  }
}
