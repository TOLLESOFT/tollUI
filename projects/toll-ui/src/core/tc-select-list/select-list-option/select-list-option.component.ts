import {Component, Inject, Input, Output} from '@angular/core';
import {SelectListService} from "../select-list.service";

@Component({
  selector: 'tc-select-list-option',
  templateUrl: './select-list-option.component.html',
  styleUrls: ['./select-list-option.component.scss']
})

export class SelectListOptionComponent {

  @Input() item: any;
  constructor(@Inject(SelectListService) private service: SelectListService) {
  }

  select() {
    this.service.selected.next(this.item);
  }
}
