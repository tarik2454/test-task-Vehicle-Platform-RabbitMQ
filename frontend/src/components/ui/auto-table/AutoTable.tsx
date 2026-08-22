'use client';

import React from 'react';

import styles from './AutoTable.module.scss';

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
  className?: string;
  tableClassName?: string;
  onRowClick?: (row: TRow) => void;
};

const cx = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(' ');

export const AutoTable = <TRow,>({
  columns,
  rows,
  getRowKey,
  ariaLabel = 'Data table',
  minWidth = 1000,
  loading = false,
  emptyContent = 'No data',
  className,
  tableClassName,
  onRowClick,
}: TAutoTableProps<TRow>) => (
  <div className={cx(styles.autoTableRoot, className)}>
    <div className={styles.autoTableScroll}>
      <table
        className={cx(styles.autoTable, tableClassName)}
        style={{ minWidth }}
        aria-label={ariaLabel}
      >
        <thead className={styles.autoTableHead}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cx(styles.autoTableHeaderCell, column.className, column.headerClassName)}
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
              <td className={styles.autoTableStateCell} colSpan={columns.length}>
                Loading...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td className={styles.autoTableStateCell} colSpan={columns.length}>
                {emptyContent}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={getRowKey(row, index)}
                className={cx(styles.autoTableRow, onRowClick && styles.autoTableRowClickable)}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cx(styles.autoTableCell, column.className, column.cellClassName)}
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
  </div>
);
