import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectListComponent } from './select-list/select-list.component';
import {FormsModule} from "@angular/forms";
import {fromEvent} from "rxjs";



@NgModule({
    declarations: [
        SelectListComponent
    ],
    exports: [
        SelectListComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class PiSelectListModule {
  constructor() {
    fromEvent(document, 'click')
      .subscribe({
        next: (_) => {
          if (!document.activeElement?.attributes.getNamedItem('select-list')) {
            const ele = document.getElementsByClassName('select-list-container');
            for (let i = 0; i< ele.length;i++) {
              if (!ele.item(i)?.classList.contains('hidden')) {
                ele.item(i)?.classList.add('hidden')
              }
            }
          }
        }
      })
  }
}
