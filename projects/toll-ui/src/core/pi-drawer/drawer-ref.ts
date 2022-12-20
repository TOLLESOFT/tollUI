import {Subject, timer} from "rxjs";
import {OverlayCloseEvent} from "../overlay-close-event";
import {OverlayRef} from "@angular/cdk/overlay";
import {Drawer} from "./drawer";

export class DrawerRef<R = any, T = any> {
    afterClosed$ = new Subject<OverlayCloseEvent<R | undefined | null>>();

    constructor(
        private overlay: OverlayRef,
        public drawer: Drawer<T>
    ) {
      overlay.backdropClick().subscribe({
        next: (_) => {
          this._close('backdropClick', null);
        }
      })
    }

    close(data?: R) {
        this._close('close', data);
    }

    private _close(type: 'backdropClick' | 'close', data: R | undefined | null) {
      this.afterClosed$.next({
        type,
        data
      });
      timer(200).subscribe({
        next:(() => {
          this.overlay.dispose();
          this.afterClosed$.complete();
        })
      })
    }
}
