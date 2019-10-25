import React, { useContext } from 'react';

import { Quest as QuestType } from '../../../../../types';
import { ModalContext } from '../../../../../context/modal';

import Typography from '../../../../universalElements/Typography';

import './Quest.scss';

interface Props {
  record: QuestType;
}

export default function Quest({ record }: Props) {
  const modalContext = useContext(ModalContext);

  const selectedQuest = () => {
    modalContext.onChange(record);
  };

  return (
    <div
      className='questContainer'
      key={record.created_at}
      onClick={selectedQuest}
    >
      <div className='questIcon'>
        <div className='questIconSymbol' />
      </div>

      <div className='questDetailsText'>
        <Typography type='content' styles='title'>
          {record.title}
        </Typography>

        <Typography type='content' styles='objective'>
          {`- ${record.questObjectives}`}
        </Typography>
      </div>
    </div>
  );
}
