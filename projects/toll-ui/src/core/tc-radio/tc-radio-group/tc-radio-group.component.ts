import {AfterContentInit, Component, forwardRef, Input, OnInit, TemplateRef} from '@angular/core';
import {BaseService} from "../../base.service";
import {RadioButtonService} from "../radio-button.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'tc-radio-group',
  templateUrl: './tc-radio-group.component.html',
  styleUrls: ['./tc-radio-group.component.scss'],
  providers: [
    RadioButtonService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TcRadioGroupComponent)
    }
  ]
})

export class TcRadioGroupComponent implements OnInit{
  id = BaseService.uuid().replaceAll("-", "");

  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  @Input() disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};
  constructor(private radioService: RadioButtonService) {
  }

  ngOnInit(): void {
    this.radioService.selected.subscribe({
      next: value => {
        if (value != null || value != undefined) {
          this.onChange(value);
        }
      }
    })

    this.radioService.setName.next(this.id);
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
    if (obj !== null && obj !== undefined) {
      this.radioService.select(obj);
    }
  }
}
