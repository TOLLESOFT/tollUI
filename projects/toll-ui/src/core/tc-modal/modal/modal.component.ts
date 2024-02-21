import {AfterViewInit, Component, OnInit, TemplateRef, Type} from '@angular/core';
import {ModalButtons} from "../modal-buttons";
import {ModalRef} from "../modal-ref";
import {animate, style, transition, trigger} from "@angular/animations";
import {BaseService} from "../../base.service";

@Component({
  selector: 'tc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [trigger('enterLeave', [
    transition(':enter', [
      style({ transform: 'scale(0%)' }),
      animate('100ms ease-in')
    ]),
    transition(':leave', [
      animate('100ms ease-out', style({ transform: 'scale(0%)' }))
    ])
  ])]
})
export class ModalComponent implements OnInit, AfterViewInit {
  id = BaseService.uuid();
  contentType!: 'template' | 'string' | 'component';
  content!: string | TemplateRef<any> | Type<any>;
  modalSize: 'normal' | 'large' | undefined = 'normal';
  fullScreen: boolean | undefined = false;
  backdropClose: boolean | undefined = true;
  rounded = '';
  buttons: Array<ModalButtons> = [];
  context: any;
  modalCss = '';
  open = true;
  height : 'fill' | undefined = undefined;
  center: boolean | undefined = true;
  constructor(private ref: ModalRef) {
    this.ref.afterClosed$.subscribe({
      next: (() => {
        this.open = false;
      })
    })
  }

    ngAfterViewInit(): void {
        this.ref.open(this.content);
    }

  close() {
    this.ref.close(null);
  }

  ngOnInit(): void {
    this.content = this.ref.modal.content;
    this.modalSize = this.ref.modal.size;
    this.fullScreen = this.ref.modal.fullScreen;
    this.rounded = `rounded-${this.ref.modal.rounded}`;
    if (this.ref.modal.center !== undefined) {
      this.center = this.ref.modal.center;
    }
    this.height = this.ref.modal.height;
    if (this.fullScreen) {
      this.modalCss = 'w-screen h-screen'
    } else {
      if (this.modalSize === 'large') {
        this.modalCss = 'w-full lg:w-11/12';
      }
      if (this.modalSize === 'normal') {
        this.modalCss = 'w-full lg:w-6/12 xl:w-4/12';
      }
    }
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
    }
  }

  protected readonly undefined = undefined;
}
