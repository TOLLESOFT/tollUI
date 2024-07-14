import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsComponent } from './steps/steps.component';



@NgModule({
  declarations: [
    StepsComponent
  ],
  exports: [
    StepsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TcStepsModule { }
