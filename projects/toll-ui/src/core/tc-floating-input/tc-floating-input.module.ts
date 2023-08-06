import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingInputComponent } from './floating-input/floating-input.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    FloatingInputComponent
  ],
  exports: [
    FloatingInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TcFloatingInputModule { }
