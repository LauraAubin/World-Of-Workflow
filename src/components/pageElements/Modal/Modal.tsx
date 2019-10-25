import React, { useContext } from 'react';

import classNames from 'classnames';

import { Quest as QuestType, ModalTypes } from '../../../types';
import { ModalContext } from '../../../context/modal';

import GM from './GM';
import Quest from './Quest';

import './Modal.scss';

export default function Modal() {
  const modalContext = useContext(ModalContext);

  const GMShown = modalContext.show === ModalTypes.GM;
  const questSelected = isQuest(modalContext.show);

  const classes = classNames(
    'ModalArea',
    GMShown && 'questGMArea',
    questSelected && 'questModalArea'
  );

  return (
    <div className={classes}>
      {GMShown && <GM closeModal={() => modalContext.onChange(undefined)} />}
      {questSelected && <Quest quest={modalContext.show as QuestType} />}
    </div>
  );
}

function isQuest(object: any): object is QuestType {
  if (object && (object as QuestType).table) return true;
  return false;
}
