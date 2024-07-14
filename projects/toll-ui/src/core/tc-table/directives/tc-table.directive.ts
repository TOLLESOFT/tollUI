import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[tcTable]',
  host: {
    'class': 'w-full text-sm text-left text-gray-500'
  }
})
export class TcTableDirective {
  @Input() data: any[] = [];
  constructor() { }

}
