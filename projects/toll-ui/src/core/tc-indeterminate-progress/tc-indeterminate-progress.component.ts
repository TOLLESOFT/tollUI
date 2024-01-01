import {Component, Input} from '@angular/core';

@Component({
  selector: 'tc-indeterminate-progress',
  templateUrl: './tc-indeterminate-progress.component.html',
  styleUrls: ['./tc-indeterminate-progress.component.scss']
})
export class TcIndeterminateProgressComponent {
    @Input() type: 'primary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';
}
