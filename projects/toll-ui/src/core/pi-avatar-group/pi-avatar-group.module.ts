import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarGroupComponent } from './avatar-group/avatar-group.component';



@NgModule({
    declarations: [
        AvatarGroupComponent
    ],
    exports: [
        AvatarGroupComponent
    ],
    imports: [
        CommonModule
    ]
})
export class PiAvatarGroupModule { }
