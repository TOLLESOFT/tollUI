import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseService} from "../../base.service";

@Component({
  selector: 'pi-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RatingsComponent)
    }
  ]
})
export class RatingsComponent implements OnInit, ControlValueAccessor {
  @Input() id: string = BaseService.uuid();

  onChange = (value: number) => {};
  onTouched = (value: number) => {};

  @Input() disable: boolean = false;
  @Input() size: '5' | '7' | '10' | undefined = '10';
  rateRange = [
    1, 2, 3, 4, 5
  ];

  selectedRate = 0;
  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: number) => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: number): void {
    this.selectedRate = obj;
  }

  selectRate(rate: number) {
    this.selectedRate = rate;
    this.onChange(rate);
  }
}
