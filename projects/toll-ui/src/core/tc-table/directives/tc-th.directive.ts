import { Directive } from '@angular/core';

@Directive({
  selector: '[tcTh]',
  host: {
    'class': 'px-6 py-3'
  }
})
export class TcThDirective {

  constructor() { }

}
