import React from 'react';

import { Quest as QuestType } from '../../../../types';

import Frame from '../../../../art/QuestList/Frame.png';
import Image from '../../../Image';
import Quest from '../Quest';

import './QuestSection.scss';

interface Props {
  title: string;
  records: QuestType[];
  setSelectedQuest(record): void;
}

export default function QuestSection({
  title,
  records,
  setSelectedQuest
}: Props) {
  const questSectionTitle = (title: string) => (
    <div className='questTitle'>{title}</div>
  );

  return (
    <>
      <Image text={questSectionTitle(title)} textX={25} textY={12}>
        <div className='questSectionImage'>
          <img src={Frame} className='questSectionImageFrame' />
        </div>
      </Image>
      {records.map(record => (
        <Quest record={record} setSelectedQuest={setSelectedQuest} />
      ))}
    </>
  );
}
