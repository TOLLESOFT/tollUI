import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from "./modal/modal.component";
import {OverlayModule} from "@angular/cdk/overlay";
import {ModalService} from "./modal/modal.service";



@NgModule({
  declarations: [ModalComponent],
  exports: [ModalComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  providers: [ModalService]
})
export class PiModalModule { }
