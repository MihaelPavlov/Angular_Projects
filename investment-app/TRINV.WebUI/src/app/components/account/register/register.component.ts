import {
  AfterViewInit,
  Component, ElementRef, Input,
  OnInit,
  QueryList,
  ViewChildren
} from "@angular/core";
import {AuthService} from "../../../../shared/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import { ValidationErrors } from "src/app/models/validation-errors.model";

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit {
  errors = new BehaviorSubject<ValidationErrors | null>(null);
  initialException = new BehaviorSubject<any | null>(null);
  registrationForm!: FormGroup;
  @ViewChildren('inputElement') errorElements!: QueryList<ElementRef>;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      // confirmPassword: [''],
      // location: this.fb.group({
      //   city: [''],
      //   address: [''],
      //   street: ['']
      // }),
      // notifications: this.fb.group({
      //   // Add form controls for notifications as needed
      // })
    });

    this._authService.errors$.subscribe((x: any) => {
      this.errors.next(x);
      const validationError = x as ValidationErrors;

      let keys = Object.keys(validationError);

      this.errorElements.forEach((errorElement: ElementRef) => {
        errorElement.nativeElement.classList.remove('errorBorder');
        if (
          keys.find(
            (er: any) => er.toLowerCase() === errorElement.nativeElement.id
          )
        ) {
          errorElement.nativeElement.classList.add('errorBorder');
        }
      });
    });

    this._authService.initialException$.subscribe((x) => {
      this.initialException.next(x);
    });
  }
  public register(): void {
    if (this.registrationForm.valid) {
      // Process form data
      let values = this.registrationForm.value;
      this._authService.register(
        values.username,
        values.email,
        values.password
      );
    }
  }

  public login(): void {
    this._authService.loginStart();
  }
}