import {TemplateRef, Type} from "@angular/core";
import {ModalButtons} from "./modal-buttons";

export class Modal<T> {
  content!: string | Type<any> | TemplateRef<any>;
  data?: {[key: string]: any};
  size?: 'normal'| 'large';
  fullScreen?: boolean;
  height?: 'fill' | undefined;
  center?: boolean | undefined;
  backdropClose?: boolean;
  buttons?: ModalButtons[];
}
