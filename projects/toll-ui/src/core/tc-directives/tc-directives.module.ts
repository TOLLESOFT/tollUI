import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcPopOverDirective } from './tc-pop-over.directive';



@NgModule({
    declarations: [
        TcPopOverDirective
    ],
    exports: [
        TcPopOverDirective
    ],
    imports: [
        CommonModule
    ]
})
export class TcDirectivesModule { }
