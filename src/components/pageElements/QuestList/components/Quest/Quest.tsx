import React from 'react';

import { Quest as QuestType } from '../../../../../types';

import Typography from '../../../../universalElements/Typography';

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
        <Typography type='content' style='title'>
          {record.title}
        </Typography>

        <Typography type='content' style='objective'>
          {`- ${record.questObjectives}`}
        </Typography>
      </div>
    </div>
  );
}
