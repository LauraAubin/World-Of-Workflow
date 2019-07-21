import * as React from 'react';

import Section from './Section';

interface Props {
  /* Specify how many columns in the grid and their size. For example,
  '50% 50%' will create 2 columns, simplified to 'repeat(2, 50%)' or 'repeat(2, 1fr)' if they are the same width */
  columns: string;
  /* Specify how many rows in the grid, same formatting as columns */
  rows: string;
  // children: any;
}

export default class Grid extends React.Component<Props, any> {
  static Section = Section;

  public render() {
    const { columns, rows, children } = this.props;

    const styles = {
      height: '100vh',
      display: 'Grid',
      gridTemplateColumns: columns,
      gridTemplateRows: rows
    };

    return (
      <div style={styles}>
        {children}
      </div>
    );
  }
}