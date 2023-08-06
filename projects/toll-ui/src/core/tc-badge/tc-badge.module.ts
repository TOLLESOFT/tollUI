import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcBadgeComponent } from './tc-badge/tc-badge.component';



@NgModule({
    declarations: [
        TcBadgeComponent
    ],
    exports: [
        TcBadgeComponent
    ],
    imports: [
        CommonModule
    ]
})
export class TcBadgeModule { }
