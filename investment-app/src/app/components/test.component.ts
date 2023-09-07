import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector:"test",
  templateUrl: "test.component.html"
})
export class TestComponent{

  onSubmit(form: NgForm){
    console.log(form)
  }
}
