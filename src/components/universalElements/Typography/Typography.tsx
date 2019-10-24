import React from 'react';

import classNames from 'classnames';

import './Typography.scss';

interface Props {
  type: 'heading' | 'content';
  styles?: string;
  children: string | React.ReactNode;
}

export default function Typography({ type, styles, children }: Props) {
  const textStyles = classNames(
    styles,
    type == 'heading' && 'heading',
    type == 'content' && 'content'
  );

  return <div className={textStyles}>{children}</div>;
}
