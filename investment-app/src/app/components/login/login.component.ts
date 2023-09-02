import { Component} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../lib/services/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../lib/services/toast.service";
import {ToastType} from "../../models/toast";

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

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {

  }

  loginSubmit() {
    this.authService.login(String(this.loginForm.controls.username.value), String(this.loginForm.controls.password.value)).subscribe({
      next: result => {
        if (result.length != 0) {
          this.authService.fetchUser(result[0]);
          this.toastService.success({message: "Successfully Login", type: ToastType.Success})
          this.router.navigate(["/"])
        } else {
          this.toastService.error({message: "Something get wrong", type: ToastType.Error})
        }
      },
      error: response => {
        this.toastService.error({message: `Something get wrong ${response}`, type: ToastType.Error})
      }
    })
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
