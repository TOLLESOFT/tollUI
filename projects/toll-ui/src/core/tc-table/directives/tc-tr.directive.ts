import { Directive } from '@angular/core';

@Directive({
  selector: '[tcTr]',
  host: {
    'class': 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
  }
})
export class TcTrDirective {

  constructor() { }

}
