import React, { useContext } from 'react';

import classNames from 'classnames';

import { Quest as QuestType, ModalTypes } from '../../../types';
import { ModalContext } from '../../../context/modal';

import GM from './GM';
import Quest from './Quest';

import './Modal.scss';

interface Props {
  selectedQuest?: QuestType;
}

export default function Modal({ selectedQuest }: Props) {
  const modalContext = useContext(ModalContext);

  const GMShown = modalContext.show === ModalTypes.GM;
  const questSelected = modalContext.show === ModalTypes.Quest && selectedQuest;

  const classes = classNames(
    'ModalArea',
    GMShown && 'questGMArea',
    questSelected && 'questModalArea'
  );

  const renderModal =
    (GMShown && <GM closeModal={() => modalContext.onChange(undefined)} />) ||
    (selectedQuest && questSelected && (
      <Quest quest={selectedQuest} />
    ));

  return <div className={classes}>{renderModal}</div>;
}
