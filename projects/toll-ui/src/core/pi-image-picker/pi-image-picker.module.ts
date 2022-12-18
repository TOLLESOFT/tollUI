import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './image-picker/image-picker.component';



@NgModule({
    declarations: [
        ImagePickerComponent
    ],
    exports: [
        ImagePickerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class PiImagePickerModule { }
