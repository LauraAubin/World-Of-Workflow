import React, { useContext } from 'react';

import { Quest as QuestType } from '../../../../../types';
import { ModalContext } from '../../../../../context/modal';

import Typography from '../../../../universalElements/Typography';
import Flex from '../../../../structure/Flex';

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
      <Flex>
        <div className='questIcon'>
          <div className='questIconSymbol' />
        </div>

        <div className='questDetailsText'>
          <Typography type='content' styles='title'>
            {record.title}
          </Typography>

          <Typography type='content' color='white' styles='objective'>
            {`- ${record.questObjectives}`}
          </Typography>
        </div>
      </Flex>
    </div>
  );
}
