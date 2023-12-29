import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseService} from "../../base.service";
import {SearchItem} from "../search-item";
import {fromEvent, Subscription} from "rxjs";
import {SelectListService} from "../select-list.service";

@Component({
  selector: 'tc-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  providers: [
    SelectListService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectListComponent)
    }
  ]
})

export class SelectListComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges {
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
  @Output() OnInputChange = new EventEmitter();
  @Input() size: 'small' | 'normal' | 'large' | undefined = 'normal';
  @Input() templateMode = false;
  defaultSize = 'p-2.5 text-sm';
  smallSize = 'p-2 sm:text-xs';
  largeSize = 'p-4 sm:text-md';
  defaultClass = 'bg-gray-50 focus:outline-none text-gray-900 rounded-lg block w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white';
  inputValidClass = 'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-400 dark:border-gray-500';
  invalidClass = 'focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 border border-red-500 dark:border-red-600';

  subscriptions: Subscription[] = [];
  onChange = (value: any | null) => {
  };
  onTouched = (value: any | null) => {
  };
  newList: Array<SearchItem> = [];
  hidden = true;
  selectedItem?: SearchItem;
  displayLabel = '';
  displayValue: any;
  @Input() dataLabel: any;
  @Input() dataId: any;
  @Input() disabled = false;

  constructor(private service: SelectListService) {
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
    this.service.selected.subscribe({
      next: value => {
        this.onChange(value);
      }
    })
    if (this.data?.length > 0) {
      this.transformedData = this.data.map(u => {
          return <SearchItem>{ id: (this.dataId) ? u[this.dataId] : u, value: (this.dataLabel) ? u[this.dataLabel] : u }
      })
      this.newList = this.transformedData;
    }
  }

  selectItem(item: SearchItem) {
    this.selectedItem = item;
    this.displayLabel = this.selectedItem.value;
    this.displayValue = this.selectedItem.id;
    this.onChange(item.id);
  }

  clearItem() {
    this.displayValue = null;
    this.displayLabel = '';
    if (this.required) {
      this.invalid = true;
    }
    this.onChange(null);
  }

  searchList(value: string) {
    this.transformedData = this.newList;
    this.transformedData = [...this.transformedData.filter((item) => String(item.value).toLowerCase().includes(value.toLowerCase()))];

    this.OnInputChange.emit(value);
  }

  addNew() {
    this.addNewItem.emit(this.displayLabel);

    const data = this.transformedData.find(u => u.id === this.displayLabel);

    if (!data) {
      this.transformedData.push({id: this.displayLabel, value: this.displayLabel})
      this.selectItem({id: this.displayLabel, value: this.displayLabel})
    }
  }

  registerOnChange(fn: (value: any | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: any | null) => void): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    if(!this.templateMode)  {
      const data = this.transformedData.find(u => u.id === obj);
      this.displayLabel = data?.value;
      this.displayValue = data?.id;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterViewInit(): void {
    const element = document.getElementById(this.id) as HTMLDivElement;
    const mainElement = document.getElementById(this.mainId) as HTMLDivElement;
    const dropElement = document.getElementById(this.dropItemId) as HTMLDivElement

    this.subscriptions.push(fromEvent(element, 'click').subscribe({
      next: (_) => {
        const ele = document.getElementsByClassName('select-list-container');
        for (let i = 0; i< ele.length;i++) {
          if (!ele.item(i)?.classList.contains('hidden')) {
            if (ele.item(i)?.id !== this.dropItemId) {
              ele.item(i)?.classList.add('hidden')
            }
          }
        }

        document.getElementById(this.dropItemId)?.classList.toggle('hidden');
        const space = window.innerHeight - mainElement.offsetTop + mainElement.clientHeight - 100;

        if (dropElement.clientHeight > space) {
          dropElement.style.bottom = `${mainElement.clientHeight}px`;
        }
      }
    }))

    this.subscriptions.push(fromEvent(element, 'input').subscribe({
      next: (_) => {
        const ele = document.getElementsByClassName('select-list-container');
        for (let i = 0; i< ele.length;i++) {
          if (!ele.item(i)?.classList.contains('hidden')) {
            if (ele.item(i)?.id !== this.dropItemId) {
              ele.item(i)?.classList.add('hidden')
            }
          }
        }

        document.getElementById(this.dropItemId)?.classList.remove('hidden');
        const space = window.innerHeight - mainElement.offsetTop + mainElement.clientHeight - 100;

        if (dropElement.clientHeight > space) {
          dropElement.style.bottom = `${mainElement.clientHeight}px`;
        }
      }
    }))

    fromEvent(document, 'click').subscribe({
      next: (_) => {
        if (!document.activeElement?.attributes.getNamedItem('select-list')) {
          const ele = document.getElementsByClassName('select-list-container');
          for (let i = 0; i< ele.length;i++) {
            if (!ele.item(i)?.classList.contains('hidden')) {
              ele.item(i)?.classList.add('hidden')
            }
          }
        }
      }
    })
  }

}
