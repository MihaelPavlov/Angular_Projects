import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../../shared/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: "register",
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  errors = new BehaviorSubject<string[] | null>(null);
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private _authService: AuthService) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
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

    this._authService.errors.subscribe(x=>{
      this.errors.next(x);
    })
  }

  public register(): void {
    let values = this.registrationForm.value;
    console.log("registration form -> ", values.username, values.email, values.password);
    this._authService.register(values.username, values.email, values.password)
  }

  public login(): void {
    this._authService.loginStart()
  }
}
