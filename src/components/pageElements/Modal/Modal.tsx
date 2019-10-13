import * as React from 'react';

import classNames from 'classnames';

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
  const GMShown = showModal === ModalTypes.GM;
  const questSelected = showModal === ModalTypes.Quest && selectedQuest;

  const classes = classNames(
    'ModalArea',
    GMShown && 'questGMArea',
    questSelected && 'questModalArea'
  );

  const renderModal =
    (GMShown && <GM closeModal={() => setShownModal(undefined)} />) ||
    (selectedQuest && questSelected && (
      <Quest quest={selectedQuest} setShownModal={setShownModal} />
    ));

  return <div className={classes}>{renderModal}</div>;
}
