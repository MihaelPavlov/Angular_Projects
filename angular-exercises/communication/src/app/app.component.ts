import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {UseOfBehaviorSubjectComponent} from "./use-of-behavior-subject/use-of-behavior-subject.component";
import {BasicNgrxComponent} from "./basic-ngrx/basic-ngrx.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UseOfBehaviorSubjectComponent, BasicNgrxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'communication';
}
