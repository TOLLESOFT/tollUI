import {Injectable, Injector} from '@angular/core';
import {Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {ComponentPortal, PortalInjector} from "@angular/cdk/portal";
import {DrawerRef} from "./drawer-ref";
import {Drawer} from "./drawer";
import {DrawerComponent} from "./drawer/drawer.component";

@Injectable()
export class DrawerService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<R = any, T = any>(drawer: Drawer<T>): DrawerRef<R> {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: ['backdrop-blur-[6px]', 'bg-gray-400/30', 'fixed', 'inset-0']
    });

    const overlayRef = this.overlay.create(configs);

    const myOverlayRef = new DrawerRef<R, T>(overlayRef, drawer);

    const injector = this.createInjector(myOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(DrawerComponent, null, injector));

    return myOverlayRef;
  }

  createInjector(ref: DrawerRef, inj: Injector) {
    const injectorTokens = new WeakMap([[DrawerRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }
}

