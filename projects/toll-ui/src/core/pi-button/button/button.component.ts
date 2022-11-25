import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pi-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() size: 'small' | 'normal' | 'large' | undefined;
  @Input() type: 'primary' | 'success' | 'danger' | 'warning' | 'info' | undefined;
  @Input() block: '' | undefined;
  @Input() disabled: any = false;
  constructor() { }

  ngOnInit(): void {
  }

}
