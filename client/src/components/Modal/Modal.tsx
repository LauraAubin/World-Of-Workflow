import * as React from 'react';

import { ModalTypes } from '../../types';

import GM from './GM';
import Quest from './Quest';

import './Modal.scss';

interface Props {
  showModal: ModalTypes | undefined;
}

export default function Modal({ showModal }: Props) {
  const renderModal =
    (showModal == ModalTypes.GM && <GM />) ||
    (showModal == ModalTypes.Quest && <Quest />);

  return <div className='ModalArea'>{renderModal}</div>;
}
