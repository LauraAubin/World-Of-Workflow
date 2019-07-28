import React from 'react';

import { Quest as QuestType } from '../../../types';
import { update } from '../../../utilities/Database';

import './Quest.scss';

interface Props {
  quest: QuestType;
  setShownModal(show): void;
}

export default function Quest({ quest, setShownModal }: Props) {
  const { title, questObjectives } = quest;

  const completeQuest = () => {
    update(quest, { completed: true });
    setShownModal(undefined);
  };

  return (
    <div className='QuestContainer' id='mainElement'>
      <div className='Quest'>
        <div>{title}</div>
        <div>{questObjectives}</div>
        <button onClick={completeQuest}>Mark as complete</button>
      </div>
    </div>
  );
}
