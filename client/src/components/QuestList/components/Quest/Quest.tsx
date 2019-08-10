import React from 'react';

import { Quest as QuestType } from '../../../../types';

import Image from '../../../universalElements/Image';

import QuestIconBlank from '../../../../art/QuestList/QuestIconBlank.png';
import QuestionMark from '../../../../art/QuestList/QuestionMark.png';

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
      <Image
        content={{ element: QuestIconBlank, height: 22 }}
        overlay={{ element: QuestionMark, height: 11, x: 7, y: 1 }}
      />

      <div className='questDetails'>
        <div className="title">{record.title}</div>
        <div className="objective">- {record.questObjectives}</div>
      </div>
    </div>
  );
}
