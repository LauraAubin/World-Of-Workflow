import React from 'react';

import classNames from 'classnames';

import './Typography.scss';

interface Props {
  type: 'heading' | 'content';
  color?: 'yellow' | 'green' | 'white' | 'black';
  size?: 'small' | 'default' | 'large';
  styles?: string;
  children: string | React.ReactNode;
}

export default function Typography({
  type,
  color = 'yellow',
  size = 'default',
  styles,
  children
}: Props) {
  const textStyles = classNames(
    'typography',
    color,
    styles,
    type,
    `${size}Text`,
  );

  return <div className={textStyles}>{children}</div>;
}
