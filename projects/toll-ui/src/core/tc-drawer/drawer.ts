import {TemplateRef, Type} from "@angular/core";

export class Drawer<T> {
    content!: string | Type<any> | TemplateRef<any>;
    data?: T;
    width?: string;
    position?: 'left' | 'right' ;
    backdropClose?: boolean;
    title?: string;
}
