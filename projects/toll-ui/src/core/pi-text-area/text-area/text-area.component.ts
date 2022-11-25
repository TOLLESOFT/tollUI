import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TextAreaService} from "./text-area.service";
import {BaseService} from "../../base.service";

@Component({
  selector: 'pi-text-area',
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
  @Input() floatingLabel: 'inline' | 'outline' | undefined;

  @Input() model: string = '';

  onChange = (_: any) => {};
  onTouched = () => {};
  @Input() disabled = false;
  id = BaseService.uuid();
  constructor(public service: TextAreaService) { }

  ngOnInit(): void {

  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.model = obj;
  }

}
