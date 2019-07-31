import React from 'react';

import { Quest as QuestType } from '../../../types';
import { update } from '../../../utilities/Database';

import Image from '../../Image';

import TwoButtons from '../../../art/Quest/Greeting/TwoButtons.png';

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
      <div className='questHeaderActions'>block</div>

      {contentMarkup}

      <div className='questActionButtons'>
        <button onClick={completeQuest}>Complete</button>
      </div>
    </div>
  );

  return (
    <Image image={{ element: TwoButtons }} overlay={{ element: questMarkup }} />
  );
}
