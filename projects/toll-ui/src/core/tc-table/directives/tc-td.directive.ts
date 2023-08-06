import { Directive } from '@angular/core';

@Directive({
  selector: '[tcTd]',
  host: {
    'class': 'px-6 py-4'
  }
})
export class TcTdDirective {

  constructor() { }

}
