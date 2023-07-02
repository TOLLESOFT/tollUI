import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {FormsModule} from "@angular/forms";
import {PiCalendarModule} from "../pi-calendar/pi-calendar.module";



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
    PiCalendarModule
  ]
})
export class PiDatepickerModule { }
