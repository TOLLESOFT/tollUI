import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import {FormsModule} from "@angular/forms";
import {TcButtonModule} from "../tc-button/tc-button.module";
import {TcIconButtonModule} from "../tc-icon-button/tc-icon-button.module";



@NgModule({
  declarations: [
    CalendarComponent
  ],
    imports: [
        CommonModule,
        TcButtonModule,
        TcIconButtonModule,
        FormsModule
    ],
  exports: [
      CalendarComponent
  ]
})
export class TcCalendarModule { }
