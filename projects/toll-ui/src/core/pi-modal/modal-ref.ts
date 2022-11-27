import {Subject} from "rxjs";
import {OverlayRef} from "@angular/cdk/overlay";
import {Modal} from "./modal";

export interface OverlayCloseEvent<R> {
    type: 'backdropClick' | 'close';
    data: R;
}

export class ModalRef<R = any, T = any> {
    afterClosed$ = new Subject<OverlayCloseEvent<R | undefined | null>>();

    constructor(
        private overlay: OverlayRef,
        public modal: Modal<T>
    ) {
        // overlay.backdropClick().subscribe(() => this._close('backdropClick', null));
    }

    close(data?: R) {
        this._close('close', data);
    }

    private _close(type: 'backdropClick' | 'close', data: R | undefined | null) {
        this.overlay.dispose();
        this.afterClosed$.next({
            type,
            data
        });

        this.afterClosed$.complete();
    }
}
