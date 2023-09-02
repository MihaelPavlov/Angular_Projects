import {Injectable, TemplateRef} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  private modalRef: TemplateRef<any> | null = null;
  constructor() {
  }

  setModal(template: TemplateRef<any> ) {
    this.modalRef = template;
  }

  clearModal() {
    this.modalRef = null;
  }

  getModal() {
    return this.modalRef;
  }

}
