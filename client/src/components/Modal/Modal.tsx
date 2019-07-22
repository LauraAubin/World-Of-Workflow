import * as React from 'react';

import GM from './GM';

import './Modal.scss';

interface Props {
  showGM: boolean;
}

export default function Modal({ showGM }: Props) {
  return <div className='ModalArea'>{showGM && <GM />}</div>;
}
