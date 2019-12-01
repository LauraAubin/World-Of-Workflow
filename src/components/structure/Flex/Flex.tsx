import React from 'react';

import classNames from 'classnames';

import './Flex.scss';

interface Props {
  id?: string;
  wrap?: boolean;
  columnOrientation?: boolean;
  horizontalAlignment?: 'left' | 'center' | 'right' | 'space-between';
  verticalAlignment?: 'center' | 'bottom';
  children: any;
}

export default function Flex({
  id,
  wrap,
  columnOrientation,
  horizontalAlignment,
  verticalAlignment,
  children
}: Props) {
  const styles = classNames(
    'flex',
    wrap && 'wrap',
    columnOrientation && 'column',
    horizontalAlignment && `horizontalAlignment-${horizontalAlignment}`,
    verticalAlignment && `verticalAlignment-${verticalAlignment}`
  );

  return (
    <div id={id} className={styles}>
      {children}
    </div>
  );
}
