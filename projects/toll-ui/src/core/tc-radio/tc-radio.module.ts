import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TcRadioGroupComponent } from './tc-radio-group/tc-radio-group.component';



@NgModule({
  declarations: [
    RadioButtonComponent,
    TcRadioGroupComponent
  ],
  exports: [
    RadioButtonComponent,
    TcRadioGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TcRadioModule { }
