import React from 'react';

import { Quest as QuestType } from '../../../types';

import './Quest.scss';

interface Props {
  selectedQuest: QuestType;
}

export default function Quest({
  selectedQuest: { title, questObjectives }
}: Props) {
  return (
    <div className='QuestContainer'>
      <div>{title}</div>
      <div>{questObjectives}</div>
    </div>
  );
}
