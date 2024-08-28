import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import classNames from 'classnames';
import React, { useState } from 'react';
import { PaginationProps } from 'shared-resources/types/Pagination.type';
import Input from '../Input/Input';
import { getFromTo, getLastPage } from './helper';

const Pagination: React.FC<PaginationProps> = (props) => {
  const { total, pageLimit, currentPage, setCurrentPage } = props;

  const [currentPageError, setCurrentPageError] = useState<string>();

  const lastPage = getLastPage(total, pageLimit);

  const { from, to } = getFromTo(currentPage, pageLimit, total);

  const checkAndSetPageError = (page: number) => {
    if (page < 1 || page > lastPage) {
      setCurrentPageError('Page Limit Out Bound');
    } else {
      setCurrentPageError(undefined);
    }
  };

  const handlePageChange = (action: 'next' | 'prev') => {
    const newPage = action === 'next' ? currentPage + 1 : currentPage - 1;
    setCurrentPage(newPage);
    checkAndSetPageError(newPage);
  };

  return (
    <div className='flex items-center justify-between w-full px-4 py-3 bg-white border-t border-gray-200 sm:px-6'>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p
            className={classNames(
              'text-sm',
              currentPageError ? 'text-red-400' : 'text-gray-500'
            )}
          >
            Showing <span className='font-medium'>{from > 0 ? from : 0}</span>{' '}
            to <span className='font-medium'>{to > 0 ? to : 0}</span> of{' '}
            <span className='font-medium'>{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className='relative z-0 inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <button
              onClick={() => handlePageChange('prev')}
              className='relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50'
            >
              <span className='sr-only'>Previous</span>
              <BsChevronLeft className='w-5 h-5' aria-hidden='true' />
            </button>

            <Input
              type='number'
              value={currentPage}
              error={currentPageError}
              showErrorText={false}
              onChange={(e) => {
                const newPage = parseInt(e.target.value, 10);
                setCurrentPage(newPage);
                checkAndSetPageError(newPage);
              }}
              className='relative z-10 inline-flex items-center w-16 h-full px-4 py-2 mx-4 text-sm font-medium '
            />

            <span className='relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300'>
              / {lastPage}
            </span>

            <button
              onClick={() => handlePageChange('next')}
              className='relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50'
            >
              <span className='sr-only'>Next</span>
              <BsChevronRight className='w-5 h-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
