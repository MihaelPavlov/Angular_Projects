import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {UseOfBehaviorSubjectComponent} from "./use-of-behavior-subject/use-of-behavior-subject.component";
import {BasicNgrxComponent} from "./basic-ngrx/basic-ngrx.component";
import {NgrxFacadePatternComponent} from "./ngrx-facade-pattern/ngrx-facade-pattern.component";
import {MainRxjsOperationsComponent} from "./main-rxjs-operations/main-rxjs-operations.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, UseOfBehaviorSubjectComponent, BasicNgrxComponent, NgrxFacadePatternComponent, MainRxjsOperationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'communication';
}
