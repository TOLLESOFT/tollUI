import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'tc-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit, OnChanges {
  @Input() type: 'basic' | 'detailed' = 'basic';
  @Input() color: 'primary' | 'success' | 'danger' | 'warning' | 'info' = 'danger';
  @Input() selectedIndex = 0;
  @Input() stepCount = 1;
  steps: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.steps = Array(this.stepCount).fill('');
  }
}
