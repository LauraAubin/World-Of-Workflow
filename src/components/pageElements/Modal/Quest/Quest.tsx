import React from 'react';

import { Quest as QuestType } from '../../../../types';

import Button from '../../../universalElements/Button';

import './Quest.scss';

const { ipcRenderer } = window.require('electron');

interface Props {
  quest: QuestType;
  setShownModal(show): void;
}

export default function Quest({ quest, setShownModal }: Props) {
  const { title, description, questObjectives } = quest;

  const completeQuest = () => {
    ipcRenderer.send('update', {
      record: quest,
      where: { completed: true }
    });

    setShownModal(undefined);
  };

  const headerText = text => (
    <div className='questContentHeaderText'>{text}</div>
  );
  const descriptionText = text => (
    <div className='questContentDescriptionText'>{text}</div>
  );

  const contentMarkup = (
    <>
      {headerText(title)}
      {descriptionText(description)}
      {headerText('Quest Objectives')}
      {descriptionText(questObjectives)}
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
