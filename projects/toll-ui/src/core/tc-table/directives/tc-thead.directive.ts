import { Directive } from '@angular/core';

@Directive({
  selector: '[tcThead]',
  host: {
    'class': 'text-sm text-gray-700 uppercase bg-gray-50 border-b'
  }
})
export class TcTheadDirective {

  constructor() { }

}
