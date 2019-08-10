import React from 'react';

import { Quest as QuestType } from '../../../../types';
import { update } from '../../../../utilities/Database';

import Button from '../../../universalElements/Button';

import './Quest.scss';

interface Props {
  quest: QuestType;
  setShownModal(show): void;
}

export default function Quest({ quest, setShownModal }: Props) {
  const { title, description, questObjectives } = quest;

  const completeQuest = () => {
    update(quest, { completed: true });
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
        <Button completeQuest onClick={completeQuest}>
          Complete Quest
        </Button>
      </div>
    </div>
  );
}
