import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseService} from "../../base.service";
import {SearchItem} from "../search-item";
import {fromEvent} from "rxjs";

@Component({
  selector: 'pi-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectListComponent)
    }
  ]
})
export class SelectListComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() id: string = BaseService.uuid();
  @Input() placeholder: string = '';
  @Input() data: Array<SearchItem> = [];
  @Input() showAddButton = true;
  @Input() searchable = false;
  @Input() showIcon = false;
  @Output() addNewItem = new EventEmitter();
  onChange = (value: any | null) => {};
  onTouched = (value: any | null) => {};
  newList:Array<SearchItem> = [];
  hidden = true;
  selectedItem?: SearchItem;
  displayLabel = '';
  displayValue: any;
  constructor() {
  }

  ngOnInit(): void {

    this.newList = this.data;
  }

  selectItem(item: SearchItem) {
    this.selectedItem = item;
    this.displayLabel = this.selectedItem.value;
    this.displayValue = this.selectedItem.id;
    this.onChange(item.id);
  }

  searchList(value: string) {
    this.data = this.newList;
    this.data = [...this.data.filter((item) => String(item.value).toLowerCase().includes(value.toLowerCase()))];
  }

  addNew() {
    this.addNewItem.emit(this.displayLabel);
  }

  registerOnChange(fn: (value: any | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: any | null) => void): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.selectedItem = this.data.find(u => u.id === obj);
    this.displayLabel = this.selectedItem?.value;
    this.displayValue = this.selectedItem?.id;
  }

  ngAfterViewInit(): void {
    const ele = document.getElementById(this.id)!;
    fromEvent(ele, 'click').subscribe({
      next: (_) => {
        const ele = document.getElementsByClassName('select-list-container');
        for (let i = 0; i< ele.length;i++) {
          if (!ele.item(i)?.classList.contains('hidden')) {
            ele.item(i)?.classList.add('hidden')
          }
        }
        document.getElementsByClassName(this.id).item(0)?.classList.remove('hidden');
      }
    })
  }
}
