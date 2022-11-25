import {Component, OnInit, TemplateRef, Type} from '@angular/core';
import {ModalButtons} from "./modal-buttons";
import {ModalRef} from "./modal-ref";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  contentType!: 'template' | 'string' | 'component';
  content!: string | TemplateRef<any> | Type<any>;
  modalSize: 'normal' | 'large' | undefined = 'normal';
  fullScreen: boolean | undefined = false;
  backdropClose: boolean | undefined = true;
  buttons: Array<ModalButtons> = [];
  context: any;
  constructor(private ref: ModalRef) { }

  close() {
    this.ref.close(null);
  }

  ngOnInit(): void {
    this.content = this.ref.modal.content;
    this.modalSize = this.ref.modal.size;
    this.fullScreen = this.ref.modal.fullScreen;
    if (this.ref.modal.backdropClose === undefined) {
      this.backdropClose = true;
    } else {
      this.backdropClose = this.ref.modal.backdropClose;
    }
    if (this.ref.modal.buttons !== undefined)  {
      this.buttons = this.ref.modal.buttons;
    }


    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
      console.log(this.contentType, this.content);
    }
  }

}
