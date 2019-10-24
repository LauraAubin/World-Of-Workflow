import * as React from 'react';

import classNames from 'classnames';

import { Quest as QuestType, ModalTypes } from '../../../types';

import GM from './GM';
import Quest from './Quest';

import './Modal.scss';

interface Props {
  shownModal: ModalTypes | undefined;
  selectedQuest?: QuestType;
  setShownModal(show): void;
}

export default function Modal({
  shownModal,
  selectedQuest,
  setShownModal
}: Props) {
  const GMShown = shownModal === ModalTypes.GM;
  const questSelected = shownModal === ModalTypes.Quest && selectedQuest;

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
