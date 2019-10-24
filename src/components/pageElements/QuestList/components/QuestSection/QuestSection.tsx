import React from 'react';

import { Quest as QuestType } from '../../../../../types';

import Quest from '../Quest';
import Typography from '../../../../universalElements/Typography';

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
    <Typography type='content' style='sectionTitleText'>
      {title}
    </Typography>
  );

  return (
    <>
      <div className='sectionHeaderSize'>
        <div className='sectionHeader'>{questSectionTitle(title)}</div>
      </div>

      {records.map(record => (
        <Quest record={record} setSelectedQuest={setSelectedQuest} />
      ))}
    </>
  );
}
