import React, { useContext } from 'react';
import moment from 'moment';

import { Quest as QuestType } from '../../../../types';
import { ModalContext } from '../../../../context/modal';

import Button from '../../../universalElements/Button';
import Typography from '../../../universalElements/Typography';

import './Quest.scss';

const { ipcRenderer } = window.require('electron');

interface Props {
  quest: QuestType;
}

export default function Quest({ quest }: Props) {
  const { title, description, dueDate, questObjectives } = quest;
  const modalContext = useContext(ModalContext);

  const completeQuest = () => {
    ipcRenderer.send('update', {
      record: quest,
      where: { completed: true }
    });

    modalContext.onChange(undefined);
  };

  const dueDateMarkup = moment(dueDate).format('dddd, MMMM D');

  const contentMarkup = (
    <>
      {headerText(title)}
      {descriptionText(description)}
      {headerText('Quest Objectives')}
      {descriptionText(questObjectives)}
      <Typography type='content' styles='questDueDateText'>
        {`Due on ${dueDateMarkup}`}
      </Typography>
    </>
  );

  return (
    <div className='quest' id='mainElement'>
      <div className='closeButton'>
        <Button minimize onClick={() => modalContext.onChange(undefined)} />
      </div>

      <div className='contentArea'>{contentMarkup}</div>

      <div className='completeButton'>
        <Button onClick={completeQuest}>Complete Quest</Button>
      </div>
    </div>
  );
}

export function headerText(text) {
  return (
    <Typography type='heading' color='black' styles='questContentHeaderText'>
      {text}
    </Typography>
  );
}

export function descriptionText(text) {
  return (
    <Typography type='content' styles='questContentDescriptionText'>
      {text}
    </Typography>
  );
}
