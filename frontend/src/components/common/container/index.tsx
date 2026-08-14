import type { HTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './Container.module.scss';

type TContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: TContainerProps) {
  return (
    <div className={clsx(styles.container, className)} {...props}>
      {children}
    </div>
  );
}
