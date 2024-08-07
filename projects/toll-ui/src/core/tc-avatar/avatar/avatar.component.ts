import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';

@Component({
  selector: 'tc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() rounded: 'none' | '' | null = null;
  @Input() image = '';
  @Input() initials = '';
  @Input() size: 'small' | 'normal' | 'large' | 'extra large' = 'normal';

  /**
   * {css style: value}
   * {[p:string]: any}
   * */
  @Input() piStyle: any;

  @Input() piClass: any;
  @Input() badgeTemplate: TemplateRef<any> | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  avatarSize() : any {
    if (this.size === 'small') {
      return 'w-8 h-8'
    }
    if (this.size === 'normal') {
      return 'w-10 h-10'
    }
    if (this.size === 'large') {
      return 'w-20 h-20'
    }
    if (this.size === 'extra large') {
      return 'w-36 h-36'
    }
  }
}
