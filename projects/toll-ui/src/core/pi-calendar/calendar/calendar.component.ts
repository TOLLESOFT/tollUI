import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import getWeek from 'date-fns/getWeek';
import {format} from "date-fns";
import {da} from "date-fns/locale";

@Component({
  selector: 'pi-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CalendarComponent)
    }
  ]
})
export class CalendarComponent implements OnInit, ControlValueAccessor {
  onChange = (value: Date) => {};
  onTouched = (value: Date) => {};
  selectedDate: Date = new Date();
  smallCalendarView: 'month' | 'all month' | 'year' = 'month';
  calendarType: 'full' | 'small' = 'small';
  selectedMonth: any;
  selectedYear: any;
  monthYear: any;
  month: any;
  year: any;
  currentDate = new Date();
  today = new Date();
  @Input() useUTC = false;
  @Input() disablePastDates = false;
  allowPastDates = true;
  monthCount = 0;
  weeks: Array<Week> = [];
  AllDates: Array<any> = [];
  AllDays: any[] = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
  ];

  AllMonths: string[] = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ];
  constructor() {
  }

  GetCalendar(year: number, month: number) {
    this.currentDate = new Date(year, month, 1);
    if (this.useUTC) {
      this.AllDates = this.DaysInMonthUTC(
          this.currentDate.getUTCFullYear(),
          this.currentDate.getUTCMonth()
      );
    } else {
      this.AllDates = this.DaysInMonth(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth()
      );
    }

    this.GetWeeks(this.AllDates);
  }

  GetDefaultCalendar() {
    if (this.useUTC) {
      this.AllDates = this.DaysInMonthUTC(
          this.currentDate.getUTCFullYear(),
          this.currentDate.getUTCMonth()
      );
    } else {
      this.AllDates = this.DaysInMonth(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth()
      );
    }

    this.GetWeeks(this.AllDates);
  }

  private DaysInMonth(year: number, month: number): any {
    const date = new Date(year, month, 1);
    this.monthYear = `${this.GetMonth(date)} ${year}`;
    this.month = this.GetMonth(date);
    this.monthCount = month;
    this.selectedYear = year;
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  private DaysInMonthUTC(year: number, month: number): any {
    const date = new Date(Date.UTC(year, month, 1));
    this.monthYear = `${this.GetMonth(date)} ${year}`;
    this.month = this.GetMonth(date);
    this.monthCount = month;
    this.selectedYear = year;
    const days = [];
    while (date.getUTCMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getUTCDate() + 1);
    }
    return days;
  }

  selectMonth(month: string) {
    this.monthCount = this.AllMonths.findIndex(u => u === month);
    this.GetCalendar(this.selectedYear, this.monthCount);
  }

  selectYear(year: number) {
    if (year > this.today.getFullYear()-200 && year < this.today.getFullYear()+500) {
      this.GetCalendar(this.selectedYear, this.monthCount);
    }
  }

  GetMonth(date: Date): any {
    return this.AllMonths[date.getMonth()];
  }

  GetWeeks(dates: Date[]) {
    this.weeks = [];
    dates.forEach((elements) => {
      // get week day
      const week = getWeek(elements);
      const getdayWeek = this.weeks.find((u) => u.week === week);
      if (getdayWeek === undefined) {
        // update weeks array
        this.weeks.push({
          week,
          dates: [elements],
        });
      } else {
        getdayWeek.dates.push(elements);
      }
    });

    const nMRT = this.weeks[0].dates;
    const n: Date[] | any = [];
    for (const item of nMRT) {
      if (item.getDay() > 0) {
        const newArray = new Array(item.getDay());
        for (let x = 0; x < newArray.length; x++) {
          n.push(null);
        }
        nMRT.forEach((ele: any) => {
          n.push(ele);
        });
        this.weeks[0].dates = n;
        break;
      } else {
        break;
      }
    }

    const lastWeek = this.weeks[this.weeks.length-1].dates;
    const nlastDate: Date[] | any = [];
    for (let i = 0; i < 7; i++) {
      if (lastWeek[i]) {
        nlastDate.push(lastWeek[i]);
      } else {
        nlastDate.push(null);
      }
    }

    this.weeks[this.weeks.length-1].dates = nlastDate;
  }

  GetDate(date: Date): any {
    return date.getDate();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.onChange(this.selectedDate);
  }

  GetPreviousMonth() {
    this.monthCount--;
    if (this.monthCount === -1) {
      this.monthCount = 11;
      this.currentDate = new Date(this.currentDate.getFullYear() - 1, 11, 1);
      this.selectedYear = this.currentDate.getFullYear();
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }
    this.GetDefaultCalendar();
  }

  GetNextMonth() {
    this.monthCount++;
    if (this.monthCount === 12) {
      this.monthCount = 0;
      this.currentDate = new Date(this.currentDate.getFullYear() + 1, 0, 1);
      this.selectedYear = this.currentDate.getFullYear();
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }
    this.GetDefaultCalendar();
  }

  getToday(date: Date): boolean {
    const today = format(new Date(), 'MM/dd/yyyy');
    const current = format(date, 'MM/dd/yyyy');
    return today === current;
  }

  compareDate(date: Date): boolean {
    return date < new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  }

  setToday() {
    this.currentDate = new Date();
    this.selectedDate = this.currentDate;
    this.onChange(this.selectedDate);
    this.GetDefaultCalendar();
  }
  ngOnInit(): void {
    this.selectedYear = this.selectedDate.getFullYear();
    this.GetDefaultCalendar();
  }
  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn:  (value: Date) => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: Date): void {
    if (obj) {
      this.selectedDate = new Date(obj.getFullYear(), obj.getMonth(), obj.getDate());
      this.GetCalendar(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
    }
  }

}

interface Week {
  dates: Date[];
  week: number;
}
