import * as React from 'react';

import { ModalTypes } from '../../types';

interface Props {
  setShownModal(ModalTypes): void;
}

export default function ActionItems({ setShownModal }: Props) {
  return (
    <div id='mainElement'>
      <button onClick={() => setShownModal(ModalTypes.GM)}>GM</button>
    </div>
  );
}
