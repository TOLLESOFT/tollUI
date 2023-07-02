import {
  AfterViewInit,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output, SimpleChanges
} from '@angular/core';
import {TableHeader} from "../table-header";
import {TableActions} from "../table-actions";

@Component({
  selector: 'pi-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']

})
export class TableComponent implements OnInit, OnChanges{
  @Input() data: any[] = []
  @Input() imageFields: string[] = [];
  @Input() headers: TableHeader[] = [];
  @Input() emptyMessage: string = 'You have no data to display.';
  @Input() actions: TableActions[] = [];
  @Input() showPagination = false;
  @Input() usePagination = false;

  @Input() useChildTable = false;
  @Input() childTableField: string  = '';
  @Input() childTableHeaders: TableHeader[] = [];
  @Input() childActions: TableActions[] = [];

  @Input() allowCheckBoxes = false;
  allSelected= false;
  selectedItems: any[] = [];

  pageSize = 10
  pageNumber = 1;
  totalPages = 0;
  totalRecords = 0;

  startCount = 0;
  endCount = 0;

  @Input() showNumbering = false;
  mainData: any[] = [];

  @Output() OnActionPerformed = new EventEmitter();
  @Output() OnChildActionPerformed = new EventEmitter();
  @Output() OnItemChecked = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
   this.checkIfAllSelected();
    this.mainData = this.data;
    if (this.usePagination) {
      this.calcPagination();
    }
  }

  checkIfAllSelected = () => {
    if (this.allowCheckBoxes) {
      this.data.forEach((item: any) => {
        const find = this.selectedItems.find(u => u === item);
        if (!find) {
          if (this.allSelected) {
            item.checked = this.allSelected;
            this.selectedItems.push(item);
          }
        }
      })
    }
  }

  pageNumberChangeEvent = (event: number) => {
    this.pageNumber = event;
    this.calcPagination();
  }

  pageSizeChangeEvent = (event: number) => {
    this.pageSize = event;
    this.calcPagination();
  }

  calcPagination = () => {
    this.checkIfAllSelected();
    this.mainData = this.data;
    this.totalRecords = this.mainData.length;
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    if (this.pageNumber > this.totalPages) {
      this.pageNumber = 1;
    }
    if (this.pageNumber === 1) {
      this.startCount = 0;
      this.endCount = this.pageSize;
      this.mainData = [...this.mainData.slice(this.pageNumber-1, this.pageSize)]
    } else {
      this.startCount = (this.pageNumber*this.pageSize)-this.pageSize;
      this.endCount = (this.startCount + this.pageSize);
      this.mainData = [...this.mainData.slice(this.startCount, this.endCount)];
    }
  }

  getValue = (item: any ,value: any[]):any => {
    let result;
    for (let i = 0; i < value.length; i++) {
      if (!result) {
        result = item[value[i]]
      } else {
        result = result[value[i]]
      }
    }
    return result;
  }

  calcColSpan = () => {
    let length = this.headers.length + 1;
    if (this.actions.length > 0) {
      length += 1;
    }
    if (this.showNumbering) {
      length += 1;
    }
    if (this.allowCheckBoxes) {
      length += 1;
    }
    return length;
  }

  collapseChild = (item: any) => {
    this.mainData.forEach((u: any) => {
      if (u !== item) {
        u.expand = false
      }
    });
    item.expand = !item.expand;
  }

  selectAll = (value: boolean) => {
    this.data.forEach(data => data.checked = value);
    this.mainData.forEach(data => data.checked = value);
    this.selectedItems = this.data.filter(u => u.checked);
    this.OnItemChecked.emit(this.selectedItems);
  }

  checkItem = (item: any,value: boolean) => {
    this.allSelected = this.mainData.every(u => u.checked);
    if (value) {
      const find = this.selectedItems.find(u => u === item);
      if (find) {
        this.OnItemChecked.emit(this.selectedItems);
      } else {
        item.checked = true;
        this.selectedItems.push(item);
        this.OnItemChecked.emit(this.selectedItems);
      }
    } else {
      const find = this.selectedItems.find(u => u === item);
      if (find) {
        this.selectedItems.splice(this.selectedItems.findIndex(u => u === item), 1);
        this.OnItemChecked.emit(this.selectedItems);
      }
    }
  }
}
