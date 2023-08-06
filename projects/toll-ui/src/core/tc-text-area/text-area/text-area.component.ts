import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseService} from "../../base.service";

@Component({
  selector: 'tc-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextAreaComponent)
    }
  ]
})
export class TextAreaComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() rows: string = '';
  @Input() type: string = 'text';
  @Input() floatingLabel: 'inline' | 'outline' | undefined;
  @Input() model: string = '';
  @Input() required: boolean = false;
  @Input() invalid: boolean = false;
  @Input() name: string | undefined = '';
  @Input() readOnly: boolean = false;
  defaultClass = 'bg-gray-50 focus:outline-none p-2.5 text-sm text-gray-900 rounded-lg block w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white';
  inputValidClass = 'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-400 dark:border-gray-500';
  invalidClass = 'focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 border border-red-500 dark:border-red-600'
  onChange = (_: any) => {};
  onTouched = (_: any) => {};
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
