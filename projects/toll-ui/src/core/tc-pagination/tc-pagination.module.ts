import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import {TcIconButtonModule} from "../tc-icon-button/tc-icon-button.module";
import {TcSelectListModule} from "../tc-select-list/tc-select-list.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PaginationComponent
  ],
  exports: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    TcIconButtonModule,
    TcSelectListModule,
    FormsModule
  ]
})
export class TcPaginationModule { }
