import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import {TcPaginationModule} from "../tc-pagination/tc-pagination.module";
import {FormsModule} from "@angular/forms";
import { TcTableDirective } from './directives/tc-table.directive';
import { TcTheadDirective } from './directives/tc-thead.directive';
import { TcThDirective } from './directives/tc-th.directive';
import { TcTrDirective } from './directives/tc-tr.directive';
import { TcTdDirective } from './directives/tc-td.directive';



@NgModule({
    declarations: [
        TableComponent,
        TcTableDirective,
        TcTheadDirective,
        TcThDirective,
        TcTrDirective,
        TcTdDirective
    ],
  exports: [
    TableComponent,
    TcTableDirective,
    TcTheadDirective,
    TcThDirective,
    TcTrDirective,
    TcTdDirective
  ],
    imports: [
        CommonModule,
        TcPaginationModule,
        FormsModule
    ]
})
export class TcTableModule { }
