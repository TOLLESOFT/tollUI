import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextAreaComponent} from "./text-area/text-area.component";



@NgModule({
  declarations: [TextAreaComponent],
  exports: [TextAreaComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class PiTextAreaModule { }
