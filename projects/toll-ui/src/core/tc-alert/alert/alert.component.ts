import {Component, OnInit} from '@angular/core';
import {AlertService} from "../alert.service";

@Component({
  selector: 'tc-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{

  constructor(public service: AlertService) {

  }
  ngOnInit() {

  }


}
