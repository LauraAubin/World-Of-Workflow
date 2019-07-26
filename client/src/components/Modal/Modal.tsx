import * as React from 'react';

import { Quest as QuestType, ModalTypes } from '../../types';

import GM from './GM';
import Quest from './Quest';

import './Modal.scss';

interface Props {
  showModal: ModalTypes | undefined;
  selectedQuest?: QuestType;
}

export default function Modal({ showModal, selectedQuest }: Props) {
  const renderModal =
    (showModal == ModalTypes.GM && <GM />) ||
    (showModal == ModalTypes.Quest && selectedQuest && (
      <Quest selectedQuest={selectedQuest} />
    ));

  return <div className='ModalArea'>{renderModal}</div>;
}
