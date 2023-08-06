import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'tc-adv-table',
  templateUrl: './tc-adv-table.component.html',
  styleUrls: ['./tc-adv-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TcAdvTableComponent implements OnChanges{
  @Input() data: Array<any>[] = [];
  mainData: any[] = [];

  @Input() showPagination = false;
  @Input() usePagination = false;

  pageSize = 10
  pageNumber = 1;
  totalPages = 0;
  totalRecords = 0;

  startCount = 0;
  endCount = 0;

  constructor(private cd: ChangeDetectorRef) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].firstChange) {
      console.log(this.data);
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
}
