import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,SimpleChanges
} from '@angular/core';

@Component({
  selector: 'tc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']

})
export class TableComponent implements OnChanges{
  @Input() data: Array<any>[] = [];
  @Input() fullScreen: boolean = false;
  mainData: any[] = [];

  @Input() showPagination = false;
  @Input() usePagination = false;

  pageSize = 10
  pageNumber = 1;
  totalPages = 0;
  totalRecords = 0;

  startCount = 0;
  endCount = 0;

  image: any;

  constructor(private cd: ChangeDetectorRef) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].firstChange) {
      this.mainData = changes['data'].currentValue;
      if (this.usePagination) {
        this.calcPagination();
      }
    }

    this.cd.detectChanges();
  }

  calcPagination = () => {
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

  pageNumberChangeEvent = (event: number) => {
    this.pageNumber = event;
    this.calcPagination();
  }

  pageSizeChangeEvent = (event: number) => {
    this.pageSize = event;
    this.calcPagination();
  }

  sort(field: string, order: 'asc' | 'dsc' = 'asc') {

    let compareASC = (a: any, b: any) => {
      let aValue;
      let bValue;

      if (field.includes('.')) {
        aValue = this.getValue(a, field.split('.'));
        bValue = this.getValue(b, field.split('.'));

        return aValue?.localeCompare(bValue);
      } else {
        return a[field].localeCompare(b[field])
      }
    }

    let compareDSC = (a: any, b: any) => {
      let aValue ;
      let bValue;

      if (field.includes('.')) {
        aValue = this.getValue(a, field.split('.'));
        bValue = this.getValue(b, field.split('.'));
        return bValue?.localeCompare(aValue);
      } else {
        return b[field].localeCompare(a[field])
      }
    }

    if (order === 'asc') {
      this.data.sort(compareASC);
    } else {
      this.data.sort(compareDSC);
    }
    this.calcPagination();
  }
  sortNumber(field: string, order: 'asc' | 'dsc' = 'asc') {

    let compareASC = (a: any, b: any) => {
      let aValue;
      let bValue;

      if (field.includes('.')) {
        aValue = this.getValue(a, field.split('.'));
        bValue = this.getValue(b, field.split('.'));
        return parseFloat(aValue) - parseFloat(bValue);
      } else {
        return parseFloat(a[field]) - parseFloat(b[field]);
      }
    }

    let compareDSC = (a: any, b: any) => {
      let aValue ;
      let bValue;

      if (field.includes('.')) {
        aValue = this.getValue(a, field.split('.'));
        bValue = this.getValue(b, field.split('.'));
        return parseFloat(bValue) - parseFloat(aValue);
      } else {
        return parseFloat(b[field]) - parseFloat(a[field]);
      }
    }

    if (order === 'asc') {
      this.data.sort(compareASC);
    } else {
      this.data.sort(compareDSC);
    }
    this.calcPagination();
  }

  getValue = (item: any ,value: any[]):any => {
    let result;
    for (let i = 0; i < value.length; i++) {
      if (!result) {
        result = item?.[value[i]]
      } else {
        result = result?.[value[i]]
      }
    }
    return result;
  }
}
