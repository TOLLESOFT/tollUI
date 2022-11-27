import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pi-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() show = false;
  @Input() loadingMessage = '';
  constructor() { }

  ngOnInit(): void {
  }

}
