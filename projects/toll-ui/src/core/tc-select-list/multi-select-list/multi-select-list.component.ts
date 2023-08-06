import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseService} from "../../base.service";
import {SearchItem} from "../search-item";
import {fromEvent} from "rxjs";

@Component({
  selector: 'tc-multi-select-list',
  templateUrl: './multi-select-list.component.html',
  styleUrls: ['./multi-select-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MultiSelectListComponent)
    }
  ]
})
export class MultiSelectListComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges {
  @Input() id: string = BaseService.uuid();
  mainId = BaseService.uuid();
  dropItemId = BaseService.uuid();
  @Input() placeholder: string = '';
  @Input() data: Array<any> = [];
  transformedData: Array<SearchItem> = [];
  @Input() allowClear = false;
  @Input() showAddButton = true;
  @Input() searchable = false;
  @Input() showIcon = false;
  @Input() required: boolean = false;
  @Input() invalid: boolean = false;
  @Input() label: string = '';
  @Output() addNewItem = new EventEmitter();
  @Input() size: 'small' | 'normal' | 'large' | undefined = 'normal'
  defaultSize = 'p-2.5 text-sm';
  smallSize = 'p-2 sm:text-xs';
  largeSize = 'p-4 sm:text-md';
  defaultClass = 'bg-gray-50 focus:outline-none text-gray-900 rounded-lg block w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white';
  inputValidClass = 'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-400 dark:border-gray-500';
  invalidClass = 'focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 border border-red-500 dark:border-red-600'
  onChange = (value: any | null) => {};
  onTouched = (value: any | null) => {};
  newList: Array<SearchItem> = [];
  hidden = true;
  selectedItem?: SearchItem;
  displayLabel = '';
  displayValue: any[] = [];
  selectedItems: any[] = [];
  @Input() dataLabel: any;
  @Input() dataId: any;
  @Input() disabled = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newData = changes['data']?.currentValue as [];
    if (newData?.length > 0) {
      this.transformedData = this.data.map(u => {
        return <SearchItem>{ id: (this.dataId) ? u[this.dataId] : u, value: (this.dataLabel) ? u[this.dataLabel] : u }
      })

      this.newList = this.transformedData;
    }
  }

  ngOnInit(): void {
    if (this.data?.length > 0) {
      this.transformedData = this.data.map(u => {
        return <SearchItem>{ id: (this.dataId) ? u[this.dataId] : u, value: (this.dataLabel) ? u[this.dataLabel] : u }
      })
      this.newList = this.transformedData;
    }
  }


  selectItem(item: SearchItem) {
    const find = this.transformedData.find(u => u === item) as SearchItem;
    if (find) {
      const selected = this.selectedItems.find(u => u === find.id);
      let newDisplayLabel = '';
      if (!selected) {
        this.selectedItems.push(find.id);
      } else {
        const index = this.selectedItems.findIndex(u => u === find.id);
        this.selectedItems.splice(index, 1);
      }

      this.selectedItems.forEach(u => {
        const findLabel = this.transformedData.find(m => m.id === u);

        if (findLabel) {
          newDisplayLabel = `${
            newDisplayLabel
              ? `${newDisplayLabel}, ${findLabel.value}`
              : findLabel.value
          }`
        }
      })

      this.displayLabel = newDisplayLabel;
      this.displayValue = this.selectedItems;
    }
    this.onChange(this.displayValue);
  }

  clearItem() {
    this.displayValue = [];
    this.displayLabel = '';
    if (this.required) {
      this.invalid = true;
    }
    this.onChange([]);
  }

  searchList(value: string) {
    this.transformedData = this.newList;
    this.transformedData = [...this.transformedData.filter((item) => String(item.value).toLowerCase().includes(value.toLowerCase()))];
  }

  registerOnChange(fn: (value: any | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: any | null) => void): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    if (obj) {
      obj.forEach((u: any, index: number) => {
        if (index === 0) {
          this.displayLabel = `${u}`
        } else {
          this.displayLabel = `${this.displayLabel}, ${u}`
        }
        this.selectedItems.push(u);
      })
      this.displayValue = this.selectedItems;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  checkItem = (item: any):boolean => {
    const display = this.selectedItems.find(u => u === item);
    return !!display;
  }

  ngAfterViewInit(): void {
    const element = document.getElementById(this.id) as HTMLDivElement;
    const mainElement = document.getElementById(this.mainId) as HTMLDivElement;
    const dropElement = document.getElementById(this.dropItemId) as HTMLDivElement
    fromEvent(element, 'click').subscribe({
      next: (_) => {
        const ele = document.getElementsByClassName('multi-select-list-container');
        for (let i = 0; i< ele.length;i++) {
          if (!ele.item(i)?.classList.contains('hidden')) {
            ele.item(i)?.classList.add('hidden')
          }
        }
        document.getElementsByClassName(this.id).item(0)?.classList.remove('hidden');
        const space = window.innerHeight - mainElement.offsetTop + mainElement.clientHeight;

        if (dropElement.clientHeight > space) {
          dropElement.style.bottom = `${mainElement.clientHeight}px`;
        }
      }
    })
  }

}

