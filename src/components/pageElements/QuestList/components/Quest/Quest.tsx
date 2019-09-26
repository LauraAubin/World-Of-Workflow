import React from 'react';

import { Quest as QuestType } from '../../../../../types';

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
      <div className='questIcon'>
        <div className='questIconSymbol' />
      </div>

      <div className='questDetailsText'>
        <div className='title'>{record.title}</div>
        <div className='objective'>- {record.questObjectives}</div>
      </div>
    </div>
  );
}
