import React, { useContext } from 'react';

import { Quest as QuestType, ModalTypes } from '../../../../../types';
import { ModalContext } from '../../../../../context/modal';

import Typography from '../../../../universalElements/Typography';

import './Quest.scss';

interface Props {
  record: QuestType;
  setSelectedQuest(record): void;
}

export default function Quest({ record, setSelectedQuest }: Props) {
  const modalContext = useContext(ModalContext);

  const selectedQuest = () => {
    setSelectedQuest(record);
    modalContext.onChange(ModalTypes.Quest);
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
