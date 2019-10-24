import React from 'react';

import classNames from 'classnames';

import './Typography.scss';

interface Props {
  type: 'heading' | 'content';
  style?: string;
  children: string | React.ReactNode;
}

export default function Typography({ type, style, children }: Props) {
  const styles = classNames(
    style,
    type == 'heading' && 'heading',
    type == 'content' && 'content'
  );

  return <div className={styles}>{children}</div>;
}
