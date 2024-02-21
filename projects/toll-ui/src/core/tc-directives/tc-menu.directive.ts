import {AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {computePosition, flip, offset, shift} from "@floating-ui/dom";

@Directive({
  selector: '[TcMenu]'
})
export class TcMenuDirective implements AfterViewInit{
  @Input() menu!: HTMLElement;
  constructor(private el: ElementRef) { }

  contextMenu() {
    computePosition(this.el.nativeElement, this.menu, {
      placement: 'bottom-end',
      middleware: [
        flip(),
        offset(6),
        shift({padding: 6})
      ]
    }).then(({x, y}) => {
      Object.assign(this.menu.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    })
  }

  ngAfterViewInit(): void {
    document.addEventListener('click', (_) => {
      const ele = document.getElementsByClassName('dropdown-menu-list');
      for (let i = 0; i< ele.length;i++) {
        if (!ele.item(i)?.classList.contains('hidden')) {
          ele.item(i)?.classList.add('hidden')
        }
      }
    })
    this.contextMenu();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopImmediatePropagation();
    const ele = document.getElementsByClassName('dropdown-menu-list');
    for (let i = 0; i< ele.length;i++) {
      if (!ele.item(i)?.classList.contains('hidden')) {
        ele.item(i)?.classList.add('hidden')
      }
    }
    this.menu.classList.toggle('hidden');
    this.contextMenu();
  }
}
