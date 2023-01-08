import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import {PiButtonModule} from "../pi-button/pi-button.module";
import {PiIconButtonModule} from "../pi-icon-button/pi-icon-button.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CalendarComponent
  ],
    imports: [
        CommonModule,
        PiButtonModule,
        PiIconButtonModule,
        FormsModule
    ],
  exports: [
      CalendarComponent
  ]
})
export class PiCalendarModule { }
