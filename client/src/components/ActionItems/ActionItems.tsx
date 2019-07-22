import * as React from 'react';

interface Props {
  toggleGM(): void;
}

export default function ActionItems({ toggleGM }: Props) {
  return (
    <div id='mainElement'>
      <button onClick={toggleGM}>GM</button>
    </div>
  );
}
