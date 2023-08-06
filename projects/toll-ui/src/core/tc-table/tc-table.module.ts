import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import {TcCheckBoxModule} from "../tc-check-box/tc-check-box.module";
import {TcIconButtonModule} from "../tc-icon-button/tc-icon-button.module";
import {TcButtonModule} from "../tc-button/tc-button.module";
import {TcPaginationModule} from "../tc-pagination/tc-pagination.module";
import {FormsModule} from "@angular/forms";
import { TcTableDirective } from './directives/tc-table.directive';
import { TcTheadDirective } from './directives/tc-thead.directive';
import { TcThDirective } from './directives/tc-th.directive';
import { TcTrDirective } from './directives/tc-tr.directive';
import { TcTdDirective } from './directives/tc-td.directive';
import { TcAdvTableComponent } from './tc-adv-table/tc-adv-table.component';



@NgModule({
    declarations: [
        TableComponent,
        TcTableDirective,
        TcTheadDirective,
        TcThDirective,
        TcTrDirective,
        TcTdDirective,
        TcAdvTableComponent
    ],
  exports: [
    TableComponent,
    TcTableDirective,
    TcTheadDirective,
    TcThDirective,
    TcTrDirective,
    TcTdDirective,
    TcAdvTableComponent
  ],
    imports: [
        CommonModule,
        TcCheckBoxModule,
        TcIconButtonModule,
        TcButtonModule,
        TcPaginationModule,
        FormsModule
    ]
})
export class TcTableModule { }
