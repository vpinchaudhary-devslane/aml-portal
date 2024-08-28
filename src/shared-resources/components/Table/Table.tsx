import React, { useMemo } from 'react';
import { ColumnProps, TableProps } from 'shared-resources/types/Table.type';
import Empty from '../Empty/Empty';
import { getFromTo } from '../Pagination/helper';
import Pagination from '../Pagination/Pagination';

const Table: React.FC<TableProps> = (props) => {
  const { columns, records, rowKey = 'id', pagination } = props;

  const filteredRecords = useMemo(() => {
    if (pagination) {
      const { currentPage, pageLimit, total } = pagination;
      const { fromIndex, toIndex } = getFromTo(currentPage, pageLimit, total);
      return records.slice(fromIndex, toIndex);
    }
    return records;
  }, [records, pagination]);

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col mt-8'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    {columns.map((col: ColumnProps) => (
                      <th
                        key={col.dataIndex}
                        scope='col'
                        className='py-3 pl-4 pr-3 text-xs font-medium tracking-wide text-left text-gray-500 uppercase sm:pl-6'
                      >
                        {col.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredRecords.map((record) => (
                    <tr key={record[rowKey]}>
                      {columns.map((col: ColumnProps) => (
                        <td
                          key={`${record[rowKey]}_${col.dataIndex}`}
                          className='py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6'
                        >
                          {record[col.dataIndex]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRecords.length === 0 && (
                <div className='flex justify-center'>
                  <Empty />
                </div>
              )}
              {pagination && <Pagination {...pagination} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Table);
