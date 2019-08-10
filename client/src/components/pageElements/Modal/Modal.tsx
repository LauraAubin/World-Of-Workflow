import * as React from 'react';

import { Quest as QuestType, ModalTypes } from '../../../types';

import GM from './GM';
import Quest from './Quest';

import './Modal.scss';

interface Props {
  showModal: ModalTypes | undefined;
  selectedQuest?: QuestType;
  setShownModal(show): void;
}

export default function Modal({
  showModal,
  selectedQuest,
  setShownModal
}: Props) {
  const renderModal =
    (showModal == ModalTypes.GM && <GM />) ||
    (showModal == ModalTypes.Quest && selectedQuest && (
      <Quest quest={selectedQuest} setShownModal={setShownModal} />
    ));

  return <div className='ModalArea'>{renderModal}</div>;
}
