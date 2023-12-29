import { Directive } from '@angular/core';

@Directive({
  selector: '[tcTr]',
  host: {
    'class': 'bg-white border-b hover:bg-gray-100'
  }
})
export class TcTrDirective {

  constructor() { }

}
