import { Component, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../../shared/services/toast.service";
import {select, Store} from "@ngrx/store";

@Component({
  selector: "login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit{
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [this.validatePassword()])
  })
  isLoading: boolean = false;

  constructor( private authService: AuthService, private router: Router, private toastService: ToastService) {

  }
 ngOnInit() {

  // this.store.pipe(select(selectAuthIsLoading)).subscribe({
  //   next: response => {
  //     this.isLoading = response;
  //   }
  // });
}

  loginSubmit() {
    // this.store.dispatch(new Login({
    //   email: String(this.loginForm.controls.email.value),
    //   password: String(this.loginForm.controls.password.value)
    // }));

  }

  validatePassword()
    :
    ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      let password = control.value;
      if (password == '' || password?.length! > 10 || password?.length! < 3) {
        return {isPasswordValid: false};
      }

      return {isPasswordValid: true};
    }
  }
}
