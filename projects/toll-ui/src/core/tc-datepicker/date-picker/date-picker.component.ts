import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  OnInit
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {fromEvent, timer} from "rxjs";
import {format, isValid, parse} from "date-fns";
import {BaseService} from "../../base.service";

@Component({
  selector: 'tc-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatePickerComponent)
    }
  ]
})
export class DatePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor{
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() floatingLabel: 'inline' | 'outline' | undefined;
  model = '';
  @Input() private shadowModel = '';
  @Input() name: string | undefined = '';
  @Input() format = 'MM/dd/yyyy';

  @Input() required: boolean = false;
  @Input() invalid: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() disablePastDates: boolean = false;
  @Input() disabled = false;

  @Input() viewType: 'month' | 'date' = 'date';


  @Input() size: 'small' | 'normal' | 'large' | undefined = 'normal';
  specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/g;
  currentValue = '';


  defaultClass = 'bg-gray-50 focus:outline-none text-gray-900 rounded-lg block w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white';
  defaultSize = 'p-2.5 text-sm';
  smallSize = 'p-2 sm:text-xs';
  largeSize = 'p-4 sm:text-md';
  inputValidClass = 'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-400 dark:border-gray-500';
  invalidClass = 'focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 border border-red-500 dark:border-red-600'

  dateValue = new Date();
  mainId = BaseService.uuid();
  dropItemId = BaseService.uuid();
  touched = false;
  onChange = (_: any) => {};
  onTouched = (_?: any) => {};
  id = BaseService.uuid();
  constructor() { }


  ngOnInit(): void {
    if(this.viewType === 'date') {
      this.model = format(this.dateValue, this.format);
    } else {
      this.model = format(this.dateValue, 'MMMM yyyy');
    }
  }

  formatString = (maskFormat: string, stringToFormat: string, character?: string): any => {
    let result = ''
    let strIndex = 0

    for (let i = 0; i < maskFormat.length; i++) {
      const maskChar = maskFormat[i]
      if (maskChar === 'D') {
        if (
          stringToFormat[strIndex] &&
          !isNaN(parseInt(stringToFormat[strIndex]))
        ) {
          result += stringToFormat[strIndex]
          strIndex++
        } else {
          result += character ?? ''
          strIndex++
        }
      } else if (maskChar === 'A') {
        if (
          stringToFormat[strIndex] &&
          /^[a-zA-Z]+$/.test(stringToFormat[strIndex])
        ) {
          result += stringToFormat[strIndex]
          strIndex++
        } else {
          result +=  character ?? ''
          strIndex++
        }
      } else {
        result += maskChar
      }
    }
    return result
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: any) => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: Date): void {
    this.dateValue = new Date(obj);
    if(this.viewType === 'date') {
      this.model = format(new Date(this.dateValue), this.format);
    } else {
      this.model = format(new Date(this.dateValue), 'MMMM yyyy');
    }
  }


  ngAfterViewInit(): void {
    const element = document.getElementById(this.id) as HTMLInputElement;
    const mainElement = document.getElementById(this.mainId) as HTMLDivElement;
    const dropElement = document.getElementById(this.dropItemId) as HTMLDivElement
    fromEvent(element, 'click').subscribe({
      next: (_) => {
        const ele = document.getElementsByClassName('date-picker-container');
        for (let i = 0; i< ele.length;i++) {
          if (!ele.item(i)?.classList.contains('hidden')) {
            ele.item(i)?.classList.add('hidden')
          }
        }
        document.getElementsByClassName(this.id).item(0)?.classList.remove('hidden');
        const space = window.innerHeight - mainElement.offsetTop + mainElement.clientHeight - 100;

        if (dropElement.clientHeight > space) {
          dropElement.style.bottom = `${mainElement.clientHeight}px`;
        }
      }
    });

      fromEvent(document, 'click').subscribe({
          next: (_) => {
              if (!document.activeElement?.attributes.getNamedItem('date-picker')) {
                  const ele = document.getElementsByClassName('date-picker-container');
                  for (let i = 0; i< ele.length;i++) {
                      if (!ele.item(i)?.classList.contains('hidden')) {
                          ele.item(i)?.classList.add('hidden')
                      }
                  }
              }
          }
      })

    element.addEventListener('keyup', (event) => {
      const element = document.getElementById(this.id) as HTMLInputElement;
      const newFormat = this.format
        .replace('MM', 'DD')
        .replace('dd', 'DD')
        .replace('yyyy', 'DDDD');

      if (this.currentValue.length === 0) {
        this.model = this.formatString(
          newFormat,
          this.currentValue,
          '_'
        );
        timer(50).subscribe({
          next: value => {
            element.setSelectionRange(0, 0);
          }
        })
      } else {
        element.setSelectionRange(this.currentValue.length, this.currentValue.length);
      }
    })


    const calendar = document.getElementsByClassName(this.id).item(0) as HTMLDivElement;
    if (calendar) {
      calendar.addEventListener('mouseenter', () => {
        calendar.classList.remove('date-picker-container')
      })

      calendar.addEventListener('mouseleave', () => {
        calendar.classList.add('date-picker-container')
      })
    }
  }

  modelValueChange = (date: string) => {
    if(this.viewType === 'date') {
      const newFormat = this.format
        .replace('MM', 'DD')
        .replace('dd', 'DD')
        .replace('yyyy', 'DDDD');

      const actualValue = date.replace(this.specialChars, '');
      const newStr = this.formatString(
        newFormat,
        actualValue,
        '_'
      );

      this.currentValue = this.formatString(
        newFormat,
        actualValue,
      );

      this.currentValue = this.checkLastCharacter(this.currentValue, '/');
      this.model = newStr;
      const newDate = parse(newStr, this.format, new Date());
      if (isValid(newDate)) {
        if (this.required) {
          this.invalid = false;
        }
        this.dateValue = newDate;
        this.onChange(this.dateValue);
      } else {
        if (this.required) {
          this.invalid = true;
        }
      }
    } else {
      this.model = format(new Date(date), 'M');
    }
  }

  checkLastCharacter = (value: string, char: string): any => {
    let str = value;
    while (str.endsWith(char)) {
      str = str.slice(0, -1);
    }
    return str;
  }

  selectDate = (date: Date) => {
    if(this.viewType === 'date') {
      this.model = format(date, this.format);
    } else {
      this.model = format(date, 'MMMM yyyy');
    }
    this.onChange(date);
  }
}
