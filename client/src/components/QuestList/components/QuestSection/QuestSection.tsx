import React from 'react';

import { Quest as QuestType } from '../../../../types';

import Image from '../../../Image';
import Quest from '../Quest';

import Frame from '../../../../art/QuestList/Frame.png';

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
      <div className='questSectionImage'>
        <Image
          content={{ element: Frame, height: 65 }}
          overlay={{ element: questSectionTitle(title), x: 25, y: 12 }}
        />
      </div>
      {records.map(record => (
        <Quest record={record} setSelectedQuest={setSelectedQuest} />
      ))}
    </>
  );
}
