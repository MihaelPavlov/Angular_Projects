import {Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NotificationService} from "../../services/notification.service";
import {INotification} from "../../models/notification";
import {delay} from "rxjs";
import {AuthService} from "../../../lib/services/auth.service";
import {IUser} from "../../models/user";
import {Router} from "@angular/router";


@Component({
  selector: "register",
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChildren("notificaions") notificaions: QueryList<ElementRef> | undefined;

  constructor(private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    location: new FormGroup({
      city: new FormControl(),
      address: new FormControl(),
      street: new FormControl
    }),
    notifications: new FormGroup({})
  })

  notifications: INotification[] | undefined

  ngOnInit() {
    this.notificationService
      .getNotifications().pipe(delay(1000))
      .subscribe(result => {
        console.log('after timeout', result)
        this.notifications = result;

        const notificationsGroup: { [key: string]: FormControl } = {};

        for (const notification of this.notifications) {
          notificationsGroup[notification.name] = this.formBuilder.control(false);
        }

        this.registerForm.controls.notifications.controls = notificationsGroup;
      });
  }

  registerSubmit() {
    let notificaions: INotification[] = [];

    this.notificaions?.forEach(element => {
      const name = element.nativeElement.querySelector('input').name;
      const formControl = this.registerForm.get(`notifications.${name}`);

      if (formControl && formControl.value) {
        const id = element.nativeElement.querySelector('input').id;

        let obj: INotification = {
          id,
          name
        }
        notificaions.push(obj);
      }
    })

    const user: IUser = {
      id: 0, // Generated on the server
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value,
      location: {
        city: this.registerForm.controls.location.value.city,
        address: this.registerForm.controls.location.value.address,
        street: this.registerForm.controls.location.value.street
      },
      notifications: notificaions
    };

    this.authService.register(user);

    //TODO: show a little loading screen
    this.router.navigate(["/"]);
  }
}
