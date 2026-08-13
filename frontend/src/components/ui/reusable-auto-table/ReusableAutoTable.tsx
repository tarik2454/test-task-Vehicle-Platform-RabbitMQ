'use client';

import React from 'react';

import './ReusableAutoTable.css';

export type TAutoTableColumn<TRow> = {
  key: string;
  header: React.ReactNode;
  render: (row: TRow) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
};

export type TAutoTableProps<TRow> = {
  columns: TAutoTableColumn<TRow>[];
  rows: TRow[];
  getRowKey: (row: TRow, index: number) => React.Key;
  ariaLabel?: string;
  minWidth?: number | string;
  loading?: boolean;
  emptyContent?: React.ReactNode;
  footerStart?: React.ReactNode;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  tableClassName?: string;
  onRowClick?: (row: TRow) => void;
};

const cx = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(' ');

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages = new Set([1, currentPage - 1, currentPage, currentPage + 1]);

  if (totalPages > 1) {
    pages.add(totalPages);
  }

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
};

export const ReusableAutoTable = <TRow,>({
  columns,
  rows,
  getRowKey,
  ariaLabel = 'Data table',
  minWidth = 1000,
  loading = false,
  emptyContent = 'No data',
  footerStart,
  currentPage = 1,
  totalPages = 0,
  onPageChange,
  className,
  tableClassName,
  onRowClick,
}: TAutoTableProps<TRow>) => {
  const hasPagination = Boolean(onPageChange && totalPages > 0);
  const pageNumbers = hasPagination
    ? getPageNumbers(currentPage, totalPages)
    : [];

  return (
    <div className={cx('autoTableRoot', className)}>
      <div className="autoTableScroll">
        <table
          className={cx('autoTable', tableClassName)}
          style={{ minWidth }}
          aria-label={ariaLabel}
        >
          <thead className="autoTableHead">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cx(
                    'autoTableHeaderCell',
                    column.className,
                    column.headerClassName
                  )}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="autoTableStateCell" colSpan={columns.length}>
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="autoTableStateCell" colSpan={columns.length}>
                  {emptyContent}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr
                  key={getRowKey(row, index)}
                  className={cx(
                    'autoTableRow',
                    onRowClick && 'autoTableRowClickable'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cx(
                        'autoTableCell',
                        column.className,
                        column.cellClassName
                      )}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {hasPagination && (
        <div className="autoTablePagination">
          <div className="autoTableFooterStart">{footerStart}</div>
          <nav
            className="autoTablePager"
            aria-label={`${ariaLabel} pagination`}
          >
            <button
              type="button"
              className="autoTablePageButton"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Previous page"
            >
              Previous
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                className={cx(
                  'autoTablePageButton',
                  page === currentPage && 'autoTablePageButtonActive'
                )}
                onClick={() => onPageChange?.(page)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="autoTablePageButton"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
          <div />
        </div>
      )}
    </div>
  );
};
