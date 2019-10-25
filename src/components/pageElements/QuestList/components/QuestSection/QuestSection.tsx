import React from 'react';

import { Quest as QuestType } from '../../../../../types';

import Quest from '../Quest';
import Typography from '../../../../universalElements/Typography';

import './QuestSection.scss';

interface Props {
  title: string;
  records: QuestType[];
}

export default function QuestSection({ title, records }: Props) {
  const questSectionTitle = (title: string) => (
    <Typography type='content' styles='sectionTitleText'>
      {title}
    </Typography>
  );

  return (
    <>
      <div className='sectionHeaderSize'>
        <div className='sectionHeader'>{questSectionTitle(title)}</div>
      </div>

      {records.map(record => (
        <Quest record={record} />
      ))}
    </>
  );
}
