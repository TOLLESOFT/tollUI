import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer/drawer.component';
import {OverlayModule} from "@angular/cdk/overlay";



@NgModule({
  declarations: [
    DrawerComponent
  ],
  exports: [DrawerComponent],
  imports: [
    CommonModule,
    OverlayModule
  ]
})
export class PiDrawerModule { }
