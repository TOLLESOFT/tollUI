import {Component, OnInit, TemplateRef, Type} from '@angular/core';
import {DrawerRef} from "../drawer-ref";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  contentType!: 'template' | 'string' | 'component';
  content!: string | TemplateRef<any> | Type<any>;
  position: 'left' | 'right' | undefined = 'right';
  width: string | undefined = '400px';
  backdropClose: boolean | undefined = true;
  context: any;
  title?: string;
  constructor(private ref: DrawerRef) { }

  close() {
    this.ref.close(null);
  }

  ngOnInit(): void {
    this.content = this.ref.drawer.content;
    if (this.ref.drawer.position) {
      this.position = this.ref.drawer.position;
    }
    this.title = this.ref.drawer.title;
    if (this.ref.drawer.width) {
      this.width = this.ref.drawer.width;
    }
    if (this.ref.drawer.backdropClose === undefined) {
      this.backdropClose = true;
    } else {
      this.backdropClose = this.ref.drawer.backdropClose;
    }

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
    }
  }

}
