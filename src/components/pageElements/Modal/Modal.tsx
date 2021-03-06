import React, { useContext } from 'react';

import classNames from 'classnames';

import { Quest as QuestType, ModalTypes } from '../../../types';
import { ModalContext } from '../../../context/modal';

import GM from './GM';
import Quest from './Quest';
import Flex from '../../structure/Flex';

import './Modal.scss';

export default function Modal() {
  const modalContext = useContext(ModalContext);

  const GMShown = modalContext.show === ModalTypes.GM;
  const questSelected = isQuest(modalContext.show);

  const classes = classNames(questSelected && 'questModalArea');

  return (
    <div className={classes}>
      <Flex horizontalAlignment={(questSelected && 'left') || 'center'}>
        {GMShown && <GM />}
        {questSelected && <Quest quest={modalContext.show as QuestType} />}
      </Flex>
    </div>
  );
}

function isQuest(object: any): object is QuestType {
  if (object && (object as QuestType).table) return true;
  return false;
}
