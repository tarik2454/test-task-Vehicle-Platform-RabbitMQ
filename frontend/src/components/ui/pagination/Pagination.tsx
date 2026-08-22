'use client';

import React from 'react';

import styles from './Pagination.module.scss';

export type TPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
  footerStart?: React.ReactNode;
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

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel = 'Pagination',
  footerStart,
}: TPaginationProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  if (totalPages <= 0) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.footerStart}>{footerStart}</div>
      <nav className={styles.pager} aria-label={ariaLabel}>
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            className={cx(styles.pageButton, page === currentPage && styles.pageButtonActive)}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </nav>
      <div />
    </div>
  );
}
