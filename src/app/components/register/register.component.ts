import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NotificationService} from "../../services/notification.service";
import {INotification} from "../../models/notification";
import {delay, timeout} from "rxjs";

@Component({
  selector: "register",
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private notificationService: NotificationService, private formBuilder: FormBuilder) {
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
      .getNotifications().pipe(delay(5000))
      .subscribe(result => {
        console.log('after timeout',result)
      this.notifications = result;

      const notificationsGroup: { [key: string]: FormControl } = {};

      for (const notification of this.notifications) {
        notificationsGroup[notification.name] = this.formBuilder.control(false);
      }

      this.registerForm.controls.notifications.controls = notificationsGroup;
    });
  }

  register() {
    console.log(this.registerForm);
  }
}
