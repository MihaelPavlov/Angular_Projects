import {Component} from "@angular/core";
import {FormControl, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector:"test",
  templateUrl: "test.component.html"
})
export class TestComponent{
   myForm = new FormGroup({
    firstName: new FormControl('John'),
    lastName: new FormControl('Doe')
  });

  onSubmit(form: NgForm){

  }
}
