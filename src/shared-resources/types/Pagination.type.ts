export interface PaginationProps {
  total: number;
  pageLimit: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}
