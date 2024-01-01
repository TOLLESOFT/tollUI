import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TcIndeterminateProgressComponent} from "./tc-indeterminate-progress.component";



@NgModule({
    declarations: [TcIndeterminateProgressComponent],
    exports: [TcIndeterminateProgressComponent],
  imports: [
    CommonModule
  ]
})
export class TcIndeterminateProgressModule { }
