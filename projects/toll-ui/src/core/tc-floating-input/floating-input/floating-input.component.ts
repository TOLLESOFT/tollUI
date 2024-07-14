import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseService} from "../../base.service";

@Component({
  selector: 'tc-floating-input',
  templateUrl: './floating-input.component.html',
  styleUrls: ['./floating-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FloatingInputComponent)
    }
  ]
})
export class FloatingInputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = ' ';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() floatingLabel: 'outline' | 'filled' | undefined = 'outline';
  @Input() model: string = '';
  @Input() required: boolean = false;
  @Input() invalid: boolean = false;
  @Input() name: string | undefined = '';
  @Input() readOnly: boolean = false;
  @Input() size: 'small' | 'normal' | 'large' | undefined = 'normal'
  touched = false;
  defaultClass = 'block w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
  filledClass = 'block w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';

  defaultSize = 'px-2.5 pb-2.5 pt-4 text-sm';
  smallSize = 'px-2 pb-2 pt-4 sm:text-xs';
  largeSize = 'px-4 pb-4 pt-6 sm:text-md';
  inputValidClass = 'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-400 dark:border-gray-500';
  invalidClass = 'focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 border border-red-500 dark:border-red-600'
  onChange = (_: any) => {};
  onTouched = (_?: any) => {};

  @Input() disabled = false;
  id = BaseService.uuid();
  constructor() { }

  ngOnInit(): void {

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

  writeValue(obj: any): void {
    this.model = obj;
  }

  updateForm(value: any) {
    if (this.required) {
      this.invalid = !this.model;
    }

    this.onChange(value);
  }
}
