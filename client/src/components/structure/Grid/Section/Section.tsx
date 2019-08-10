import * as React from 'react';

interface Props {
  spanColumns: {start: number, end: number};
  spanRows: {start: number, end: number};
  children: any;
}

export default function Section({ spanColumns, spanRows, children }: Props) {
  const styles = {
    gridArea: `${spanRows.start} / ${spanColumns.start} / ${spanRows.end} / ${spanColumns.end}`
  };

  return <div style={styles}>{children}</div>;
}