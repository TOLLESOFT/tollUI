import {Subscription} from "rxjs";

export class NotificationInfo {
    id?: string;
    message!: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    title?: string;
    type?: 'warning' | 'info' | 'success' | 'danger' | 'neutral';
    duration?: number;
    destroy?: Subscription;
}
