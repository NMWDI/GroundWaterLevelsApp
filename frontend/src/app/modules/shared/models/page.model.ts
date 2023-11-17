export interface PageResults<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}

