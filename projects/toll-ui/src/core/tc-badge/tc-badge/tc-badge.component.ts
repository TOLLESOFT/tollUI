import {Component, Input} from '@angular/core';

@Component({
  selector: 'tc-badge',
  templateUrl: './tc-badge.component.html',
  styleUrls: ['./tc-badge.component.scss'],
})
export class TcBadgeComponent {
  @Input() text: string = '';
  @Input() size: 'normal' | 'large' = "normal";
  @Input() type: 'primary' | 'success' | 'danger' | 'warning' = 'primary';
  @Input() rounded: 'rounded' | '' | undefined = undefined;

  primary = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  success = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  danger = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  warning = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';

  normal = 'text-xs';
  large = 'text-sm';
}
