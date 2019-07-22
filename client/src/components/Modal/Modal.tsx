import * as React from 'react';

import './Modal.scss';

interface Props {
  GM: boolean;
}

export default function Modal({ GM }: Props) {
  const GmMarkup = (
    <div className='GM' id='mainElement'>
      GM
    </div>
  );

  return <div className='ModalArea'>{GM && GmMarkup}</div>;
}
