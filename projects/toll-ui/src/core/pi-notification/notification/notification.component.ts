import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../notification.service";
import {NotificationInfo} from "../notification-info";
import {timer} from "rxjs";

@Component({
  selector: 'pi-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  content!: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | undefined = 'top-right';
  type: 'warning' | 'info' | 'success' | 'danger' | 'neutral' | undefined = 'neutral';
  title?: string;
  previousList: Array<NotificationInfo> = [];
  positions: Array<any> = [];
  notifyList: Array<any> = [];

  constructor(private service: NotificationService) {

    service.notify$.subscribe({
      next: value => {
        if(value.position == undefined) {
          value.position = 'top-right';
        }
        if(value.type == undefined) {
          value.type = 'neutral';
        }
        this.previousList.push(value);

        this.positions.push({
          position: 'top-right',
          list: this.previousList.filter(u => u.position === 'top-right')
        });

        this.positions.push({
          position: 'top-left',
          list: this.previousList.filter(u => u.position === 'top-left')
        });

        this.positions.push({
          position: 'bottom-right',
          list: this.previousList.filter(u => u.position === 'bottom-right')
        });

        this.positions.push({
          position: 'bottom-left',
          list: this.previousList.filter(u => u.position === 'bottom-left')
        });

        this.positions.forEach((u, index) => {
          u.list.forEach((m: any, i: number) => {
            if (m.duration === undefined) {
              m.destroy =  timer(6000).subscribe({
                next: () => this.timerClose(index, i)
              });
            } else {
              m.destroy = timer(m.duration).subscribe({
                next: () => this.timerClose(index, i)
              });
            }
          })
        });
      }
    });
  }

  close(position: any, index: any) {
    if(this.positions[position].list[index].destroy) {
      this.positions[position].list[index]?.destroy.unsubscribe();
    }
    this.positions[position].list.splice(index, 1);
    this.previousList.splice(index, 1);
  }

  timerClose(position: any, index: any) {
    this.positions[position].list.splice(index, 1);
    this.previousList.splice(index, 1);
  }


  ngOnInit(): void {
  }
}
