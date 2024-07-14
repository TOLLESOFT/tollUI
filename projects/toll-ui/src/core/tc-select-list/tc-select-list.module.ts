import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectListComponent } from './select-list/select-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MultiSelectListComponent} from "./multi-select-list/multi-select-list.component";
import { SelectListOptionComponent } from './select-list-option/select-list-option.component';



@NgModule({
    declarations: [
        SelectListComponent,
        MultiSelectListComponent,
        SelectListOptionComponent
    ],
    exports: [
        SelectListComponent,
        MultiSelectListComponent,
        SelectListOptionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class TcSelectListModule { }
