import type { ComponentPropsWithoutRef } from 'react';

import clsx from 'clsx';

import styles from './PageWrapper.module.scss';

type TPageWrapperProps = ComponentPropsWithoutRef<'main'>;

export function PageWrapper({ className, children, ...props }: TPageWrapperProps) {
  return (
    <main className={clsx(styles.pageWrapper, className)} {...props}>
      {children}
    </main>
  );
}
