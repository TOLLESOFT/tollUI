import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {FormsModule} from "@angular/forms";
import {TcCalendarModule} from "../tc-calendar/tc-calendar.module";



@NgModule({
  declarations: [
    DatePickerComponent
  ],
  exports: [
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TcCalendarModule
  ]
})
export class TcDatepickerModule { }
