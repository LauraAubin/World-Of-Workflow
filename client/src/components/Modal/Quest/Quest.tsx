import React from 'react';

import { Quest as QuestType } from '../../../types';
import { update } from '../../../utilities/Database';

import Button from '../../Button';

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
        <Button
          minimize
          width={18}
          height={18}
          onClick={() => setShownModal(undefined)}
        />
      </div>

      <div className='contentArea'>{contentMarkup}</div>

      <div className='completeButton'>
        <Button width={115} onClick={completeQuest}>
          Complete Quest
        </Button>
      </div>
    </div>
  );
}
