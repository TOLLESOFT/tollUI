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
  // month: any;
  years: number[] = [];
  currentDate = new Date();
  today = new Date();

  @Input() useUTC = false;
  @Input() disablePastDates = false;

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
    this.selectedYear = this.currentDate.getFullYear();
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
    const tYears: number[] = []
    for (let i = 0; i < 12; i++) {
      tYears.push(2016 + i)
    }
    this.years = tYears;
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
    this.monthYear = `${this.AllMonths[month]} ${year}`;
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
    this.monthYear = `${this.AllMonths[month]} ${year}`;
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
    this.smallCalendarView = 'month'
    this.monthCount = this.AllMonths.findIndex(u => u === month);
    this.GetCalendar(this.selectedYear, this.monthCount);
  }

  selectYear(year: number) {
    if (year > this.today.getFullYear()-200 && year < this.today.getFullYear()+500) {
      this.GetCalendar(year, this.currentDate.getMonth());
    }
  }

  GetWeeks = (dates: Date[]) => {
    const weeks: Week[] = []
    dates.forEach((elements) => {
      // get week day
      const week = getWeek(elements)
      const getdayWeek = weeks.find((u) => u.week === week)
      if (getdayWeek === undefined) {
        // update weeks array
        weeks.push({
          week,
          dates: [elements]
        })
      } else {
        getdayWeek.dates.push(elements)
      }
    })

    const nMRT = weeks[0].dates
    const n: Date[] | any = []

    for (const item of nMRT) {
      if (item.getDay() > 0) {
        const newArray = new Array(item.getDay())
        let days: Date[] = []
        if (item.getMonth() === 0) {
          days = this.DaysInMonth(item.getFullYear() - 1, 11)
        } else if (item.getMonth() === 11) {
          days = this.DaysInMonth(item.getFullYear() + 1, 0)
        } else {
          days = this.DaysInMonth(item.getFullYear(), item.getMonth() - 1)
        }
        for (let x = 0; x < newArray.length; x++) {
          const sub = newArray.length - x
          n.push(new Date(days[days.length - sub]))
        }
        nMRT.forEach((ele: any) => {
          n.push(ele)
        })
        weeks[0].dates = n
        break
      } else {
        break
      }
    }

    const lastWeek = weeks[weeks.length - 1].dates
    for (let i = 0; i < 7; i++) {
      if (lastWeek[i] === undefined) {
        const newArray = new Array(6 - lastWeek[i - 1].getDay())
        let days: Date[] = []
        if (lastWeek[i - 1].getMonth() === 11) {
          days = this.DaysInMonth(lastWeek[i - 1].getFullYear() + 1, 0)
        } else {
          days = days = this.DaysInMonth(
            lastWeek[i - 1].getFullYear(),
            lastWeek[i - 1].getMonth() + 1
          )
        }
        for (let x = 0; x < newArray.length; x++) {
          lastWeek.push(new Date(days[x]))
        }
        weeks[weeks.length - 1].dates = lastWeek
        break
      }
    }

    this.weeks = weeks;
  }

  GetDate(date: Date): any {
    return date.getDate();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.GetCalendar(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
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

  GetNextYears = () => {
    const tYears: number[] = []
    for (let i = 0; i < 12; i++) {
      tYears.push(this.years[this.years.length - 1] + (i + 1))
    }
    this.years = tYears
  }

  GetPreviousYears = () => {
    if (this.years[0] > 1800) {
      const tYears: number[] = []
      for (let i = 0; i < 12; i++) {
        tYears.push(this.years[0] - (12 - i))
      }
      this.years = tYears;
    }
  }

  getToday(date: Date): boolean {
    const today = format(new Date(), 'MM/dd/yyyy');
    const current = format(new Date(date), 'MM/dd/yyyy');
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
      this.selectedDate = new Date(obj);
      this.GetCalendar(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
    }
  }
}

interface Week {
  dates: Date[];
  week: number;
}
