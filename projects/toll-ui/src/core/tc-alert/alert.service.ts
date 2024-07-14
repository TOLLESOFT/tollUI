import { Injectable } from '@angular/core';
import {Alert} from "./alert";
import {Subject, timer} from "rxjs";
import {BaseService} from "../base.service";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  $alert = new Subject<Alert>();
  alerts: Alert[] = [];
  reversedAlerts: Alert[] = [];
  alert: Alert | undefined;
  singleView = true;
  clear = false;
  constructor() {
    this.$alert.subscribe({
      next: value => {
        this.reversedAlerts.push(value);
        if (this.singleView) {
          this.alert = value
        }
        this.alerts = this.reversedAlerts.reverse();
        if(value.duration) {
          timer(value.duration * this.alerts.length).subscribe({
            next: res => {
              this.alerts.splice(this.alerts.findIndex(u => u === value), 1);
              this.alerts = this.reversedAlerts.reverse();
              if(this.alerts.length === 0) {
                this.alert = undefined;
                this.singleView = true;
              }
            }
          })
        }

      }
    })
  }

  notify(options: Alert) {
    options.id = BaseService.uuid();
    this.$alert.next(options);
  }

  clearAlerts() {
    this.clear = true;
    timer(1000).subscribe({
      next: value => {
        this.alert = undefined;
        this.alerts = [];
        this.reversedAlerts = [];
        this.singleView = true;
        this.clear = false;
      }
    })
  }

  clearAlert() {
    this.clear = true;
    timer(1000).subscribe({
      next: value =>  {
        this.reversedAlerts.splice(this.reversedAlerts.findIndex(u => u === this.alert), 1);
        this.alerts = this.reversedAlerts.reverse();
        this.alert = this.alerts[this.alerts.length - 1];
        if (this.alerts.length === 0) {
          this.singleView = true;
          this.clear = false;
        }
      }
    })
  }

  toggleView() {
    this.singleView = !this.singleView;
    if (this.singleView) {
      this.alert = this.alerts[this.alerts.length - 1];
    } else {
      this.alert = undefined;
    }
  }
}
