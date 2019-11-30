import React from 'react';

import classNames from 'classnames';

import './Flex.scss';

interface Props {
  wrap?: boolean;
  horizontalAlignment?: 'left' | 'center';
  verticalAlignment?: 'center';
  children: any;
}

export default function Flex({
  wrap,
  horizontalAlignment,
  verticalAlignment,
  children
}: Props) {
  const styles = classNames(
    'flex',
    wrap,
    `horizontalAlignment-${horizontalAlignment}`,
    `verticalAlignment-${verticalAlignment}`
  );

  return <div className={styles}>{children}</div>;
}
