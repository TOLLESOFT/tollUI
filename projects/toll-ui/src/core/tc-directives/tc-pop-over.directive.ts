import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[tc-popover]'
})
export class TcPopOverDirective {

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('click')
  onClick = () => {
    console.log(this.el.nativeElement);
  }
}
