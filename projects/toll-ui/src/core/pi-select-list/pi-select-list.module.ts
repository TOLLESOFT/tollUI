import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectListComponent } from './select-list/select-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MultiSelectListComponent} from "./multi-select-list/multi-select-list.component";



@NgModule({
    declarations: [
        SelectListComponent,
        MultiSelectListComponent
    ],
    exports: [
        SelectListComponent,
        MultiSelectListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PiSelectListModule { }
