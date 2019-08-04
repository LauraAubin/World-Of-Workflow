import React from 'react';

import { Quest as QuestType } from '../../../types';
import { update } from '../../../utilities/Database';

import Image from '../../Image';
import Button from '../../Button';

import OneButtonQuest from '../../../art/Quest/Greeting/OneButtonQuest.png';

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
    <div className='questContentDescription'>{text}</div>
  );

  const contentMarkup = (
    <div className='questContentArea'>
      {headerText(title)}
      {descriptionText(description)}
      {headerText('Quest Objectives')}
      {descriptionText(questObjectives)}
    </div>
  );

  const questMarkup = (
    <div className='layout' id='mainElement'>
      <div className='questHeaderActions'>
        <div className='minimizeButton'>
          <Button
            minimize
            width={18}
            height={18}
            onClick={() => setShownModal(undefined)}
          />
        </div>
      </div>

      {contentMarkup}

      <div className='actionButton'>
        <Button width={115} onClick={completeQuest}>
          Complete Quest
        </Button>
      </div>
    </div>
  );

  return (
    <Image
      content={{ element: OneButtonQuest }}
      overlay={{ element: questMarkup }}
    />
  );
}
