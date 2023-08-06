import { Directive } from '@angular/core';

@Directive({
  selector: '[tcThead]',
  host: {
    'class': 'text-sm text-gray-700 uppercase bg-gray-50 border-b dark:bg-gray-700 dark:text-gray-400'
  }
})
export class TcTheadDirective {

  constructor() { }

}
