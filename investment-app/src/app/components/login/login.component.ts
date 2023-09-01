import {AfterViewInit, Component, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../lib/services/auth.service";
import {IUser} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.minLength(2), Validators.maxLength(10)]),
    password: new FormControl('', [this.validatePassword()])
  })

  constructor(private authService: AuthService, private router: Router) {

  }

  loginSubmit() {
    this.authService.login(String(this.loginForm.controls.username.value), String(this.loginForm.controls.password.value))
    this.router.navigate(["/"])
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      let password = control.value;
      if (password == '' || password?.length! > 10 || password?.length! < 3) {
        return {isPasswordValid: false};
      }

      return {isPasswordValid: true};
    }
  }
}
