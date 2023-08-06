import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'tc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges{

  @Input() pageSize = 10
  @Input() pageNumber = 1;
  @Input() totalPages = 0;
  @Input() totalRecords = 0;
  @Input() currentSize = 0;

  @Output() pageNumberChange = new EventEmitter();
  @Output() pageSizeChange = new EventEmitter();

  defaultPageSizes: Array<{value: any}> = [{value: 10}, {value: 20}, {value: 30 }, {value: 50}, {value: 100}];

  ngOnChanges(changes: SimpleChanges): void {
  }

  nextPage = () => {
    if (this.totalPages > this.pageNumber) {
      this.pageNumber += 1;
      this.pageNumberChange.emit(this.pageNumber)
    }
  }

  previousPage = () => {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.pageNumberChange.emit(this.pageNumber)
    }
  }

  sizeChange = (event: number) => {
    this.pageSize = event;
    this.pageSizeChange.emit(this.pageSize);
  }
}
