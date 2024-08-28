import { ReactNode } from 'react';
import { PaginationProps } from './Pagination.type';

export interface ColumnProps {
  dataIndex: string;
  title: ReactNode;
}

export interface TableProps {
  columns: ColumnProps[];
  records: any[];
  rowKey?: string;
  pagination?: PaginationProps;
}
