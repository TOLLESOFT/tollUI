import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'pi-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() imageTemplate: TemplateRef<any> | undefined;
  @Input() bodyTemplate: TemplateRef<any> | undefined;
  @Input() title: string  = '';
  @Input() image: string = '';
  @Input() body: string = '';
  @Input() subtitle: string = '';
  @Input() rounded: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
