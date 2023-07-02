import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiPaginationComponent } from './pi-pagination/pi-pagination.component';
import {PiIconButtonModule} from "../pi-icon-button/pi-icon-button.module";
import {PiSelectListModule} from "../pi-select-list/pi-select-list.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PiPaginationComponent
  ],
  exports: [
    PiPaginationComponent
  ],
  imports: [
    CommonModule,
    PiIconButtonModule,
    PiSelectListModule,
    FormsModule
  ]
})
export class PiPaginationModule { }
