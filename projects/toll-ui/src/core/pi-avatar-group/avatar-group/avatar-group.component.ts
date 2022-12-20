import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pi-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.scss']
})
export class AvatarGroupComponent implements OnInit {
  @Input() rounded: 'none' | '' | null = null;
  @Input() images: Array<string> = [];
  secondaryImages: Array<string> = [];
  @Input() initials: Array<string> = [];
  @Input() maxCount = 0;
  displayCount = 0;
  @Input() size: 'small' | 'normal' | 'large' | 'extra large' = 'normal';
  constructor() { }

  ngOnInit(): void {
    this.secondaryImages = [];
    if (this.maxCount > 0) {
      if (this.maxCount < this.images.length) {
        this.displayCount = this.images.length - this.maxCount;
        for(let i = 0; i < this.maxCount; i++) {
          this.secondaryImages.push(this.images[i]);
        }
      }
    }
  }

  avatarGroupSize() : any {
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
