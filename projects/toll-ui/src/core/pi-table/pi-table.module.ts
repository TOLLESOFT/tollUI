import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import {PiCheckBoxModule} from "../pi-check-box/pi-check-box.module";
import {PiIconButtonModule} from "../pi-icon-button/pi-icon-button.module";
import {PiButtonModule} from "../pi-button/pi-button.module";
import {PiPaginationModule} from "../pi-pagination/pi-pagination.module";
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        TableComponent
    ],
  exports: [
    TableComponent
  ],
    imports: [
        CommonModule,
        PiCheckBoxModule,
        PiIconButtonModule,
        PiButtonModule,
        PiPaginationModule,
        FormsModule
    ]
})
export class PiTableModule { }
