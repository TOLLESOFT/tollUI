export interface Pagination {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalRecords: number;
  currentSize: number;
  pageSizeChangeHandler: (pageSize: number) => void;
  pageNumberChangeHandler: (pageNumber: number) => void;
}
