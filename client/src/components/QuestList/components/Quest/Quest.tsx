import React from 'react';

import { Quest as QuestType } from '../../../../types';

import './Quest.scss';

interface Props {
  record: QuestType;
  setSelectedQuest(record): void;
}

export default function Quest({ record, setSelectedQuest }: Props) {
  return (
    <div
      className='questContainer'
      key={record.created_at}
      onClick={() => setSelectedQuest(record)}
    >
      <div>?</div>
      <div className='questDetails'>
        <div>{record.title}</div>
        <div>{record.questObjectives}</div>
      </div>
    </div>
  );
}
