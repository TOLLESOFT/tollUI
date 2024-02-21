import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TcMenuDirective} from "./tc-menu.directive";



@NgModule({
    declarations: [
        TcMenuDirective
    ],
    exports: [
        TcMenuDirective
    ],
    imports: [
        CommonModule
    ]
})
export class TcDirectivesModule { }
