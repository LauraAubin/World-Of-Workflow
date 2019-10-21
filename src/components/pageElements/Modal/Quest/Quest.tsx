import React from 'react';
import moment from 'moment';

import { Quest as QuestType } from '../../../../types';

import Button from '../../../universalElements/Button';
import Typography from '../../../universalElements/Typography';

import './Quest.scss';

const { ipcRenderer } = window.require('electron');

interface Props {
  quest: QuestType;
  setShownModal(show): void;
}

export default function Quest({ quest, setShownModal }: Props) {
  const { title, description, dueDate, questObjectives } = quest;

  const completeQuest = () => {
    ipcRenderer.send('update', {
      record: quest,
      where: { completed: true }
    });

    setShownModal(undefined);
  };

  const dueDateMarkup = moment(dueDate).format('dddd, MMMM D');

  const contentMarkup = (
    <>
      {headerText(title)}
      {descriptionText(description)}
      {headerText('Quest Objectives')}
      {descriptionText(questObjectives)}
      <Typography type='content' style='questDueDateText'>
        {`Due on ${dueDateMarkup}`}
      </Typography>
    </>
  );

  return (
    <div className='quest' id='mainElement'>
      <div className='closeButton'>
        <Button minimize onClick={() => setShownModal(undefined)} />
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
    <Typography type='heading' style='questContentHeaderText'>
      {text}
    </Typography>
  );
}

export function descriptionText(text) {
  return (
    <Typography type='content' style='questContentDescriptionText'>
      {text}
    </Typography>
  );
}
