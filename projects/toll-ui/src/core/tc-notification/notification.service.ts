import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {NotificationInfo} from "./notification-info";

@Injectable()
export class NotificationService {
  notify$ = new Subject<NotificationInfo>();
  constructor() {}

  notify(notification: NotificationInfo): void {
    this.notify$.next(notification);
  }
}

